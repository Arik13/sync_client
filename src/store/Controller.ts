import {io, Socket} from "socket.io-client";
import {SessionController} from "../../../sync_server/Test/GameSession";
import {store} from "./";
import * as jdp from "jsondiffpatch";
import { JoinPayload } from "@server/Framework/Session";

interface ServerProxy {
    join(joinPayload: JoinPayload): void;
}

const controllerFactory = <T>(controller: T, url: string, state: any) => {
    const contr = controller as any;
    delete contr.state;
    const socket = io(url);
    contr.socket = socket;

    // Dynamic Outgoing
    const prototype = Object.getPrototypeOf(contr);
    const keys = Object.getOwnPropertyNames(prototype);
    keys.forEach(key => {
        if (typeof(prototype[key]) == "function" && key != "constructor") {
            contr[key] = (arg: any) => {
                console.log(`Emit: ${key}`);
                socket.emit(key, arg, (reply: any) => {
                    console.log("Reply: ", reply);
                });
            }
        }
    });

    // Default Outgoing
    contr.join = function (payload: JoinPayload) {
        socket.emit("join", payload);
    }

    // Default Incoming
    socket.on("delta", (delta: any) => {
        if (!delta) return;
        jdp.patch(state, delta);
    });

    return contr as T & ServerProxy;
}

type Controller = SessionController & ServerProxy;

const url = "http://localhost:3000";
export const controller = controllerFactory(new SessionController(), url, store.state.gs) as Controller;