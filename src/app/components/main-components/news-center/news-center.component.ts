import {Component, OnInit} from '@angular/core';
import {NewsCenterViewModel} from "./NewsCenterViewModel";
import {UserApiService} from "../../../services/user-api.service";
import {PostsService} from "../../../services/posts.service";
import {CategoryForPost} from "../../../models/model classes/posts/CateogryForPost";
import {Post} from "../../../models/model classes/posts/Post";
import {User} from "../../../models/model classes/user/User";
import {mergeMap} from "rxjs/operators";

@Component({
    selector: 'app-news-center',
    templateUrl: './news-center.component.html',
    styleUrls: ['./news-center.component.scss']
})
export class NewsCenterComponent implements OnInit {
    viewModel: NewsCenterViewModel;

    //bindings
    categories: CategoryForPost[] = [];
    categoryFilters: boolean[] = [];
    posts: Post[] = [];
    postsUsers: User[];

    constructor(usersApi: UserApiService, postsApi: PostsService) {
        this.viewModel = new NewsCenterViewModel(postsApi, usersApi);
    }

    ngOnInit(): void {
        this.viewModel.getPostsCategories()
            .subscribe(([categories, filterStatuses]) => {
                this.categories = categories;
                this.categoryFilters = filterStatuses;
                // select all filter
                this.selectCategoryFilterAt(0);
            });

        this.viewModel.postsFetched
            .pipe(mergeMap((posts) => {
                this.postsUsers = posts.items.map(() => null);
                this.posts = posts.items;
                return this.viewModel.getUsersFromPosts(posts.items)
            }))
            .subscribe((users) => this.postsUsers = users);
    }

    selectCategoryFilterAt(index: number) {

        this.categoryFilters.forEach((cat, i) => {
            this.categoryFilters[i] = index === i ? !this.categoryFilters[index] : false;
        });
        if (this.categoryFilters[index]) {
            this.viewModel.categorySelected.next(this.categories[index]);
        }
    }

}
