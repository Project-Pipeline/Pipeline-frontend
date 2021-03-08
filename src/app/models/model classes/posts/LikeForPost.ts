import {PostDTO} from "./Post";

export class LikeForPost {
    public post: PostDTO
    constructor(
        public userID: string,
        public nameOfUser: string,
        postId: string,
        public modified?: Date,
        public created?: Date,
        public id?: string
    ) {
        this.post = new PostDTO(postId);
    }
}
