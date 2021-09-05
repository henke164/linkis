import AsyncStorage from '@react-native-async-storage/async-storage';

async function setStoredLinks(links) {
  console.log("Saving link...");
  try {
    await AsyncStorage.setItem(
      'links',
      JSON.stringify(links)
    );
    console.log("Link saved!");
  } catch (error) {
    console.log("Error saving link");
    console.error(error);
  }
};

async function getStoredLinks() {
  try {
    console.log("Getting items...")
    const value = await AsyncStorage.getItem('links');
    if (value !== null) {
      const saved = JSON.parse(value);
      if (!saved) {
        return [];
      }
      return saved;
    }
  } catch (error) {
    console.log("Error");
  }
  
  return [];
};

module.exports = {
  setStoredLinks,
  getStoredLinks
}