export const CREATE_ROOM = "CREATE_ROOM";
export const JOIN_ROOM = "JOIN_ROOM";
export const SET_USERS = "SET_USERS";
export const LEAVE_ROOM = "LEAVE_ROOM";

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
