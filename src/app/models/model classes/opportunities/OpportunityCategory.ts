import {opportunityCategoryToId} from "../../BusinessConstants";

export class OpportunityCategory {
    public id: string;

    constructor(public name: string) {
        this.id = opportunityCategoryToId(name);
    }
}
