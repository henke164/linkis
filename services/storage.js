import CryptoJS from "crypto-js";
import AsyncStorage from '@react-native-async-storage/async-storage';

function getImportStringDetails(cipher, secret) {
  try {
    const links = getLinksFromCypher(cipher, secret);
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
  return await AsyncStorage.getItem('links');
}

async function setStoredLinks(links, password) {
  if (!links) {
    await AsyncStorage.removeItem('links');
    return;
  }
  console.log("Saving link...", {
    links,
    password
  });
  try {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(links), password).toString();
    await AsyncStorage.setItem(
      'links',
      ciphertext
    );
    console.log("Link saved!");
  } catch (error) {
    console.log("Error saving link");
    console.error(error);
  }
};

function getLinksFromCypher(cipher, secret) {
  const bytes  = CryptoJS.AES.decrypt(cipher, secret);
  const jsonText = bytes.toString(CryptoJS.enc.Utf8);
  const links = JSON.parse(jsonText);
  return links;
}

async function getStoredLinks(secret) {
  try {
    const ciphertext = await AsyncStorage.getItem('links');
    console.log('cipher', ciphertext);
    if (ciphertext !== null) {
      const links = getLinksFromCypher(ciphertext, secret);
      if (!links) {
        return [];
      }
      return links;
    }
  } catch (error) {
    console.log("Error");
    console.log(error);
  }
  console.log('No stored links...');
  return null;
};

async function isValidLogin(secret) {
  const links = await getStoredLinks(secret);
  return links !== null;
}

async function hasStoredData() {
  const links = await AsyncStorage.getItem('links');
  return links !== null;
}

module.exports = {
  getImportStringDetails,
  getExportString,
  isValidLogin,
  hasStoredData,
  setStoredLinks,
  getStoredLinks
}