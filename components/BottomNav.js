import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { getThemeStyles } from '../services/themeService';

import LogoutScreen from '../pages/LogoutScreen';
import BrowseScreen from '../pages/BrowseScreen';

const styles = getThemeStyles();

function BottomNav (props) {
  const [routes] = React.useState([
    { key: 'history', title: 'Browse', icon: 'clipboard-list-outline' },
    { key: 'logout', title: 'Logout', icon: 'cog' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    history: () => <BrowseScreen {...props} />,
    logout: () => <LogoutScreen {...props} />,
  });

  return (
    <BottomNavigation
      barStyle={styles.bottomNavBarStyle}
      navigationState={{ index: props.sceneIndex, routes }}
      activeColor={styles.bottomNavBarActive.color}
      inactiveColor={styles.bottomNavBarInactive.color}
      onIndexChange={(i) => props.setSceneIndex(i)}
      renderScene={renderScene}
    />

  );
};


function areEqual() {
  return false;
}

export default React.memo(BottomNav, areEqual);