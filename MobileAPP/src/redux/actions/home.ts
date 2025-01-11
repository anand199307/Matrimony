import {
  QUICK_ACTION_COUNTS,
  NEW_MATCHES,
  PROFILE_INFO,
  SELECTED_PLAN,
  CHATROOM_ID,
  SET_PROFILE_EDIT,
} from '../types';

const setQuickActionCounts = (payload: any) => ({
  type: QUICK_ACTION_COUNTS,
  payload,
});

const setNewMatchingProfiles = (payload: any) => ({
  type: NEW_MATCHES,
  payload,
});

const setUserProfileInfo = (payload: any) => ({
  type: PROFILE_INFO,
  payload,
});
const setSelectedPlan = (payload: any) => ({
  type: SELECTED_PLAN,
  payload,
});

const setChatRoomId = (payload: any) => ({
  type: CHATROOM_ID,
  payload,
});

const setEditProfile = (payload: number) => ({
  type: SET_PROFILE_EDIT,
  payload,
});
export default {
  setQuickActionCounts,
  setNewMatchingProfiles,
  setUserProfileInfo,
  setSelectedPlan,
  setChatRoomId,
  setEditProfile,
};
