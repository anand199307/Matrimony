import { ReactNode } from 'react';

export type WithChildrenProps<T = undefined> = T extends undefined
  ? {
      authToken?: string | null;
      children?: ReactNode;
    }
  : T & {
      authToken?: string | null;
      children?: ReactNode;
    };
