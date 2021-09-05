import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { getThemeStyles } from '../services/themeService';

const styles = getThemeStyles();

const LoginScreen = ({ setLoggedIn }) => {
  const [keyWord, setKeyword] = React.useState(null);
  
  function login() {
    if (keyWord === "13371337") {
      setLoggedIn(true);
    }
  }

  return (
    <SafeAreaView style={styles.view}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1
          }}>
          <Text
            style={styles.textHeader}>
            Enter code:
          </Text>
          <TextInput
            autoCorrect={false}
            autoCompleteType='off'
            style={styles.input}
            placeholderTextColor={styles.inputPlaceHolder.color}
            onChangeText={text => {
              setKeyword(text);
            }}
            value={keyWord}
            placeholder=""
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={login}
            underlayColor='#fff'>
            <Text style={styles.buttonText}>Enter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;