export class LandingPageData {
    constructor(
        public headline: string,
        public headlineSubtitle: string,
        public headLineImgLink: string,
        public segment1: LandingPageCustomerSegment,
        public segment2: LandingPageCustomerSegment,
        public segment3: LandingPageCustomerSegment,
        public features: LandingPageFeature[]
    ) {
    }
}

export class LandingPageCustomerSegment {
    constructor(
        public title: string,
        public contents: ImageTextPair[],
        public joinLink: string,
        public headerImgLink
    ) {
    }
}

export class LandingPageFeature {
    constructor(
        public title: string,
        public subtitle: string,
        public image: string,
        // 0 for left and 1 for right
        public imageSide: number
    ) {
    }
}

export class ImageTextPair {
    constructor(
        public image: string,
        public text: string
    ) {
    }
}

const wheelUrl = 'https://res.cloudinary.com/dd8cb6u97/image/upload/v1618451729/project-pipeline-public/ppl-wheel_xb6w6y.svg';

export const mockLandingPageData = new LandingPageData(
    'Professional Social Networking for High Schoolers.',
    'Our mission is to provide High School students with a platform\n' +
    '                to help them obtain work-based learning opportunities and a career-focused experience.',
    'https://res.cloudinary.com/dd8cb6u97/image/upload/v1618451537/project-pipeline-public/headline-graphic_kohrbx.png',
    new LandingPageCustomerSegment(
        'HIGH SCHOOLS',
        [
            new ImageTextPair(
                wheelUrl,
                'Find and Create industry partnerships'
            ),
            new ImageTextPair(
                wheelUrl,
                'Improve college readiness for students'
            )
        ],
        '/login',
        wheelUrl
    ),
    new LandingPageCustomerSegment(
        'STUDENTS',
        [
            new ImageTextPair(
                wheelUrl,
                'Find personalized Internships, local jobs and volunteering opportunities'
            ),
            new ImageTextPair(
                wheelUrl,
                'Get a head start on Career and college readiness'
            )
        ],
        '/login',
        wheelUrl
    ),
    new LandingPageCustomerSegment(
        'COMPANIES',
        [
            new ImageTextPair(
                wheelUrl,
                'Increase your workplace diversity'
            ),
            new ImageTextPair(
                wheelUrl,
                'Find and secure talents'
            )
        ],
        '/login',
        wheelUrl
    ),
    [
        new LandingPageFeature(
            'Post or Find Opportunities',
            'Our mission is to provide High School students with a platform to help them obtain work-based learning opportunities and a career-focused experience.',
            'https://res.cloudinary.com/dd8cb6u97/image/upload/v1618457460/project-pipeline-public/landing-page-opportunity_oelleg.svg',
            0
        ),
        new LandingPageFeature(
            'Build Social Equity',
            'Free and equal access to local community opportunities and resources.',
            '',
            1
        ),
        new LandingPageFeature(
            'Build Your Career Network',
            'Start Now! Build your social career circle for the future.',
            'https://res.cloudinary.com/dd8cb6u97/image/upload/v1618458077/project-pipeline-public/landing-page-career_yp1807.svg',
            0
        )
    ]
);
