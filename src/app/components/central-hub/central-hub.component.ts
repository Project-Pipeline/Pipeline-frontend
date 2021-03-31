import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {urlComponentAfter} from "../../models/Global";
import {CentralHubBaseComponent} from "./central-hub-base/central-hub-base.component";

@Component({
    selector: 'app-central-hub',
    templateUrl: './central-hub.component.html',
    styleUrls: ['./central-hub.component.scss']
})
export class CentralHubComponent extends CentralHubBaseComponent implements OnInit {
    @ViewChild('subComponent', { read: ViewContainerRef }) subComponent: ViewContainerRef;
    // highlighting on the bar on the left
    highlights: {[key: string]: boolean} = {
        'messaging': false,
        'notifications': false,
        'resumebuilder': false,
        'applications': false,
    };
    heightChanged: (height: number, heightStr: string) => void = null;

    constructor(private title: Title) {
        super();
        this.title.setTitle('Central Hub');
    }

    ngOnInit(): void {
        let componentAfterCtlHub = urlComponentAfter('central-hub')
        if (componentAfterCtlHub) {
            this.highlightTabAt(componentAfterCtlHub);
        }
    }

    highlightTabAt(givenKey: string) {
        Object.keys(this.highlights).forEach((key) => {
            this.highlights[key] = key === givenKey;
        });
    }

}
