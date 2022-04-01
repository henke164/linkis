import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native';
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
      setPword(pw);
    })();
  }, []);

  async function register() {
    await setPassword(keyWord);
    await setStoredLinks([]);
    setLoggedIn(true);
  }

  async function clearData() {
    Alert.alert('Clear all data?', 'All your data will be lost. Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK', onPress: async () => {
          await removePassword();
          await setStoredLinks([]);
          setPword(null);
        }
      },
    ]);
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
        <View style={{ flex: 1 }}>
          <View style={{ marginVertical: 50, height: 50, alignItems: 'center' }}>
            <Image
              style={{ width: 200, height: 100 }}
              height={100}
              width={100}
              source={require('../assets/icon.png')}
            />
          </View>
          <Text
            style={styles.header}>
            {pword === null ? 'Register' : 'Login'}
          </Text>
          {
            !pword && (
              <Text style={styles.inputLabel}>
                Enter your secret password. This password will be required in the future to access your list. If you forget
                your password, you will have to reset all data.
              </Text>
            )
          }
          <Text
            style={styles.inputLabel}>
            Enter code:
          </Text>
          <TextInput
            autoCorrect={false}
            autoCompleteType='off'
            secureTextEntry={true}
            style={styles.input}
            placeholderTextColor={styles.inputPlaceHolder.color}
            onChangeText={text => {
              setKeyword(text);
            }}
            value={keyWord}
            placeholder=""
          />

          <TouchableOpacity
            style={styles.button}
            onPress={pword === null ? register : login}
            underlayColor='#fff'>
            <Text style={styles.buttonText}>{pword === null ? 'Register' : 'Enter'}</Text>
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