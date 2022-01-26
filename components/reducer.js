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
      return {...state, isPlaying: action.payload};
    }
    case 'INIT_TOGGLE': {
      return {...state, init: action.payload};
    }
    case 'ADD_TIMEOUT': {
      return {...state, timeout: action.payload};
    }
    case 'DELETE_TIMEOUT': {
      return {...state, timeout: null};
    }
    case 'TURN_OFF_INIT_METADATA': {
      return {...state, initMetadata: false};
    }
    case 'TURN_ON_INIT_METADATA': {
      return {...state, initMetadata: true};
    }

    default: {
      return state;
    }
  }
}

export default reducer;
