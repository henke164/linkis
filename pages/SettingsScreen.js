import * as React from 'react';
import { View, Text, SafeAreaView, Clipboard, TouchableOpacity, TextInput, Alert } from 'react-native';
import { getThemeStyles } from '../services/themeService';
import { getExportString, getImportStringDetails, setStoredLinks } from '../services/storage';

const styles = getThemeStyles();

const SettingsScreen = ({ links, setLinks, setLoggedIn, secret}) => {
  const [importCipher, setImportCipher] = React.useState("");
  const [importSecret, setImportSecret] = React.useState("");

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
            onChangeText={setImportCipher}
            value={importCipher}
            placeholder="Enter import string"
          />
          
          <TextInput
            autoCorrect={false}
            autoCompleteType='off'
            style={styles.input}
            placeholderTextColor={styles.inputPlaceHolder.color}
            onChangeText={setImportSecret}
            value={importSecret}
            secureTextEntry={true}
            placeholder="Enter import password"
          />

          <TouchableOpacity
            style={styles.settingsButton}
            onPress={async () => {
              const details = getImportStringDetails(importCipher, importSecret);
              
              setImportCipher("");
              setImportSecret("");
              
              if (!details.success) {
                Alert.alert("Failed to import!", "Either the import password is wrong or the string does not contain any links");
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
                    await setStoredLinks(result, secret);
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
              const exportString = await getExportString(secret);
              Clipboard.setString(exportString);
              Alert.alert("Import string added to clipboard!", "Your current password is the 'Import password'");
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