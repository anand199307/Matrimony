import {ICONS} from '../../assets/Icons';

export interface miniIcon {
  startColor?: string;
  endColor?: string;
  src?: any;
  title?: string;
  id?: any;
  quickActionText?: string;
  quickActionNumber?: string;
  valueText?: string;
}

export const searchFilter: miniIcon[] = [
  {
    id: 1,
    startColor: '#27AE60',
    endColor: '#27AE60',
    src: ICONS.searchBag,
    title: 'Filter by employment',
    quickActionText: 'Your Favourites',
    quickActionNumber: '15',
    valueText: 'yourFavourites',
  },
  {
    id: 2,
    startColor: '#EE2150',
    endColor: '#B3173C',
    src: ICONS.searchLocation,
    title: 'Ignored Profile',
    quickActionText: 'Ignored Profile',
    quickActionNumber: '21',
    valueText: 'ignoreList',
  },
  {
    id: 3,
    startColor: '#F2994A',
    endColor: '#F2994A',
    src: ICONS.searchStar,
    title: 'Filter by star',
    quickActionText: 'Favourited You',
    quickActionNumber: '18',
    valueText: 'favouritedYourProfile',
  },
  {
    id: 4,
    startColor: '#2F80ED',
    endColor: '#2F80ED',
    src: ICONS.searchReligion,
    title: 'Profile created',
    quickActionText: 'Viewed Your Profile',
    quickActionNumber: '22',
    valueText: 'viewedYourProfile',
  },
];

export const preferenceHeading: any[] = [
  {
    id: 1,
    title: 'Basic details',
    active: false,
  },
  {
    id: 2,
    title: 'religious details',
    active: false,
  },
  {
    id: 3,
    title: 'professional details',
    active: false,
  },
  {
    id: 4,
    title: 'location details',
    active: false,
  },
];

export type ItemData = {
  id: string;
  title: string;
};

export const showProfile: ItemData[] = [
  {
    id: '1',
    title: 'Newly Created',
  },
  {
    id: '2',
    title: 'Within a week',
  },
  {
    id: '3',
    title: 'within a month',
  },
  {
    id: '4',
    title: 'within three months',
  },
];

export const profileCreated: ItemData[] = [
  {
    id: '1',
    title: 'With Horoscope',
  },
  {
    id: '2',
    title: 'with profile picture',
  },
  {
    id: '3',
    title: 'premium user',
  },
  {
    id: '4',
    title: 'within three months',
  },
];
