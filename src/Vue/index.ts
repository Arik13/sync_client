import Vue from "vue";
import Component from "vue-class-component";
import {SessionState} from "@server/Test/GameSession"


@Component
export class VueMod extends Vue {
    get state(): SessionState {
        return this.$store.state;
    }
}