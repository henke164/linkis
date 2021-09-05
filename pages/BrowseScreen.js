import * as React from 'react';
import { View, Text, Image, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Clipboard } from 'react-native';
import { getThemeStyles } from '../services/themeService';
import Swipeout from 'react-native-swipeout';

const styles = getThemeStyles();

const BrowseScreen = ({ links, setLinks }) => {
  async function play(link) {
    Clipboard.setString(link.url);
  }

  function renderRow(data) {
    const link = data.item;

    let swipeBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => { 
        const idx = links.map(l => l.time).indexOf(link.time);  
        console.log("Deleted", link.time);
        links.splice(idx, 1);
        setLinks([...links]);
      }
    }];
    
    return (
      <Swipeout right={swipeBtns}
      autoClose={true}
      backgroundColor= 'transparent'>
        <TouchableOpacity
          underlayColor='rgba(192,192,192,1,0.6)'
          onPress={() => play(link)} >
            <View style={styles.linkRow}>
              <Image style={styles.linkImage} source={{uri: link.image}}></Image>

              <View style={styles.linkDetails}>
                <Text style={styles.linkText}>{link.title}</Text>
                <View style={styles.linkDateWrapper}>
                  <Text style={styles.linkDateText}>{new Date(link.time).toLocaleDateString()}</Text>
                </View>
              </View>
            </View>
        </TouchableOpacity>
      </Swipeout>
    );
  }

  return (
    <SafeAreaView style={styles.view}>
      <StatusBar backgroundColor={styles.statusBar.backgroundColor}></StatusBar>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            marginTop: 20,
          }}>
          
          <FlatList
            data={links}
            renderItem={renderRow}
            keyExtractor={item => item.time.toString()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BrowseScreen;