<template>
    <v-app>
        <v-app-bar
            app
            dark
        >
        </v-app-bar>

        <v-main>
            <v-card dark height="100%" tile>
                <v-card-text>
                    <v-btn @click="test">
                        test
                    </v-btn>
                    <v-btn @click="undo">
                        undo
                    </v-btn>
                    <v-btn @click="redo">
                        redo
                    </v-btn>
                    <v-btn @click="load">
                        load
                    </v-btn>
                    <br>
                    {{ state.gs }}
                    <!-- <router-view/> -->
                </v-card-text>
            </v-card>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import {controller} from "@/store/Controller";
import { VueMod } from './Vue';

export default VueMod.extend({
    name: 'App',
    data: () => ({

    }),
    methods: {
        test() {
            controller.test("test");
        },
        undo() {
            controller.undo();
        },
        redo() {
            controller.redo();
        },
        load() {
            controller.load();
        }
    },
    mounted() {
        controller.join({clientID: "Arik", sessionID: "12345"});
    }
});
</script>
