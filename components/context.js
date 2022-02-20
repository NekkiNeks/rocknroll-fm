import React, {useContext, useEffect, useReducer} from 'react';
import {Linking, Platform, Share} from 'react-native';
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
  playerState: null,
  firstPlay: true,
  title: null,
  artist: null,
  cover: null,
  isPlaying: false,
  init: true,
  timeout: null,
  showMenu: false,
  showSearchMenu: false,
  currentPodcast: null,
  podcastPlaying: true,
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
      capabilities: [Capability.Play, Capability.Pause, Capability.SeekTo],
      compactCapabilities: [Capability.Play, Capability.Pause],
      alwaysPauseOnInterruption: true,
    });
  }
  useEffect(() => {
    setupPlayer().then(console.log('player is setuped'));
  }, []);

  // Reducer setup
  const [state, dispatch] = useReducer(reducer, initialState);

  //Functions
  async function testReducer() {
    dispatch({});
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
      dispatch({type: 'SET_CURRENT_PODCAST', payload: null});
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

  async function playPodcast(podcast, id) {
    await TrackPlayer.reset();
    dispatch({type: 'SET_CURRENT_PODCAST', payload: id});
    await TrackPlayer.add(podcast);
    TrackPlayer.play();
    dispatch({type: 'PLAYER_MODE_TOGGLE', payload: 'podcast'});
    dispatch({type: 'REFRESH_STATE'});
  }

  function togglePodcastPlaying(value) {
    dispatch({type: 'TOGGLE_PODCAST_PLAYING', payload: value});
  }

  function toggleMenu(value) {
    dispatch({type: 'TOGGLE_MENU', payload: value});
  }

  function toggleSearchMenu(value) {
    if (state.showMenu) {
      dispatch({type: 'TOGGLE_MENU', payload: false});
    }
    dispatch({type: 'TOGGLE_SEARCH_MENU', payload: value});
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
      dispatch({type: 'UPDATE_SONG', payload: {title, artist, cover: null}});
      let cover = await getImageFromRadioHeart(artist, title);
      dispatch({type: 'UPDATE_SONG', payload: {title, artist, cover}});
      console.log(cover);
      await TrackPlayer.updateMetadataForTrack(0, {
        ...streamInfo,
        title,
        artist,
        artwork: cover ? cover : require('../assets/logo.jpg'),
      });
    }
  }

  function searchSong(serviceName) {
    if (serviceName === 'spotify') {
      openUrl(
        `https://open.spotify.com/search/${state.artist} - ${state.title}`,
      );
    } else if (serviceName === 'apple') {
      // idk how to resolve it so here is a mess...
      if (Platform.OS === 'ios') {
        openUrl('music://music.apple.com/search');
      } else {
        openUrl(
          `https://music.apple.com/ru/search?term=${state.artist} - ${state.title}`,
        );
      }
    } else if (serviceName === 'yandex') {
      openUrl(
        `https://music.yandex.ru/search?text=${state.artist} - ${state.title}`,
      );
    }
  }

  // handle events
  useTrackPlayerEvents([Event.PlaybackMetadataReceived], async e => {
    const title = e.title.length > 30 ? e.title.slice(0, 30) + '...' : e.title;
    const artist = e.artist;
    console.log('now playing:', e.artist, e.title);
    updateTrackInfo(artist, title);
  });

  useTrackPlayerEvents([Event.RemotePlay], async e => {
    if (state.playerMode === 'radio') {
      console.log('event remote-play fired!');
      playStream();
    }
    if (state.playerMode === 'podcast') {
      TrackPlayer.play();
      togglePodcastPlaying(true);
    }
  });

  useTrackPlayerEvents([Event.RemotePause], async e => {
    if (state.playerMode === 'radio') {
      console.log('event remote-pause fired!');
      pauseStream();
    }
    if (state.playerMode === 'podcast') {
      TrackPlayer.pause();
      togglePodcastPlaying(false);
    }
  });

  useTrackPlayerEvents([Event.PlaybackState], async e => {
    const playerState = await TrackPlayer.getState();
    dispatch({type: 'SET_STATE', payload: playerState});
  });

  useTrackPlayerEvents([Event.RemoteDuck], async e => {
    if (!e.paused) {
      TrackPlayer.play();
    }
  });

  useTrackPlayerEvents([Event.RemoteSeek], async e => {
    console.log(e);
    await TrackPlayer.seekTo(e.position);
  });

  //Native Functions
  function openUrl(url) {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  }

  function openPhone() {
    const link = 'tel://+79996377097';
    Linking.openURL(link).catch(err => console.error('sorry i cant', err));
  }

  function shareMessage(message) {
    Share.share({message});
  }

  return (
    <AppContext.Provider
      value={{
        state,
        testReducer,
        playStream,
        pauseStream,
        toggleMenu,
        toggleSearchMenu,
        searchSong,
        playPodcast,
        openUrl,
        openPhone,
        shareMessage,
        togglePodcastPlaying,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(AppContext);
}
