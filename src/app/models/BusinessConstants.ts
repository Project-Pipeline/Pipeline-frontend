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

export function opportunityCategoryToId(category: string): string {
    return category
        .replace(',', '')
        .replace(/\s/g, '');
}
