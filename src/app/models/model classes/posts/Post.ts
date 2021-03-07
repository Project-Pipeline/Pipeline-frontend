import {UserDTO} from "../user/UserDetails";
import {CategoryForPost, CategoryForPostDTO} from "./CateogryForPost";
import {User} from "../user/User";

export class Post {
    public user: UserDTO;
    public category: CategoryForPostDTO;
    constructor(
        public body: string,
        public images: string[],
        public links: TitledLink[],
        userId: string,
        categoryId: string,
        public title?: string,
        public modified?: Date,
        public created?: Date
    ) {
        this.user = new UserDTO(userId);
        this.category = new CategoryForPostDTO(categoryId);
    }
}

export class TitledLink {
    constructor(
        public title: string,
        public link: string
    ) {
    }
}

export class PostAndCategoryWrapper {
    constructor(
        public post: Post,
        public category: CategoryForPost
    ) {
    }
}

export class UsersAndPosts {
    constructor(
        public users: User[],
        public posts: Post[]
    ) {
    }
}



