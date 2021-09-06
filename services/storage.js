import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'react-native-base64';

function getImportStringDetails(str) {
  try {
    console.log(str);
    const result = base64.decode(str);
    const links = JSON.parse(result);

    console.log(links);
    return {
      success: true,
      links,
    }
  } catch(e) {
    console.log(e);
  }
  return {
    success: false
  }
}

async function getExportString() {
  const storedLinks = await getStoredLinks();
  const storedLinksStr = JSON.stringify(storedLinks);
  return base64.encode(storedLinksStr);
}

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

async function removePassword(password) {
  console.log("Saving password...");
  try {
    await AsyncStorage.removeItem('password');
    console.log("Password saved!");
    return true;
  } catch (error) {
    console.log("Error saving link");
    console.error(error);
  }
  return false;
};

async function setPassword(password) {
  console.log("Saving password...");
  try {
    await AsyncStorage.setItem(
      'password',
      password
    );
    console.log("Password saved!");
    return true;
  } catch (error) {
    console.log("Error saving link");
    console.error(error);
  }
  return false;
};

async function getPassword() {
  try {
    console.log("Getting password...")
    const value = await AsyncStorage.getItem('password');
    return value;
  } catch (error) {
    console.log("Error");
  }
};

module.exports = {
  getImportStringDetails,
  getExportString,
  setPassword,
  removePassword,
  getPassword,
  setStoredLinks,
  getStoredLinks
}