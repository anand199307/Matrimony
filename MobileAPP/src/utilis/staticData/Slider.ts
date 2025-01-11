import {IMAGES} from '../../assets/Images';

export interface carousel {
  id: any;
  img: string;
}

export const Carousel: carousel[] = [
  {
    id: 1,
    img: IMAGES.carouselImage1,
  },
  {
    id: 2,
    img: IMAGES.carouselImage2,
  },
  {
    id: 3,
    img: IMAGES.carouselImage3,
  },
];

export interface carouselRating {
  id?: any;
  src?: any;
  content?: string;
}

export const CarouselRating: carouselRating[] = [
  {
    id: 1,
    src: IMAGES.getInterested,
    content:
      'Add your personal information to find the matches with same interest.',
  },
  {
    id: 2,
    src: IMAGES.getInterested,
    content:
      'Add your partner preferences to find the matches with same interest.',
  },
  {
    id: 3,
    src: IMAGES.getVerified,
    content: 'Get more response by verifying your profile with ID Proof.',
  },
  {
    id: 4,
    src: IMAGES.getImage,
    content: 'Adding the photos are chance of getting more relevant matches.',
  },
];

export interface carouselCouple {
  id?: any;
  src?: any;
  content?: string;
}

export const CarouselCouple: carouselCouple[] = [
  {
    id: 1,
    src: IMAGES.pair1,
    content:
      "I am elated to share that this matrimony app successfully led me to my soulmate. The app's exceptional matchmaking capabilities, combined with its intuitive interface and extensive user base, played a pivotal role in bringing us together. Today, I am happily married, and I credit this app for making it possible.",
  },
  {
    id: 2,
    src: IMAGES.pair2,
    content:
      'I am thrilled to share my heartfelt testimonial for the remarkable matrimony app that has completely transformed my life. As a single individual searching for a life partner, I was overwhelmed with the daunting task of finding the right person amidst the vast sea of possibilities. ',
  },
  {
    id: 3,
    src: IMAGES.pair3,
    content:
      'I am thrilled to share my heartfelt testimonial for the remarkable matrimony app that has completely transformed my life. As a single individual searching for a life partner, I was overwhelmed with the daunting task of finding the right person amidst the vast sea of possibilities. ',
  },
];

export const footerContentActivity: any = [
  {
    id: '1',
    contentTitle1: 'CHAT WITH MATCHES',
    content:
      ' Help us know you about your preferences to find you a better partner',
  },
  {
    id: '2',
    contentTitle1: '100% SCREENED PROFILES',
    content:
      'Each profile created on Royal matrimony is mobile number verified  through strict screening process.',
  },
  {
    id: '3',
    contentTitle1: 'PROFILE VERIFICATION',
    content:
      'In order to provide you with a safe experience, we do profile verification with Govt. authorized ID proof',
  },
  {
    id: '4',
    contentTitle1: 'SUCCESS STORIES',
    content:
      'Royal matrimony is reason for thousands of happy couples, helps to find the better partner for life.',
  },
];
