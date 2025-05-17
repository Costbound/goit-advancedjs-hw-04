import axios from 'axios';

const pixabayApiUrl = 'https://pixabay.com/api/';
const PER_PAGE = 15;
const MAX_PAGES = 500 / PER_PAGE;

const defaultConfig = {
  key: '40945002-e125ab8d3394997b1a8dc0871',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: PER_PAGE,
};

export default async function fetchImages(searchWord, pixabayConfig = {}) {
  if (pixabayConfig.page > MAX_PAGES) return { hits: [] };
  const res = await axios.get(pixabayApiUrl, {
    params: { ...defaultConfig, ...pixabayConfig, q: searchWord },
  });
  console.log(res.data.hits);
  return res.data;
}
