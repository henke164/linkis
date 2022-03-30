import * as React from 'react';
import Toast from 'react-native-toast-message';
import { View, Text, Image, SafeAreaView, StatusBar, Clipboard, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { getThemeStyles } from '../services/themeService';
import Swipeout from 'react-native-swipeout';
import { navigate } from '../components/RootNavigation';

const styles = getThemeStyles();

const BrowseScreen = ({ links, setLinks }) => {
  const [filter, setFilter] = React.useState("");

  async function play(link) {
    if (link.video) {
      navigate('Browser', { url: link.video });
      return;
    }

    Clipboard.setString(link.url);
    Toast.show({
      text1: 'Link added to clipboard',
      text2: link.url
    });
  }

  function renderRow(data) {
    const link = data.item;

    let swipeBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => { 
        const idx = links.map(l => l.time).indexOf(link.time);
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
      
              {link.video ?
                <View style={styles.linkVideoTagWrapper}>
                  <Text style={styles.linkTagText}>Video</Text>
                </View> :
                <View style={styles.linkUrlTagWrapper}>
                  <Text style={styles.linkTagText}>Url</Text>
                </View>
              }
            </View>
        </TouchableOpacity>
      </Swipeout>
    );
  }

  return (
    <SafeAreaView style={styles.view}>
      <StatusBar backgroundColor={styles.statusBar.backgroundColor}></StatusBar>
      <TextInput
        autoCorrect={false}
        autoCompleteType='off'
        style={styles.searchInput}
        placeholderTextColor={styles.inputPlaceHolder.color}
        onChangeText={setFilter}
        value={filter}
        placeholder="Search"
      />
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <View
          style={{
            flex: 1,
            marginTop: 20,
          }}>
          
          <FlatList
            data={links.filter(l => l.title.toLowerCase().indexOf(filter.toLowerCase()) > -1)}
            renderItem={renderRow}
            keyExtractor={item => item.time.toString()}
          />
        </View>
      </View>
      <Toast></Toast>
    </SafeAreaView>
  );
};

export default BrowseScreen;