import axios from 'axios';

const pixabayApiUrl = 'https://pixabay.com/api/';

const defaultConfig = {
  key: '40945002-e125ab8d3394997b1a8dc0871',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

export default async function fetchImages(searchWord, pixabayConfig = {}) {
  return axios.get(pixabayApiUrl, {
    params: { ...defaultConfig, ...pixabayConfig, q: searchWord },
  });
}
