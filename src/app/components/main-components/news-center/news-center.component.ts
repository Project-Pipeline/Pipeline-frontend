import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NewsCenterViewModel} from './NewsCenterViewModel';
import {UserApiService} from '../../../services/user-api.service';
import {PostsService} from '../../../services/posts.service';
import {CategoryForPost} from '../../../models/model classes/posts/CateogryForPost';
import {Post} from '../../../models/model classes/posts/Post';
import {User} from '../../../models/model classes/user/User';
import {catchError, mergeMap, takeUntil} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';
import {PaginatorComponent} from '../../reusable-components/paginator/paginator.component';
import {Subject} from 'rxjs';
import {handleJWTError} from '../../../models/Global';
import {Router} from '@angular/router';

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
        private router: Router
    ) {
        this.viewModel = new NewsCenterViewModel(postsApi, usersApi);
        title.setTitle('News Center');
    }

    ngOnInit(): void {
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
                this.postsUsers = posts.items.map(() => null);
                this.posts = posts.items;
                if (this.viewModel.newCategory) {
                    this.viewModel.newCategory = false;
                    this.per = posts.metadata.per;
                    this.total = posts.metadata.total;
                    this.page = posts.metadata.page;
                    setTimeout(() => this.paginator.checkButtonStates(), 50);
                }
                return this.viewModel.getUsersFromPosts(posts.items);
            }))
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((users) => this.postsUsers = users);
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
            this.viewModel.categorySelected$.next(this.categories[index]);
            this.page = 1;
            this.viewModel.pageChanged$.next(1);
        }
    }

    pagesChanged(page: number) {
        this.viewModel.pageChanged$.next(page);
    }

}
