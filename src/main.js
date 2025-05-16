import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import fetchImages from './js/pixabay-api';
import { buildGalleryHtml } from './js/render-functions';

const form = document.querySelector('form');
const [searchInput] = form.elements;
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

iziToast.settings({
  message:
    'Sorry, there are no images matching your search query. Please try again!',
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
  if (searchInput.value.trim() === '') {
    iziToast.error({
      message: 'Search field cannot be empty',
      position: 'topRight',
      messageSize: '16px',
    });
    return;
  }
  loader.classList.remove('visually-hidden');
  fetchImages(searchInput.value.trim())
    .then(({ data: { hits: images } }) => {
      if (images.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          messageSize: '16px',
        });
        gallery.innerHTML = '';
        return;
      }
      const buildedGallaryHtml = buildGalleryHtml(images);
      gallery.innerHTML = buildedGallaryHtml;
      simpleGallery.refresh();
    })
    .catch(() => {
      iziToast.error({
        message: 'Something went wrong. Please try again later.',
        position: 'topRight',
        messageSize: '16px',
      });
    })
    .finally(() => {
      loader.classList.add('visually-hidden');
    });
});
