import Vue from 'vue';
import Vuex from 'vuex';
import {SessionState} from "../../../sync_server/Test/GameSession";

Vue.use(Vuex);

export const store = {
    state: {
        gs: {
            arr: []
        } as SessionState
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    },
}

export default new Vuex.Store(store);