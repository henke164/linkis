import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { navigate } from '../components/RootNavigation';
import { getThemeStyles } from '../services/themeService';
import { getMetaData } from '../services/ogScraper';
import { setStoredLinks } from '../services/storage';

const styles = getThemeStyles();

const AddLinkScreen = ({ links, setLinks }) => {
  const [url, setUrl] = React.useState(null);
  const [urlErrorMessage, setUrlErrorMessage] = React.useState(null);

  const addLink = async function () {
    if (url === null) {
      setUrl(null);
      setUrlErrorMessage('Enter a valid link.');
      return;
    }

    setUrlErrorMessage(null);

    const meta = await getMetaData(url);

    if (meta === null) {
      setUrl(null);
      setUrlErrorMessage('Meta data not found on url.');
      return;
    }

    setUrlErrorMessage(null);

    links.push({
      url,
      time: Date.now(),
      image: meta.image,
      title: meta.title
    });

    await setStoredLinks(links);
    
    setLinks([...links]);

    navigate('Home');
  };

  return (
    <SafeAreaView style={styles.view}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1
          }}>
          <Text
            style={styles.textHeader}>
            Link
          </Text>
          <TextInput
            autoCorrect={false}
            autoCompleteType='off'
            style={styles.input}
            placeholderTextColor={styles.inputPlaceHolder.color}
            onChangeText={text => {
              setUrl(text);
            }}
            value={url}
            placeholder="i.e. https://somelink.com/test/123"
          />
          {urlErrorMessage && <Text style={styles.error}>
            {urlErrorMessage}
          </Text>}

          <TouchableOpacity
            style={styles.button}
            onPress={addLink}
            underlayColor='#fff'>
            <Text style={styles.buttonText}>Add link</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddLinkScreen;