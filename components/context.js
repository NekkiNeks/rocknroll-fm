import React, {useContext, useReducer} from 'react';
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
  Capability,
} from 'react-native-track-player';
import trackInfo from './trackInfo';
import reducer from './reducer';

const AppContext = React.createContext();

const initialState = {
  firstPlay: true,
  loading: false,
  title: null,
  artist: null,
  cover: null,
  isPlaying: false,
  init: true,
  timeout: null,
  initMetadata: true,
};

export function AppProvider({children}) {
  // Reducer setup

  const [state, dispatch] = useReducer(reducer, initialState);

  function testReducer() {
    dispatch({type: 'TEST', payload: 'TESTING NEW FEATURE'});
  }

  async function getImageFromRadioHeart(artist, title) {
    let responce = await fetch(
      `https://image-fetcher.radioheart.ru/api/get-image?artist=${encodeURIComponent(
        artist,
      )}&title=${encodeURIComponent(title)}`,
    );
    responce = await responce.json();
    if (responce.status === 'ok') {
      return responce.image;
    }
    return null;
  }

  async function updateSong(artist, title) {
    let cover = await getImageFromRadioHeart(artist, title);
    console.log(cover);
    if (!cover) {
      console.log('there is no cover');
    }
    await TrackPlayer.updateMetadataForTrack(0, {
      ...trackInfo,
      title,
      artist,
      artwork: cover ? cover : require('../assets/logo.jpg'),
    });
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
      dispatch({type: 'PLAYER_TOGGLE', payload: true});
      TrackPlayer.play();
    }
    dispatch({type: 'TURN_OFF_FIRST_PLAY'});
  }

  function pauseStream() {
    const timeout = setTimeout(() => {
      dispatch({type: 'INIT_TOGGLE', payload: true});
      dispatch({type: 'TURN_ON_INIT_METADATA'});
    }, 30000);
    dispatch({type: 'ADD_TIMEOUT', payload: timeout});
    dispatch({type: 'PLAYER_TOGGLE', payload: false});
    TrackPlayer.pause();
  }

  async function initPlayer() {
    try {
      dispatch({type: 'START_LOADING'});
      await TrackPlayer.setupPlayer();
      // Player options
      await TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [Capability.Play, Capability.Pause],
        compactCapabilities: [Capability.Play, Capability.Pause],
      });
      dispatch({type: 'END_LOADING'});
      await TrackPlayer.add([trackInfo]);
      dispatch({type: 'PLAYER_TOGGLE', payload: true});
      TrackPlayer.play();
      dispatch({type: 'INIT_TOGGLE', payload: false});
    } catch (err) {
      console.log(err);
    }
  }
  // handle events
  useTrackPlayerEvents([Event.PlaybackMetadataReceived], async e => {
    console.log('now playing:', e.artist, e.title);
    if (state.initMetadata) {
      if (e.artist === null) {
        console.log('throwing');
      } else {
        updateSong(e.artist, e.title);
      }
      dispatch({type: 'TURN_OFF_INIT_METADATA'});
    } else {
      updateSong(e.artist, e.title);
    }
  });

  useTrackPlayerEvents([Event.RemotePlay], async e => {
    console.log('event remote-play fired!');
    playStream();
  });

  useTrackPlayerEvents([Event.RemotePause], async e => {
    console.log('event remote-pause fired!');
    pauseStream();
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
