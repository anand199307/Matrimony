import {ICONS} from '../../assets/Icons';

export interface miniIcon {
  id?: string;
  text1?: string;
  text2?: string;
  standard?: any;
  premium?: any;
}

export const ProfileMini: miniIcon[] = [
  {
    id: '1',
    text1: 'ID',
    text2: 'Verified',
    standard: ICONS.bluishCyanVerified,
    premium: ICONS.unVerify,
  },
  {
    id: '2',
    text1: 'Selfie',
    text2: 'Verified',
    standard: ICONS.selfieVerified,
    premium: ICONS.selfieUnVerified,
  },
  {
    id: '3',
    text1: 'Premium',
    text2: 'Crown',
    standard: ICONS.premiumCrown,
    premium: ICONS.crown,
  },
];

export interface profileIcon {
  id?: string;
  text1?: string;
  text2?: string;
  src?: any;
  type?: string;
}

export const ProfileCircle: profileIcon[] = [
  {
    id: '1',
    text1: 'ProfileDetails',
    src: ICONS.ProfileDetails,
  },
  {
    id: '2',
    text1: 'Privacy',
    src: ICONS.Privacy,
  },
  {
    id: '3',
    text1: 'Preferences',
    src: ICONS.Preferences,
  },
  {
    id: '4',
    text1: 'Invite',
    src: ICONS.Invite,
    type: 'share',
  },
  {
    id: '5',
    text1: 'Upgrade',
    src: ICONS.Upgrade,
  },
  {
    id: '6',
    text1: 'Settings',
    src: ICONS.Settings,
  },
];

export interface policy {
  id?: any;
  heading?: string;
  content?: string;
  content2?: string;
  contentList?: any;
}

export const privacyPolicy: policy[] = [
  {
    id: 1,
    heading: 'Privacy Policy for Royal Matrimony',
    content:
      'Royal matrimony.com an online matrimonial app and portal constantly provide you with matrimonial services. At Royal Matrimony, we take your privacy seriously. Therefore, we have created this privacy policy to explain how we collect, use, and protect your personal information when you use our matrimonial app.',
  },
  {
    id: 2,
    heading: 'Information we collect',
    content:
      'We collect personal information such as your name, email address, phone number, and date of birth, photo or video of the applicant when you register with our app. Additionally, we may collect information about your preferences, interests, and other demographic information to help us provide you with better services.',
  },
  {
    id: 3,
    heading: 'How we use your information',
    content:
      'We use your personal information to provide you with the services on our app. This includes matching you with potential partners, sending you notifications about new matches, and informing you about special promotions or events related to our app. We may also use your information to analyze app usage and improve our services.',
  },
  {
    id: 4,
    heading: 'How we protect your information',
    content:
      'We take the security of your information seriously and have implemented various measures to safeguard your data. We use industry-standard security protocols to protect your personal information from unauthorized access, disclosure, and misuse.',
  },
  {
    id: 5,
    heading: 'Sharing your information',
    content:
      "We do not sell or rent your personal information to third parties. However, we may share your information with our partners or service providers to help us provide you with better services. We may also disclose your information if required by law or to protect our users' safety.",
  },
  {
    id: 6,
    heading: 'Your rights',
    content:
      'You have the right to access, update, or delete your personal information at any time. You can also opt-out of receiving marketing communications from us. Please contact us if you have any questions or concerns about your privacy.',
  },
  {
    id: 7,
    heading: 'Changes to this policy',
    content:
      'We may update this privacy policy from time to time. We will notify you of any material changes by posting the updated policy on our app. We encourage you to review this policy periodically to stay informed about how we are protecting your privacy.',
  },
  {
    id: 8,
    heading: 'Contact us',
    content:
      'If you have any questions or concerns about our privacy policy, please contact us at support@royalmatrimony.com.',
  },
];

export const TermsAndService: policy[] = [
  {
    id: 1,
    heading: 'Terms of Services for Royal Matrimony App',
    content:
      'Thank you for choosing to use Royal Matrimony App. By accessing or using our services, you agree to the following terms and conditions which govern your use of our app.',
  },
  {
    id: 2,
    heading: 'Eligibility',
    content:
      'You must be 18 years or older to use the Royal Matrimony App. By using our app, you represent and warrant that you have the right, authority, and capacity to enter into this agreement and to abide by all of the terms and conditions of this agreement.',
  },
  {
    id: 3,
    heading: 'User Accounts',
    content:
      'To use some of the features of the Royal Matrimony App, you must create a user account. You are solely responsible for maintaining the confidentiality and security of your account and password. You are also responsible for all activities that occur on your account. Royal Matrimony will not be liable for any loss or damage arising from your failure to comply with this security obligation.',
  },
  {
    id: 4,
    heading: 'User Content',
    content:
      'As a user of the Royal Matrimony App, you may submit content, such as profile information, photos, and messages. You retain all rights in, and are solely responsible for, the content you submit. By submitting content, you grant Royal Matrimony a worldwide, non-exclusive, royalty-free, transferable, and sub-licensable license to use, copy, modify, distribute, publish, and process your content without any further consent, notice, or compensation.',
  },
  {
    id: 5,
    heading: 'Restrictions',
    content:
      'You agree not to use the Royal Matrimony App for any illegal or unauthorized purpose, or to solicit others to perform or participate in any illegal activity. You also agree not to harass, abuse, or harm another person or to post any content that is offensive, defamatory, or discriminatory.',
  },
  {
    id: 6,
    heading: 'Termination',
    content:
      'Royal Matrimony reserves the right to terminate or suspend your account at any time, without notice or liability, for any reason, including if we believe that you have violated or acted inconsistently with the letter or spirit of these terms and conditions.',
  },
  {
    id: 7,
    heading: 'Limitation of Liability',
    content:
      'In no event shall Royal Matrimony be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the app, even if we have been advised of the possibility of such damages.',
  },
  {
    id: 8,
    heading: 'Changes to Terms of Service',
    content:
      'Royal Matrimony reserves the right to modify or replace these terms and conditions at any time. Your continued use of the app after any such changes constitutes your acceptance of the new terms and conditions.',
    content2:
      'Thank you for using Royal Matrimony App. We hope you find it helpful in your search for a life partner.',
  },
];

export const FAQ: policy[] = [
  {
    id: 1,
    heading: 'FAQ section for Royal Matrimony',
    content:
      'Are you feeling lost on how to use Royal Matrimony? Do you have some questions about the app? No worries, we’ve got you covered. Check out our frequently asked questions to get the answers you need!',
  },
  {
    id: 2,
    heading: 'How do I create an account on Royal Matrimony?',
    content:
      'To create an account on Royal Matrimony, follow these simple steps:',
    contentList: [
      {
        id: 1,
        list: 'Download the app from the App Store or Google Play store',
      },
      {
        id: 2,
        list: 'Click on “Register” and enter your details.',
      },
      {
        id: 3,
        list: 'Verify your phone number.',
      },
      {
        id: 4,
        list: 'Complete your profile with your details, such as your name, date of birth, location, and a recent photograph.',
      },
      {
        id: 5,
        list: 'Start searching for your perfect match!',
      },
    ],
  },
  {
    id: 3,
    heading: 'How do I search for a match on Royal Matrimony?',
    content: 'To search for a match on Royal Matrimony, follow these steps',
    contentList: [
      {
        id: 1,
        list: 'Click on the search icon on the bottom navigation bar.',
      },
      {
        id: 2,
        list: 'Choose your preferences such as age, location, religion, and community.',
      },
      {
        id: 3,
        list: 'Browse through the suggested profiles.',
      },
      {
        id: 4,
        list: 'Send interest or chat with the profiles that interest you.',
      },
    ],
  },
  {
    id: 4,
    heading: 'Is Royal Matrimony safe to use?',
    content:
      'Yes, Royal Matrimony is safe to use. We take every measure to ensure the safety and security of our users. We verify every user with their phone number and our app is protected by the latest security measures.',
  },
  {
    id: 5,
    heading: 'How can I delete my account in Royal Matrimony?',
    content: 'To delete your account on Royal Matrimony, follow these steps:',
    contentList: [
      {
        id: 1,
        list: 'Go to your profile.',
      },
      {
        id: 2,
        list: 'Click on the settings icon.',
      },
      {
        id: 3,
        list: 'Choose “Manage account”.',
      },
      {
        id: 4,
        list: 'Click on “Delete Account”.',
      },
      {
        id: 6,
        list: 'Enter your password and the reason for deleting your account.',
      },
      {
        id: 5,
        list: 'Click on “Delete Account” to confirm the action.',
      },
    ],
  },
  {
    id: 6,
    heading: 'How can I contact customer support in Royal Matrimony?',
    content:
      'If you have any queries or concerns, you can contact our customer support team by clicking on the “Help Centre” button in the setting menu. You can also email us at support@royalmatrimony.com.',
    content2:
      'We hope this FAQ section answered all your questions. If you still have any doubts or queries, feel free to contact us.',
  },
];

export const PrivacyHeadingList: any[] = [
  {
    id: 1,
    icon: ICONS.info,
    content: 'Privacy Policy',
  },
  {
    id: 2,
    icon: ICONS.termsAndService,
    content: 'Terms of Services',
  },
  {
    id: 3,
    icon: ICONS.faq,
    content: 'FAQ',
  },
];

export const SettingHeadingList: any[] = [
  {
    id: 1,
    icon: ICONS.profileSetting,
    content: 'Manage Account',
  },
  {
    id: 2,
    icon: ICONS.editSetting,
    content: 'Report',
  },
  {
    id: 3,
    icon: ICONS.info,
    content: 'Help Center',
  },
];

export const manageAccountList1: any[] = [
  {
    id: 1,
    icon: ICONS.call,
    content: 'Phone Number',
    data: '+91 9486467 ...',
  },
  {
    id: 2,
    icon: ICONS.email,
    content: 'Email',
    data: 'sakthimaan@..',
  },
  {
    id: 3,
    icon: ICONS.calender,
    content: 'Date of Birth',
    data: '12/27/1995',
  },
];

export const deleteAccountReasonList: any[] = [
  {
    id: 1,
    content: 'Not satisfied with service',
  },
  {
    id: 2,
    content: 'Marry Later/create profile Later',
  },
  {
    id: 3,
    content: 'Privacy issues',
  },
  {
    id: 4,
    content: 'Other Reasons',
  },
];

export const ReportList: any[] = [
  {
    id: 1,
    title: 'Obscene/Fake Profile',
  },
  {
    id: 2,
    title: 'Inappropriate Details',
  },
  {
    id: 3,
    title: 'Duplicate Profile',
  },
  {
    id: 4,
    title: 'Illicit Email',
  },
  {
    id: 5,
    title: 'Others',
  },
];
export const upgradePlans: any[] = [
  {
    id: 1,
    months: '3 Months',
    contacts: '200 Contacts',
    offer: '64% off',
    scratchPrice: '₹ 5400',
    currentPrice: '₹ 1,900',
  },
  {
    id: 2,
    months: '6 Months',
    contacts: '400 Contacts',
    offer: '78% off',
    scratchPrice: '₹ 11,989',
    currentPrice: '₹ 2,698',
  },
  {
    id: 3,
    months: '12 Months',
    contacts: '750 Contacts',
    offer: '77% off',
    scratchPrice: '₹ 19,425',
    currentPrice: '₹ 4,468',
  },
];
