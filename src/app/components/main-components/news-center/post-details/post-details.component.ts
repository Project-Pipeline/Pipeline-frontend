import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Post} from "../../../../models/model classes/posts/Post";
import {User} from "../../../../models/model classes/user/User";
import {postCategoryLookUp} from "../../../../models/BusinessConstants";
import {PostDetailsViewModel} from "./PostDetailsViewModel";
import {PostsService} from "../../../../services/posts.service";
import {UserApiService} from "../../../../services/user-api.service";
import {LikeForPost} from "../../../../models/model classes/posts/LikeForPost";
import {Subscription} from "rxjs";
import {CommentForPost} from "../../../../models/model classes/posts/CommentForPost";
import {rightPanelFade} from "../../opportunities/OpportunitiesViewModel";

@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.component.html',
    styleUrls: ['./post-details.component.scss'],
    animations: [rightPanelFade]
})
export class PostDetailsComponent implements OnInit, OnDestroy {
    @Input() post: Post;
    @Input() user: User = null;
    @ViewChild('commentInputOne') inputOne: ElementRef;
    @ViewChild('commentInputTwo') inputTwo: ElementRef;

    viewModel: PostDetailsViewModel;

    likedPost = false;
    likes: LikeForPost[] = [];
    likesSubscription: Subscription = null;
    moreLikesText: string = null;

    showComments = false;
    comments: CommentForPost[] = [];
    usersForComments: User[] = [];
    pendingComment: string = '';

    constructor(private postsService: PostsService, private userApi: UserApiService) {

    }

    ngOnInit(): void {
        this.viewModel = new PostDetailsViewModel(this.post, this.postsService, this.userApi);
    }

    ngOnDestroy() {
        this.hideLikes();
    }

    transformOptionalDate(date?: Date): Date {
        return date ? new Date(date) : new Date();
    }

    getUserTypeString(user: User): string {
        return postCategoryLookUp[user.type];
    }

    addLike() {
        this.viewModel.addLike().subscribe(() => this.likedPost = true);
    }

    showLikes() {
        this.likesSubscription = this.viewModel.getLikes()
            .subscribe(([likes, extraLikesTxt]) => {
                this.likes = likes;
                this.moreLikesText = extraLikesTxt;
            });
    }

    hideLikes() {
        if(this.likesSubscription) {
            this.likesSubscription.unsubscribe();
        }
    }

    addComment() {
        if (this.pendingComment.length !== 0) {
            this.viewModel.addComment(this.pendingComment)
                .subscribe((comment) => {
                    this.comments = [comment].concat(this.comments);
                    this.usersForComments = [this.userApi.currentUser].concat(this.usersForComments);
                });
        }
    }

    showComment(focus: boolean = false) {
        if (this.showComments) {
            this.showComments = false;
        } else {
            this.viewModel.getComments()
                .subscribe((comments) => {
                    this.comments = comments.comments.items;
                    this.usersForComments = comments.users;
                    this.showComments = true;
                    if (focus) {
                        setTimeout(() => {
                            this.inputOne.nativeElement.focus();
                            this.inputTwo.nativeElement.focus();
                        }, 0);
                    }
                });
        }
    }
}
