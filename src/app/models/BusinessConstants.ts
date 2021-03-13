export const individualUserTypes = [0, 1, 2];
export const entityUserTypes = [3, 4, 5];

export const opportunityCategories = [
    "Agriculture, Food and Natural Resources",
    "Architecture, Construction and Engineering",
    "Arts, A/V Technology and Communication",
    "Education and Training",
    "Government and Public Administration",
    "Health Science",
    "Hospitality and Tourism",
    "Human Services",
    "Information Technology",
    "Law and Public Safety",
    "Manufacturing Production",
    "Marketing, Sales and Service",
    "Recording Arts Technology/Technician",
    "Scientific Research and Engineering",
    "Transportation, Distribution and Logistics"
];

export const opportunityState = [
    0, // open
    1 // closed
];

export const allowedOpportunityGradeLevels = [9, 10, 11, 12];

export function opportunityCategoryToId(category: string): string {
    return categoryToId(category);
}

export function categoryToId(category: string): string {
    return category
        .replace(',', '')
        .replace(/\s/g, '');
}

/// User type -> Category
export const postCategoryLookUp = {
    0: 'Student',
    1: 'Teacher',
    2: 'Working Professional',
    3: 'Business',
    4: 'Community Organization',
    5: 'School'
};

// Profile tabs
const individualProfileTabs = [1, 2];
const entityProfileTabs = [1, 2, 3];

export const profileTabsForUsersWithType: {[key: number]: number[] } = {
    0: individualProfileTabs,
    1: individualProfileTabs,
    2: individualProfileTabs,
    3: entityProfileTabs,
    4: entityProfileTabs,
    5: entityProfileTabs
}

export const profileTabTitles: {[key: number]: string } = {
    1: 'Cards',
    2: 'Posts',
    3: 'Opportunities'
}
