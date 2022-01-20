import React, {useContext, useReducer} from 'react';
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import trackInfo from './trackInfo';
import reducer from './reducer';

const AppContext = React.createContext();

const initialState = {
  loading: false,
  title: 'RNRFM',
  artist: 'RNRFM',
  cover: 'null',
  isPlaying: false,
  init: true,
  timeout: null,
};

export function AppProvider({children}) {
  // Reducer setup

  const [state, dispatch] = useReducer(reducer, initialState);

  function testReducer() {
    dispatch({type: 'TEST', payload: 'TESTING NEW FEATURE'});
  }

  async function getCoverUrl(artist, title) {
    const url = `http://10.0.2.2:6666/covers?artist=${encodeURIComponent(
      artist,
    )}&title=${encodeURIComponent(title)}`;
    return fetch(url, {method: 'get'})
      .then(res => res.json())
      .then(res => res.data)
      .catch(err =>
        console.log('cant connect to covers server: ', err.message),
      );
  }

  async function updateSong(title, artist) {
    const cover = await getCoverUrl(artist, title);
    dispatch({type: 'UPDATE_SONG', payload: {title, artist, cover}});
  }

  async function playStream() {
    if (state.timeout) {
      clearTimeout(state.timeout);
      dispatch({type: 'DELETE_TIMEOUT'});
    }
    if (state.init) {
      initPlayer();
    } else {
      await TrackPlayer.add([trackInfo]);
      dispatch({type: 'PLAYER_TOGGLE'});
      TrackPlayer.play();
    }
  }

  function pauseStream() {
    const timeout = setTimeout(() => {
      dispatch({type: 'INIT_TOGGLE'});
    }, 30000);
    dispatch({type: 'ADD_TIMEOUT', payload: timeout});
    dispatch({type: 'PLAYER_TOGGLE'});
    TrackPlayer.pause();
  }

  async function initPlayer() {
    try {
      dispatch({type: 'START_LOADING'});
      await TrackPlayer.setupPlayer();
      dispatch({type: 'END_LOADING'});
      await TrackPlayer.add([trackInfo]);
      dispatch({type: 'PLAYER_TOGGLE'});
      TrackPlayer.play();
      dispatch({type: 'INIT_TOGGLE'});
    } catch (err) {
      console.log(err);
    }
  }
  // handle events
  useTrackPlayerEvents([Event.PlaybackMetadataReceived], async e => {
    console.log('now playing:', e.artist, e.title);
    updateSong(e.title, e.artist);
  });

  return (
    <AppContext.Provider
      value={{
        state,
        testReducer,
        TrackPlayer,
        initPlayer,
        playStream,
        pauseStream,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(AppContext);
}
