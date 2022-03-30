import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { getThemeStyles } from '../services/themeService';
import { setPassword, removePassword, getPassword, setStoredLinks } from '../services/storage';
import Toast from 'react-native-toast-message';

const styles = getThemeStyles();

const LoginScreen = ({ setLoggedIn }) => {
  const [keyWord, setKeyword] = React.useState(null);
  const [pword, setPword] = React.useState(null);

  useEffect(() => {
    (async function () {
      const pw = await getPassword();
      console.log('password:', pw);
      setPword(pw);
    })();
  }, []);

  async function register() {
    await setPassword(keyWord);
    await setStoredLinks([]);
    setLoggedIn(true);
  }

  async function clearData() {
    await removePassword();
    await setStoredLinks([]);
    setPword(null);
  }
  
  function login() {
    if (keyWord === pword) {
      setLoggedIn(true);
    } else {
      Toast.show({
        text1: 'Login failed',
        text2: 'Wrong password'
      });
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
            style={styles.header}>
            {pword === null ? 'Register' : 'Log in'}
          </Text>
          <Text
            style={styles.inputLabel}>
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
            onPress={pword === null ? register : login}
            underlayColor='#fff'>
            <Text style={styles.buttonText}>Enter</Text>
          </TouchableOpacity>
          
          {pword !== null && (
            <TouchableOpacity
              style={styles.linkButton}
              onPress={clearData}
              underlayColor='#fff'>
              <Text style={styles.linkButtonText}>Clear all data and reset app</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Toast></Toast>
    </SafeAreaView>
  );
};

export default LoginScreen;