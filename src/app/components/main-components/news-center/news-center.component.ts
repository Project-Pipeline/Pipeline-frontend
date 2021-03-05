import {Component, OnInit} from '@angular/core';
import {NewsCenterViewModel} from "./NewsCenterViewModel";
import {UserApiService} from "../../../services/user-api.service";
import {PostsService} from "../../../services/posts.service";
import {CategoryForPost} from "../../../models/model classes/posts/CateogryForPost";
import {Post} from "../../../models/model classes/posts/Post";

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
            .subscribe((posts) => this.posts = posts.items)
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
