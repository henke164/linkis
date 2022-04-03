import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'react-native-base64';

function cipher(text, salt) {
  const textToChars = text => text.split('').map(c => c.charCodeAt(0));
  const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);

  return text.split('')
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join('');
}
  
function decipher(encoded, salt) {
  const textToChars = text => text.split('').map(c => c.charCodeAt(0));
  const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
  return encoded.match(/.{1,2}/g)
    .map(hex => parseInt(hex, 16))
    .map(applySaltToChar)
    .map(charCode => String.fromCharCode(charCode))
    .join('');
}

function getImportStringDetails(str, secret) {
  try {
    const result = decipher(str, secret);
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

async function getExportString(secret) {
  const storedLinks = await getStoredLinks(secret);
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

async function getStoredLinks(secret) {
  try {
    console.log("Getting items...")
    const value = await AsyncStorage.getItem('links');
    console.log('value', value);
    const result = decipher(value, secret);
    console.log('result', result);
    if (result !== null) {
      const saved = JSON.parse(result);
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