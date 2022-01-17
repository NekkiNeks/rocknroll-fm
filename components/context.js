import React, {useContext, useState} from 'react';
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import trackdata from './trackInfo';

const AppContext = React.createContext();

export function AppProvider({children}) {
  const [loading, setLoading] = useState(true);
  const [trackInfo, setTrackInfo] = useState({title: 'RNRFM', artist: 'RNRFM'});

  async function startPlayer() {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add([trackdata]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useTrackPlayerEvents([Event.PlaybackMetadataReceived], async e => {
    console.log('now playing:', e.artist, e.title);
    setTrackInfo({title: e.title, artist: e.artist});
  });

  return (
    <AppContext.Provider
      value={{
        TrackPlayer,
        startPlayer,
        loading,
        trackInfo,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(AppContext);
}
