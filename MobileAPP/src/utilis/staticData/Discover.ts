import {ICONS} from '../../assets/Icons';

export interface miniIcon {
  id?: any;
  text1?: string;
  src?: any;
}

export const ProfileCircle: miniIcon[] = [
  {
    id: 1,
    text1: 'Not interested',
    src: ICONS.notInterested,
  },
    {
    id: 5,
    text1: 'Sent message',
    src: ICONS.sendImage,
  },
  {
    id: 2,
    text1: 'Favourite',
    src: ICONS.favourite,
  },
  {
    id:3,
    text1: 'Send Interest',
    src: ICONS.connectNow,
  },
   {
    id:4,
    text1: 'Accept',
    src: ICONS.accept,
  },
  
];
