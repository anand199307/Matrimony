import {
  QUICK_ACTION_COUNTS,
  NEW_MATCHES,
  PROFILE_INFO,
  SELECTED_PLAN,
  CHATROOM_ID,
  SET_PROFILE_EDIT,
} from '../types';

const initialState = {
  quickAction_Count: {},
  newMatchingProfiles: [],
  profileInfo: {},
  selectedPlan: {},
  chatRoomId: null,
  editProfileStage: 1,
};

type Action = {
  type: string;
  payload?: any;
};

export default (state: any = initialState, action: Action) => {
  switch (action.type) {
    case QUICK_ACTION_COUNTS:
      return Object.assign({}, state, {
        quickAction_Count: action.payload,
      });
    case NEW_MATCHES:
      return Object.assign({}, state, {
        newMatchingProfiles: action.payload,
      });
    case PROFILE_INFO:
      return Object.assign({}, state, {
        profileInfo: action.payload,
      });
    case SELECTED_PLAN:
      return Object.assign({}, state, {
        selectedPlan: action.payload,
      });
    case CHATROOM_ID:
      return Object.assign({}, state, {
        chatRoomId: action.payload,
      });
    case SET_PROFILE_EDIT:
      return Object.assign({}, state, {
        editProfileStage: action.payload,
      });
    default:
      return state;
  }
};
