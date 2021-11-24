import axios from 'axios';
/* 引入標頭金鑰驗證 */
import getAuthorization from './getAuthorizationHeader';

const bikeRequest = axios.create({
  baseURL: 'https://ptx.transportdata.tw',
  headers: getAuthorization(),
});

/* 輸出bikeAPI */
export const apiNearbyStation = (lat, long) => bikeRequest.get(`/MOTC/v2/Bike/Station/NearBy?&$spatialFilter=nearby(${lat}%2C%20${long}%2C1000)&$format=JSON`);
export const apiNearbyBikestate = (lat, long) => bikeRequest.get(`/MOTC/v2/Bike/Availability/NearBy?$spatialFilter=nearby(${lat}%2C%20${long}%2C1000)&$format=JSON`);
