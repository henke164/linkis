import * as React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Clipboard } from 'react-native';
import { getThemeStyles } from '../services/themeService';

const styles = getThemeStyles();

const LogoutScreen = ({setLoggedIn}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Clipboard.setString("");
              setLoggedIn(false);
            }}
            underlayColor='#fff'>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default LogoutScreen;