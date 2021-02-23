import {Injectable} from '@angular/core';
import {ConfigType} from "../models/ConfigType";

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    constructor() {
    }

    loadConfig(): Promise<ConfigType> {
        return import('../../assets/config.json');
    }
}
