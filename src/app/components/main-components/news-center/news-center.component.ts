import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NewsCenterViewModel} from './NewsCenterViewModel';
import {UserApiService} from '../../../services/user-api.service';
import {PostsService} from '../../../services/posts.service';
import {CategoryForPost} from '../../../models/model classes/posts/CateogryForPost';
import {Post, UsersAndPosts} from '../../../models/model classes/posts/Post';
import {User} from '../../../models/model classes/user/User';
import {catchError, map, mergeMap, takeUntil} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';
import {PaginatorComponent} from '../../reusable-components/paginator/paginator.component';
import {of, Subject} from 'rxjs';
import {handleJWTError} from '../../../models/Global';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {ModalPopupService} from "../modal-popup.service";

@Component({
    selector: 'app-news-center',
    templateUrl: './news-center.component.html',
    styleUrls: ['./news-center.component.scss']
})
export class NewsCenterComponent implements OnInit , OnDestroy {
    viewModel: NewsCenterViewModel;
    private unsubscribe$ = new Subject<void>();

    // bindings
    @ViewChild('paginator') paginator: PaginatorComponent;
    categories: CategoryForPost[] = [];
    categoryFilters: boolean[] = [];
    posts: Post[] = [];
    postsUsers: User[];
    total = 0;
    per = 0;
    page = 1;

    constructor(
        usersApi: UserApiService,
        postsApi: PostsService,
        title: Title,
        modalPopupService: ModalPopupService,
        private router: Router,
        private spinner: NgxSpinnerService
    ) {
        this.viewModel = new NewsCenterViewModel(postsApi, usersApi, modalPopupService);
        title.setTitle('News Center');
    }

    ngOnInit(): void {
        this.spinner.show();
        this.viewModel
            .getPostsCategories()
            .pipe(catchError((e) => handleJWTError(e, this.router)))
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(([categories, filterStatuses]) => {
                this.categories = categories;
                this.categoryFilters = filterStatuses;
                // select all filter
                this.selectCategoryFilterAt(0);
            });

        this.viewModel.postsFetched$
            .pipe(catchError((e) => handleJWTError(e, this.router)))
            .pipe(mergeMap((posts) => {
                return this.viewModel
                    .getUsersFromPosts(posts.items)
                    .pipe(map((users) => new UsersAndPosts(users, posts.items)));
            }))
            .pipe(catchError(() => of(new UsersAndPosts([], []))))
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((usersAndPosts) => {
                this.postsUsers = usersAndPosts.users;
                this.posts = usersAndPosts.posts;
                this.spinner.hide();
            }, (e) => this.spinner.hide(e.message));

        this.viewModel.postsFetchedWithNewCategory$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((metadata) => {
                this.viewModel.newCategory = false;
                this.per = metadata.per;
                this.total = metadata.total;
                this.page = metadata.page;
                setTimeout(() => this.paginator.checkButtonStates(true), 50);
            });

    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    selectCategoryFilterAt(index: number) {
        this.categoryFilters.forEach((cat, i) => {
            this.categoryFilters[i] = index === i ? !this.categoryFilters[index] : false;
        });
        if (this.categoryFilters[index]) {
            this.page = 1;
            this.viewModel.setNewCategory(this.categories[index]);
            this.spinner.show();
        }
    }

    pagesChanged(page: number) {
        this.viewModel.pageChanged$.next(page);
        this.spinner.show();
    }

    writePost() {
        this.viewModel.addPost()
            .subscribe((usersAndPosts) => {
                this.postsUsers = usersAndPosts.users.concat(this.postsUsers);
                this.posts = usersAndPosts.posts.concat(this.posts);
            });
    }
}
