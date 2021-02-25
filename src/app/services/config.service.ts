import {Injectable} from '@angular/core';
import {ConfigType} from "../models/ConfigType";

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    public config: ConfigType;

    constructor() {
        try {
            this.config = require('../../assets/config.json') as ConfigType;
        } catch(e) {
            console.log(e);
            this.config = null;
        }
    }
}
