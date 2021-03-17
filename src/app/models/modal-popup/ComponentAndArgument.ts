import {ComponentType} from "@angular/cdk/overlay";

export class ComponentAndArgument<Comp extends ComponentType<any>, Arg> {
    constructor(
        public component: Comp,
        public argument: Arg
    ) {
    }
}
