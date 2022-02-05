function reducer(state, action) {
  switch (action.type) {
    case 'TEST': {
      console.log(action.payload);
      return state;
    }
    case 'REFRESH_STATE': {
      return {
        ...state,
        isPlaying: false,
        firstPlay: true,
        init: true,
        cover: null,
      };
    }
    case 'UPDATE_SONG': {
      const {title, artist, cover} = action.payload;
      return {...state, title, artist, cover};
    }
    case 'PLAYER_TOGGLE': {
      return {...state, isPlaying: action.payload};
    }
    case 'PLAYER_MODE_TOGGLE': {
      return {...state, playerMode: action.payload};
    }
    case 'SET_STATE': {
      return {...state, playerState: action.payload};
    }
    case 'ADD_TIMEOUT': {
      return {...state, timeout: action.payload};
    }
    case 'DELETE_TIMEOUT': {
      return {...state, timeout: null};
    }
    case 'TURN_OFF_FIRST_PLAY': {
      return {...state, firstPlay: false};
    }
    case 'INIT_TOGGLE': {
      return {...state, init: action.payload};
    }
    case 'TOGGLE_MENU': {
      return {...state, showMenu: action.payload};
    }

    default: {
      console.log(state);
      return state;
    }
  }
}

export default reducer;
