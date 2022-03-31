import * as React from 'react';
import { View, SafeAreaView } from 'react-native';
import { getThemeStyles } from '../services/themeService';
import { WebView } from 'react-native-webview';
import Toast from 'react-native-toast-message';

const styles = getThemeStyles();

const WebBrowserScreen = ({ url }) => {
  console.log(url);
  return (
    <SafeAreaView style={styles.view}>
      <View style={{ flex: 1, padding: 16 }}>
        <View style={{ flex: 1 }}>
          <WebView
            style={{
              flex: 1
            }}
            source={{ uri: url }}
          />
        </View>
      </View>
      <Toast></Toast>
    </SafeAreaView>
  );
};

export default WebBrowserScreen;