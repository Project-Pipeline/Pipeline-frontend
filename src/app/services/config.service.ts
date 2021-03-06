import {Injectable, isDevMode} from '@angular/core';
import {ConfigType} from "../models/ConfigType";

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    public config: ConfigType;
    public apiRoot: string;
    public websocketRoot: string;

    constructor() {
        try {
            this.config = require('../../assets/config.json') as ConfigType;
        } catch(e) {
            console.log(e);
            this.config = null;
        }
        this.websocketRoot = isDevMode() ? 'ws://localhost:8080/' : 'wss://projectpipeline.net/';
        this.apiRoot = isDevMode() ? 'http://localhost:8080/' : 'https://projectpipeline.net/'
    }
}
