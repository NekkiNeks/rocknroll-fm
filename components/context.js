import React, {useContext, useReducer} from 'react';
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import trackdata from './trackInfo';
import reducer from './reducer';

const AppContext = React.createContext();

export function AppProvider({children}) {
  const initialState = {
    loading: true,
    trackInfo: {
      title: 'RNRFM',
      artist: 'RNRFM',
    },
    playerState: {
      isPlaying: false,
    },
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  function testReducer() {
    dispatch({type: 'TEST', payload: 'TESTING NEW FEATURE'});
  }

  function updateSong(title, artist) {
    dispatch({type: 'UPDATE_SONG', payload: {title, artist}});
  }

  async function playStream() {
    await TrackPlayer.add([trackdata]);
    dispatch({type: 'PLAYER_PLAY'});
    TrackPlayer.play();
  }

  function pauseStream() {
    dispatch({type: 'PLAYER_PAUSE'});
    TrackPlayer.pause();
  }

  async function startPlayer() {
    try {
      await TrackPlayer.setupPlayer();
      dispatch({type: 'END_LOADING'});
    } catch (err) {
      console.log(err);
    }
  }

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
        startPlayer,
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
