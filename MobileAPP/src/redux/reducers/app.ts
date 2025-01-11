import {DISCOVER_SELECTED_DATA} from '../types';

const initialState = {
  selectedDiscoverData: 'Discover Matches',
};

type Action = {
  type: string;
  payload?: any;
};

export default (state: any = initialState, action: Action) => {
  switch (action.type) {
    case DISCOVER_SELECTED_DATA:
      return Object.assign({}, state, {
        selectedDiscoverData: action.payload,
      });
    default:
      return state;
  }
};
