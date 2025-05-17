import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import fetchImages from './js/pixabay-api';
import { buildImagesHtml } from './js/render-functions';

const form = document.querySelector('form');
const [searchInput] = form.elements;
const gallery = document.querySelector('.gallery');
const moreBtn = document.querySelector('.more-btn');
const moreContainer = document.querySelector('.more_container');

const loader = document.createElement('span');
loader.classList.add('loader');

let searchWord = '';
let page = 1;

iziToast.settings({
  position: 'topRight',
  messageSize: '16px',
  displayMode: 2,
});
const simpleGallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', async e => {
  e.preventDefault();
  searchWord = searchInput.value.trim();
  page = 1;
  gallery.innerHTML = '';

  if (searchWord === '') {
    iziToast.error({ message: 'Search field cannot be empty' });
    moreBtn.classList.add('visually-hidden');
    return;
  }
  loader.classList.add('center');
  gallery.appendChild(loader);

  try {
    const hitsData = await fetchImages(searchWord, { page });
    const images = hitsData.hits;
    if (images.length === 0) {
      s;
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }
    const imagesHtml = buildImagesHtml(images);
    gallery.innerHTML = imagesHtml;
    simpleGallery.refresh();
    hitsData.totalHits > 15
      ? moreBtn.classList.remove('visually-hidden')
      : moreBtn.classList.add('visually-hidden');
  } catch (error) {
    handleError(error);
  } finally {
    loader.remove();
    loader.classList.remove('center');
  }
});

moreBtn.addEventListener('click', async () => {
  moreBtn.classList.add('visually-hidden');
  moreContainer.append(loader);

  try {
    const hitsData = await fetchImages(searchWord, { page: page + 1 });
    page++;
    const images = hitsData.hits;
    if (images.length === 0) {
      iziToast.error({
        message: "We're sorry, but you've reached the end of search results.",
      });
      return;
    }
    const imagesHtml = buildImagesHtml(images);
    gallery.insertAdjacentHTML('beforeend', imagesHtml);
    simpleGallery.refresh();
    moreBtn.classList.remove('visually-hidden');
    scrollToNewImages();
  } catch (error) {
    handleError(error);
  } finally {
    loader.remove();
  }
});

const handleError = error => {
  console.error('Error:', error);
  iziToast.error({
    message: 'Something went wrong. Please try again later.',
  });
};

function scrollToNewImages() {
  const card = gallery.querySelector('.gallery-item');
  if (card) {
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
