import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { getThemeStyles } from '../services/themeService';

import SettingsScreen from '../pages/SettingsScreen';
import BrowseScreen from '../pages/BrowseScreen';

const styles = getThemeStyles();

function LinkisView (props) {
  const [routes] = React.useState([
    { key: 'history', title: 'Links', icon: 'clipboard-list-outline' },
    { key: 'settings', title: 'Settings', icon: 'cog' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    history: () => <BrowseScreen {...props} />,
    settings: () => <SettingsScreen {...props} />,
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

export default React.memo(LinkisView, areEqual);