function reducer(state, action) {
  switch (action.type) {
    case 'TEST': {
      console.log(action.payload);
      return state;
    }
    case 'START_LOADING': {
      return {...state, loading: true};
    }
    case 'END_LOADING': {
      return {...state, loading: false};
    }
    case 'UPDATE_SONG': {
      const {title, artist, cover} = action.payload;
      return {...state, title, artist, cover};
    }
    case 'PLAYER_TOGGLE': {
      return {...state, isPlaying: !state.isPlaying};
    }
    case 'INIT_TOGGLE': {
      return {...state, init: !state.init};
    }
    case 'ADD_TIMEOUT': {
      return {...state, timeout: action.payload};
    }
    case 'DELETE_TIMEOUT': {
      return {...state, timeout: null};
    }
    default: {
      return state;
    }
  }
}

export default reducer;
