import {isDevMode} from "@angular/core";

export const apiRoot = isDevMode() ? 'http://localhost:8080/' : 'https://projectpipeline.net/' ;
export const websocketRoot = isDevMode() ? 'ws://localhost:8080/' : 'wss://projectpipeline.net/';
