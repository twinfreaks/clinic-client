const initialState = {
  listEmpty: true,
  info: [],
  currentDoctor: null,
  allMeetings: []
};

export default function doctors(state = initialState, action) {
  switch (action.type) {
    case 'LIST_EMPTY':
      return Object.assign({}, state, { listEmpty: action.payload });
    case 'SET_INFO':
      return Object.assign({}, state, { info: action.payload });
    case 'SET_CURRENT_DOCTOR':
      return Object.assign({}, state, { currentDoctor: action.payload });
    case 'SET_ALL_MEETINGS':
      return Object.assign({}, state, { allMeetings: action.payload });
      
    default:
      return state;
  }
}