import { apiNearbyStation, apiNearbyBikestate } from './api';

async function getData(data) {
  let res;
  try {
    res = await data;
    // console.log(res);
  } catch (error) {
    console.log(error);
  }
  return res.data;
}

export const getNearbyStation = (lat, long) => getData(apiNearbyStation(lat, long));

export const getNearbyBikeState = (lat, long) => getData(apiNearbyBikestate(lat, long));

export const getLocationData = async (lat, long) => {
  let state = {};
  const data = await getNearbyStation(lat, long);
  const stateData = await getNearbyBikeState(lat, long);
  console.log('test', data);
  data.forEach((item1, index) => {
    stateData.forEach((item2) => {
      if (item1.StationUID === item2.StationUID) {
        state = {
          ServiceStatus: item2.ServiceStatus,
          AvailableRentBikes: item2.AvailableRentBikes,
          AvailableReturnBikes: item2.AvailableReturnBikes,
        };
      }
    });
    data[index].state = state;
  });
  console.log('1', data);
  return data;
};
