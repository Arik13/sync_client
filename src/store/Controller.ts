import {io, Socket} from "socket.io-client";
import {SessionController} from "../../../sync_server/Test/GameSession";
import {store} from "./";
import * as jdp from "jsondiffpatch";
import { JoinPayload } from "@server/Framework/Session";

interface ServerProxy {
    join(joinPayload: JoinPayload): void;
}

const controllerFactory = <T>(controller: T, url: string, state: any) => {
    let contr = controller as any;
    delete contr.state;
    let socket = io(url);
    contr.socket = socket;

    // Dynamic Outgoing
    let prototype = Object.getPrototypeOf(contr);
    let keys = Object.getOwnPropertyNames(prototype);
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

let url = "http://localhost:3000";
export let controller = controllerFactory(new SessionController(), url, store.state.gs) as Controller;