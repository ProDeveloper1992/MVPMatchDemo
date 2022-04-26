import React, {Component, useEffect, useState} from 'react';
import Navigator from './src/navigator';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {persistor, store} from './src/redux/store';
import {ButtonTypes, Colors} from './src/constants';
import NetInfo from '@react-native-community/netinfo';
import Modal from 'react-native-modal';
import {FontTypes} from './src/constants/font-types';
import {AppText, Button} from './src/components';

const App = (props) => {
  const [isOffline, setOfflineStatus] = useState(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(
      (networkState) => {
        console.log('networkState', networkState);
        const offline = !(
          networkState.isConnected && networkState.isInternetReachable
        );
        setOfflineStatus(offline);
      },
    );

    return () => removeNetInfoSubscription();
  }, []);

  const onRetry = () => {
    NetInfo.fetch().then((networkState) => {
      console.log('Connection type - ', networkState.type);
      console.log('Is connected? - ', networkState.isConnected);
      const offline = !(
        networkState.isConnected && networkState.isInternetReachable
      );
      setOfflineStatus(offline);
    });
  };

  return (
    <View style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <Navigator />
          <NoInternetModal show={isOffline} onRetry={onRetry} />
        </PersistGate>
      </Provider>
    </View>
  );
};

const Loading = () => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <ActivityIndicator color={Colors.ui_black} size={'large'} />
  </View>
);

const NoInternetModal = ({show, onRetry}) => (
  <Modal
    isVisible={show}
    useNativeDriver={true}
    useNativeDriverForBackdrop={true}
    hideModalContentWhileAnimating={true}
    propagateSwipe={true}
    style={styles.modal}
    animationInTiming={600}>
    <View style={styles.modalContainer}>
      <AppText size={22} fontType={FontTypes.semibold}>
        {'Connection Error'}
      </AppText>
      <AppText size={18} color={Colors.dark_gray} style={styles.modalText}>
        {'Oops! Looks like your device is not connected to the Internet.'}
      </AppText>
      <Button
        title={'Try Again!'}
        type={ButtonTypes.danger}
        onPress={onRetry}
        style={styles.button}
      />
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    height: '30%',
    backgroundColor: Colors.ui_white,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    marginTop: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.ui_black,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: Colors.ui_white,
    fontSize: 20,
  },
});

export default App;
