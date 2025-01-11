import {DISCOVER_SELECTED_DATA} from '../types';

const setSelectedDiscoverData = (payload: any) => ({
  type: DISCOVER_SELECTED_DATA,
  payload,
});

export default {
  setSelectedDiscoverData,
};
