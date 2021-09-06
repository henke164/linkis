import * as React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Clipboard, Alert } from 'react-native';
import { getThemeStyles } from '../services/themeService';
import { getExportString, getImportStringDetails, setStoredLinks } from '../services/storage';

const styles = getThemeStyles();

const SettingsScreen = ({ links, setLinks, setLoggedIn}) => {
  const [importStr, setImportStr] = React.useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
          }}>
          <Text
            style={styles.inputLabel}>
            Import list
          </Text>
          <TextInput
            autoCorrect={false}
            autoCompleteType='off'
            style={styles.input}
            placeholderTextColor={styles.inputPlaceHolder.color}
            onChangeText={setImportStr}
            value={importStr}
            placeholder="Enter import string"
          />

          <TouchableOpacity
            style={styles.settingsButton}
            onPress={async () => {
              const details = getImportStringDetails(importStr);
              
              if (!details.success) {
                Alert.alert("Import string does not contain any links");
                return;
              }

              Alert.alert(`Import ${details.links.length} links`,`Are you sure you want to add ${details.links.length} links to your collection?`, [
                {
                  text: 'Yes',
                  onPress: async () => {
                    const newLinks = [];
                    let duplicates = 0;

                    for (let i = 0; i < details.links.length; i++) {
                      const importedLink = details.links[i];
                      if (links.map(l => l.url).indexOf(importedLink.url) === -1) {
                        newLinks.push(importedLink);
                      } else {
                        duplicates++;
                      }
                    }

                    if (duplicates > 0) {
                      Alert.alert(`Skipped ${duplicates} duplicate links`);
                    }

                    const result = [...links, ...newLinks];
                    await setStoredLinks(result);
                    setLinks([...result]);
                  }
                },
                {
                  text: 'Cancel'
                }
              ]);
            }}
            underlayColor='#fff'>
            <Text style={styles.buttonText}>Import</Text>
          </TouchableOpacity>

          <Text
            style={styles.inputLabel}>
            Export list
          </Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={async () => {
              const exportString = await getExportString();
              Clipboard.setString(exportString);
              Alert.alert("Import string added to clipboard!");
            }}
            underlayColor='#fff'>
            <Text style={styles.buttonText}>Export</Text>
          </TouchableOpacity>
                    
          <Text
            style={styles.inputLabel}>
            Log out
          </Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => {
              Clipboard.setString("");
              setLoggedIn(false);
            }}
            underlayColor='#fff'>
            <Text style={styles.buttonText}>Clear clipboard and log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default SettingsScreen;