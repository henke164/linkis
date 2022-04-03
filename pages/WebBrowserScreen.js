import * as React from 'react';
import { View, SafeAreaView } from 'react-native';
import { getThemeStyles } from '../services/themeService';
import { WebView } from 'react-native-webview';
import Toast from 'react-native-toast-message';

const styles = getThemeStyles();

const WebBrowserScreen = ({ link }) => {
  let uri = link.video ? link.video : link.url;
  return (
    <SafeAreaView style={styles.view}>
      <View style={{ flex: 1, padding: 16 }}>
        <View style={{ flex: 1 }}>
          <WebView
            style={{
              flex: 1
            }}
            source={{ uri }}
          />
        </View>
      </View>
      <Toast></Toast>
    </SafeAreaView>
  );
};

export default WebBrowserScreen;