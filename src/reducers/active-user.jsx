const initialState = {
  role: null,
  info: null
};

export default function activeUser(state = initialState, action) {
  switch (action.type) {
    case 'SET_ROLE':
      return Object.assign({}, state, { role: action.payload });
    case 'SET_USER_INFO':
      return Object.assign({}, state, { info: action.payload });
      
    default:
      return state;
  }
}