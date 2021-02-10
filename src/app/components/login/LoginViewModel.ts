export class LoginViewModel {
    constructor() {
    }

    businessTypes: string[] = ["organization", "business", "school"];

    accountTypeOptions: string[] = [
        'as a student',
        'as a teacher',
        'as a working professional',
        'on behalf of a business',
        'on behalf of a community organization',
        'on behalf of a school'
    ];

    industries = [
        "Architecture",
        "Construction",
        "Business",
        "Engineering",
        "Education",
        "My industry is not listed"
    ];

    getAccountType(str: string): number {
        return this.accountTypeOptions.indexOf(str);
    }
}
