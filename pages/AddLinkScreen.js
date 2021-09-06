import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, Clipboard, SafeAreaView } from 'react-native';
import { navigate } from '../components/RootNavigation';
import { getThemeStyles } from '../services/themeService';
import { getMetaData } from '../services/ogScraper';
import { setStoredLinks } from '../services/storage';

const styles = getThemeStyles();

const AddLinkScreen = ({ links, setLinks }) => {
  const [url, setUrl] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [urlErrorMessage, setUrlErrorMessage] = React.useState(null);

  React.useEffect(() => {
    if (!!url) {
      return;
    }

    (async () => {
    const paste = await Clipboard.getString();
      if (paste.indexOf('https://') > -1) {
        setUrl(paste);
      }
    })();
  }, []);

  const addLink = async function () {
    if (url === null) {
      setUrl(null);
      setUrlErrorMessage('Enter a valid link.');
      return;
    }

    setUrlErrorMessage(null);

    setIsLoading(true);

    const meta = await getMetaData(url);

    setIsLoading(false);
    
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

    navigate('Linkis');
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.view}>
        <View style={{ flex: 1, padding: 16 }}>
          <View
            style={{
              flex: 1
            }}>
            <Text
              style={styles.header}>
              Please wait...
            </Text>
            
            <Text
              style={styles.inputLabel}>
              Importing metadata from {url}...
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.view}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1
          }}>
          <Text
            style={styles.inputLabel}>
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