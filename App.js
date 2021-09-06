import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import { navigationRef, navigate } from './components/RootNavigation';
import BottomNav from './components/BottomNav';
import AddLinkScreen from './pages/AddLinkScreen';
import LoginScreen from './pages/LoginScreen';
import { getThemeStyles } from './services/themeService';
import { getStoredLinks } from './services/storage';

const styles = getThemeStyles();

const RootStack = createStackNavigator();

function App() {
  const [sceneIndex, setSceneIndex] = React.useState(0);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [links, setLinks] = React.useState([]);
  
  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    console.log("Loading links")
    const loadStoredLinks = async function () {
      const storedLinks = await getStoredLinks();
      setLinks(storedLinks);
    }

    loadStoredLinks();
  }, [loggedIn]);

  console.log('render');

  if (loggedIn === false) {
    return <LoginScreen setLoggedIn={setLoggedIn}></LoginScreen>;
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
            {() => <BottomNav
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
            {() => <AddLinkScreen links={links} setLinks={setLinks} />}
          </RootStack.Screen>
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
