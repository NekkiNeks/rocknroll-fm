function reducer(state, action) {
  switch (action.type) {
    case 'TEST': {
      console.log(action.payload);
      return state;
    }
    case 'END_LOADING': {
      return {...state, loading: false};
    }
    case 'UPDATE_SONG': {
      return {...state, trackInfo: action.payload};
    }
    case 'PLAYER_PLAY': {
      return {...state, playerState: {isPlaying: true}};
    }
    case 'PLAYER_PAUSE': {
      return {...state, playerState: {isPlaying: false}};
    }
    default: {
      return state;
    }
  }
}

export default reducer;
