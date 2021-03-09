import {Post} from "../../../../models/model classes/posts/Post";
import {PostsService} from "../../../../services/posts.service";
import {UserApiService} from "../../../../services/user-api.service";
import {Observable, of} from "rxjs";
import {PageData, PageDataMetadata} from "../../../../models/model classes/common/PageData";
import {LikeForPost} from "../../../../models/model classes/posts/LikeForPost";
import {map, mergeMap, take} from "rxjs/operators";
import {CommentForPost, UsersAndComments} from "../../../../models/model classes/posts/CommentForPost";
import {User} from "../../../../models/model classes/user/User";

export class PostDetailsViewModel {
    constructor(
        private post: Post,
        private postsService: PostsService,
        private usersApi: UserApiService
    ) {
    }

    getLikes(): Observable<[LikeForPost[], string]> {
        return this.postsService
            .getLikesForPostWithId(this.post.id)
            .pipe(map((pages) => {
                let showMoreTextsText = null;
                let extraLikesCount =  pages.metadata.total - pages.items.length;
                if (extraLikesCount > 0) {
                    showMoreTextsText = `and ${extraLikesCount} more`;
                }
                return [pages.items, showMoreTextsText];
            }));
    }

    addLike(): Observable<any> {
        return this.usersApi.getUserInfo()
            .pipe(mergeMap((user) => {
                return this.postsService.addLikeToPost(new LikeForPost(
                    user.id,
                    this.formatUser(user),
                    this.post.id
                ));
            }))
            .pipe(take(1));
    }

    getComments(): Observable<UsersAndComments> {
        return this.postsService
            .getCommentsForPostsWithId(this.post.id)
            .pipe(mergeMap((comments) => {
                if (comments.items.length === 0) {
                    return of(new UsersAndComments(
                            [], new PageData(
                                [],
                                new PageDataMetadata(1, 0, 0)
                            )
                    ));
                }
                return this.usersApi
                    .getMultipleUserInfo(comments.items.map((c) => c.userID))
                    .pipe(map((users) => new UsersAndComments(users, comments)))
            }))
            .pipe(take(1));
    }

    addComment(comment: string): Observable<CommentForPost> {
        return this.usersApi.getUserInfo()
            .pipe(mergeMap((user) => {
                const commentForPost = new CommentForPost(
                    user.id,
                    this.formatUser(user),
                    comment,
                    this.post.id
                );
                return this.postsService
                    .addCommentToPost(commentForPost)
                    .pipe(map(() => commentForPost));
            }))
            .pipe(take(1));
    }

    private formatUser(user: User): string {
        return `${user.givenName} ${user.familyName}`;
    }
}
