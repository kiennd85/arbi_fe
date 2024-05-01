//import jwt from 'jsonwebtoken';
import { WS_STRING } from '../arbi/constants';
import CryptoJS from 'crypto-js';

export const convert_timestampstring_to_string = (timestampString) => {
  const timestamp = new Date(timestampString);

  // Extracting date components
  const year = timestamp.getFullYear();
  const month = timestamp.getMonth() + 1; // Months are zero-based, so we add 1
  const day = timestamp.getDate();

  // Extracting time components
  const hours = timestamp.getHours();
  const minutes = timestamp.getMinutes();
  const seconds = timestamp.getSeconds();

  // Creating a human-readable format
  const formattedTimestamp = `${year}-${month < 10 ? '0' + month : month}-${
    day < 10 ? '0' + day : day
  } ${hours}:${minutes < 10 ? '0' + minutes : minutes}:${
    seconds < 10 ? '0' + seconds : seconds
  }`;

  return formattedTimestamp;
};

export const get_token = async () => {
  const key = process.env.REACT_APP_KEY;
  const token = CryptoJS.AES.encrypt(WS_STRING, key).toString();
  //const token = '';
  return token;
};

//console.log(get_token());
export const round_number = (number, type) => {
  if (number) {
    number = parseFloat(number);
    switch (type) {
      case 'gain':
        return number.toFixed(1);
      case 'qty':
        return number.toFixed(0);
      default:
        return number > 1 ? number.toFixed(2) : number.toFixed(6);
    }
  }
};

export const round_num = ({ type, number }) => {
  if (number) {
    number = parseFloat(number);
    switch (type) {
      case 'gain':
        return number.toFixed(1);
      case 'qty':
        return number.toFixed(0);
      default:
        return number > 1 ? number.toFixed(2) : number.toFixed(6);
    }
  }
};
