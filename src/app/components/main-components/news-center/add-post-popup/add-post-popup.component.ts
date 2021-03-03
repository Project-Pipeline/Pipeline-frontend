import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Post, TitledLink} from "../../../../models/model classes/posts/Post";
import {UserApiService} from "../../../../services/user-api.service";

@Component({
    selector: 'app-add-post-popup',
    templateUrl: './add-post-popup.component.html',
    styleUrls: ['./add-post-popup.component.scss']
})
export class AddPostPopupComponent implements OnInit {
    @ViewChild('midSection') private midSection: ElementRef;
    title: string = '';
    body: string = '';
    addingLinks = false;
    links: [string, string][] = [['', '']];

    constructor(
        private dialog: MatDialogRef<AddPostPopupComponent>,
        private usersApi: UserApiService
    ) {
    }

    ngOnInit(): void {
    }

    close() {
        this.dialog.close(null);
    }

    closeWithResult() {
        this.dialog.close(new Post(
            this.body,
            [],
            this.addingLinks ? this.links.map((l) => new TitledLink(l[0], l[1])) : [],
            this.usersApi.currentUser.id,
            this.usersApi.getCategoryForPost().id,
            this.title.length === 0 ? null : this.title,
        ));
    }

    toggleAddingLinks() {
        this.addingLinks = !this.addingLinks;
        if (this.addingLinks) this.scrollToBottom();
    }

    scrollToBottom() {
        setTimeout(() => {
            try {
                this.midSection.nativeElement.scrollTop = this.midSection.nativeElement.scrollHeight;
            } catch(err) {
                console.log(err);
            }
        }, 100);
    }

}
