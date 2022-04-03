import React, { useEffect } from 'react';
import { Clipboard, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import { navigationRef, navigate } from './components/RootNavigation';
import LinkisView from './components/LinkisView';
import AddLinkScreen from './pages/AddLinkScreen';
import WebBrowserScreen from './pages/WebBrowserScreen';
import LoginScreen from './pages/LoginScreen';
import Toast from 'react-native-toast-message';
import { getThemeStyles } from './services/themeService';
import { getStoredLinks } from './services/storage';

const styles = getThemeStyles();
const RootStack = createStackNavigator();

function App() {
  const [sceneIndex, setSceneIndex] = React.useState(0);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [links, setLinks] = React.useState([]);
  const [secret, setSecret] = React.useState(null);

  function onSecretChanged(newSecret) {
    setSecret(null);
    setSecret(newSecret);
  }

  useEffect(() => {
    if (!secret) {
      return;
    }

    getStoredLinks(secret).then(storedLinks => {
      if (storedLinks !== null) {
        setLinks(storedLinks);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, [secret]);

  if (loggedIn === false) {
    return <LoginScreen setSecret={onSecretChanged}></LoginScreen>;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        screenOptions={{
          presentation: 'modal',
          headerBackTitle: 'Cancel',
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerTintColor: styles.headerTitleStyle.color,
          headerTitleAlign: styles.headerTitleStyle.alignSelf,
        }}>
        <RootStack.Group>
          <RootStack.Screen name="Linkis" options={{
            headerRight: () => (
              <IconButton
                onPress={() => {
                  navigate('Add link');
                }}
                icon="plus-circle-outline"
                color={styles.headerRight.color}
              />
            ),
          }}>
            {() => <LinkisView
              secret={secret}
              sceneIndex={sceneIndex}
              setSceneIndex={setSceneIndex}
              links={links}
              setLinks={setLinks}
              setLoggedIn={setLoggedIn}
              />}
          </RootStack.Screen>
        </RootStack.Group>
        <RootStack.Group>
          <RootStack.Screen name="Add link">
            {() => <AddLinkScreen links={links} setLinks={setLinks} secret={secret} />}
          </RootStack.Screen>
          <RootStack.Screen name="WebBrowser" options={{
            headerRight: () => (
              <IconButton
                onPress={() => {
                  const route = navigationRef.getCurrentRoute();
                  const { link } = route.params;
                  Clipboard.setString(link.url);
                  Toast.show({
                    text1: 'Link added to clipboard',
                    text2: link.url
                  });
                }}
                icon="content-copy"
                color={styles.headerRight.color}
              />
            ),
          }}>
            {(params) => <WebBrowserScreen link={params.route.params.link} />}
          </RootStack.Screen>
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
