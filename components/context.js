import React, {useContext, useEffect, useReducer} from 'react';
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
  Capability,
} from 'react-native-track-player';
import getImageFromRadioHeart from '../functions/getImageFromRadioHeart';
import streamInfo from './streamInfo';
import reducer from './reducer';

const AppContext = React.createContext();

const initialState = {
  playerMode: 'radio',
  firstPlay: true,
  title: null,
  artist: null,
  cover: null,
  isPlaying: false,
  init: true,
  timeout: null,
  showMenu: false,
};

export function AppProvider({children}) {
  //Setup Player Here:
  async function setupPlayer() {
    await TrackPlayer.setupPlayer({
      waitForBuffer: true,
      playBuffer: 0.5,
    });
    // Player options
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [Capability.Play, Capability.Pause],
      compactCapabilities: [Capability.Play, Capability.Pause],
    });
  }
  useEffect(() => {
    setupPlayer().then(console.log('player is setuped'));
  }, []);

  console.log('state is updated');
  // Reducer setup
  const [state, dispatch] = useReducer(reducer, initialState);

  //Functions
  async function testReducer() {
    dispatch({});
  }

  function toggleMenu(value) {
    dispatch({type: 'TOGGLE_MENU', payload: value});
  }

  async function playStream() {
    if (state.timeout) {
      clearTimeout(state.timeout);
      dispatch({type: 'DELETE_TIMEOUT'});
    }
    if (state.init) {
      await TrackPlayer.reset();
      await TrackPlayer.add([streamInfo]);
      dispatch({type: 'INIT_TOGGLE', payload: false});
    }
    if (state.playerMode === 'podcast') {
      dispatch({type: 'PLAYER_MODE_TOGGLE', payload: 'radio'});
    }
    if (state.firstPlay === true) {
      dispatch({type: 'TURN_OFF_FIRST_PLAY'});
    }
    TrackPlayer.play();
    dispatch({type: 'PLAYER_TOGGLE', payload: true});
  }

  function pauseStream() {
    const timeout = setTimeout(() => {
      dispatch({type: 'INIT_TOGGLE', payload: true});
    }, 10000);
    dispatch({type: 'ADD_TIMEOUT', payload: timeout});
    dispatch({type: 'PLAYER_TOGGLE', payload: false});
    TrackPlayer.pause();
  }

  async function playPodcast(podcast) {
    await TrackPlayer.reset();
    await TrackPlayer.add(podcast);
    TrackPlayer.play();
    dispatch({type: 'PLAYER_MODE_TOGGLE', payload: 'podcast'});
    dispatch({type: 'REFRESH_STATE'});
  }

  async function updateTrackInfo(artist, title) {
    if (artist === null) {
      // if this is jingle
      dispatch({type: 'UPDATE_SONG', payload: {title, artist, cover: null}});
      await TrackPlayer.updateMetadataForTrack(0, {
        ...streamInfo,
        title,
        artist,
        artwork: require('../assets/logo.jpg'),
      });
    } else {
      // if this is a song
      let cover = await getImageFromRadioHeart(artist, title);
      console.log(cover);
      if (!cover) {
        console.log('there is no cover');
      }
      await TrackPlayer.updateMetadataForTrack(0, {
        ...streamInfo,
        title,
        artist,
        artwork: cover ? cover : require('../assets/logo.jpg'),
      });
      dispatch({type: 'UPDATE_SONG', payload: {title, artist, cover}});
    }
  }

  // handle events
  useTrackPlayerEvents([Event.PlaybackMetadataReceived], async e => {
    console.log('now playing:', e.artist, e.title);
    updateTrackInfo(e.artist, e.title);
  });

  useTrackPlayerEvents([Event.RemotePlay], async e => {
    if (state.playerMode === 'radio') {
      console.log('event remote-play fired!');
      playStream();
    }
    if (state.playerMode === 'podcast') {
      TrackPlayer.play();
    }
  });

  useTrackPlayerEvents([Event.RemotePause], async e => {
    if (state.playerMode === 'radio') {
      console.log('event remote-pause fired!');
      pauseStream();
    }
    if (state.playerMode === 'podcast') {
      TrackPlayer.pause();
    }
  });

  useTrackPlayerEvents([Event.PlaybackState], async e => {
    const playerState = await TrackPlayer.getState();
    console.log('player state: ', playerState);
  });

  return (
    <AppContext.Provider
      value={{
        state,
        testReducer,
        playStream,
        pauseStream,
        toggleMenu,
        playPodcast,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(AppContext);
}
