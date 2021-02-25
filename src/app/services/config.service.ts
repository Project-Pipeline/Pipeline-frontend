import {Injectable} from '@angular/core';
import {ConfigType} from "../models/ConfigType";

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    public config: ConfigType;

    constructor() {
        this.config = require('../../assets/config.json') as ConfigType;
    }
}
