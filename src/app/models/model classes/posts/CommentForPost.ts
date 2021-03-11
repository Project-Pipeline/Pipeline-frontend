import {PostDTO} from "./Post";
import {User} from "../user/User";
import {PageData} from "../common/PageData";

export class CommentForPost {
    public post: PostDTO
    constructor(
        public userID: string,
        public nameOfUser: string,
        public content: string,
        postId: string,
        public modified?: Date,
        public created?: Date,
        public id?: string
    ) {
        this.post = new PostDTO(postId);
    }
}

export class UsersAndComments {
    constructor(
        public users: User[],
        public comments: PageData<CommentForPost>
    ) {
    }
}
