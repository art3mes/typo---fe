const initialState = {
  roomId: null,
  userId: null,
  users: [],
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_ROOM":
    case "JOIN_ROOM":
      return {
        ...state,
        roomId: action.payload.roomId,
        userId: action.payload.userId,
      };

      
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };

    case "LEAVE_ROOM":
      return {
        roomId: null,
        userId: null,
        users: [],
      };

    case "RESET_ROOM_STATE":
      return {
        roomId: null,
        userId: null,
        users: [],
      };

    default:
      return state;
  }
};

export default roomReducer;
