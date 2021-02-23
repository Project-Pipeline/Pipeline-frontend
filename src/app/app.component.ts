import {Component, OnInit} from '@angular/core';
import {ConfigService} from "./services/config.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Project Pipeline';

    constructor(private configService: ConfigService) {
        this.configService.loadConfig().then(config => {
            this.loadGoogleAPI(config.google_api_key);
        });
    }

    loadGoogleAPI(key: string) {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${key}`;
        document.getElementsByTagName('head')[0].appendChild(script);
    }
}
