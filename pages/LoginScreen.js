import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native';
import { getThemeStyles } from '../services/themeService';
import { isValidLogin, setStoredLinks, hasStoredData } from '../services/storage';
import Toast from 'react-native-toast-message';

const styles = getThemeStyles();

const LoginScreen = ({ setSecret }) => {
  const [secretInput, setSecretInput] = React.useState(null);
  const [isNewUser, setIsNewUser] = React.useState(null);

  React.useEffect(() => {
    hasStoredData().then(res => {
      setIsNewUser(!res);
      setSecretInput("");
    });
  }, []);

  async function login() {
    const isValid = await isValidLogin(secretInput);
    if (isValid) {
      setSecret(secretInput);
    } else {
      Toast.show({
        text1: 'Login failed',
        text2: 'Could not decrypt the link list with that password.'
      });
    }
  }

  async function register() {
    await setStoredLinks([], secretInput);
    await setSecret(secretInput);
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
          await setStoredLinks(null);
          setIsNewUser(true);
        }
      },
    ]);
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
            {isNewUser ? 'Register' : 'Login'}
          </Text>
          {
            isNewUser && (
              <View>
                <Text style={styles.inputLabel}>
                  The password will be the encryption key for your stored data.
                </Text>
                <Text style={styles.inputLabel}>
                  If you forget your password, you will have to reset all data.
                </Text>
              </View>
            )
          }
          <Text
            style={styles.inputLabel}>
            Enter password:
          </Text>
          <TextInput
            autoCorrect={false}
            autoCompleteType='off'
            secureTextEntry={!isNewUser}
            style={styles.input}
            placeholderTextColor={styles.inputPlaceHolder.color}
            onChangeText={text => {
              setSecretInput(text);
            }}
            onSubmitEditing={isNewUser ? register : login}
            value={secretInput}
            placeholder=""
          />

          <TouchableOpacity
            style={styles.button}
            onPress={isNewUser ? register : login}
            underlayColor='#fff'>
            <Text style={styles.buttonText}>{isNewUser ? 'Register' : 'Login'}</Text>
          </TouchableOpacity>
          
          {!isNewUser && (
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