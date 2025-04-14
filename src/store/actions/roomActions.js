import {
  CREATE_ROOM,
  JOIN_ROOM,
  LEAVE_ROOM,
  RESET_ROOM_STATE,
  SET_USERS,
} from "../../utils/constants";


export const createRoom = (roomId, userId) => ({
  type: CREATE_ROOM,
  payload: { roomId, userId },
});

export const joinRoom = (roomId, userId) => ({
  type: JOIN_ROOM,
  payload: { roomId, userId },
});

export const setUsers = (users) => ({
  type: SET_USERS,
  payload: users,
});

export const leaveRoom = () => ({
  type: LEAVE_ROOM,
});

export const resetRoomState = () => ({
  type: RESET_ROOM_STATE,
});
