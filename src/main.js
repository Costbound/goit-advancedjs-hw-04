import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import fetchImages from './js/pixabay-api';
import {
  hideMoreBtn,
  moreBtn,
  removeAndResetLoader,
  renderNewGallery,
  showErrorMessage,
  renderLoaderInGallery,
  renderLoaderInMoreContainer,
  appendImagesHtmlToGallery,
  showMoreBtn,
  gallery,
} from './js/render-functions';

const form = document.querySelector('form');
const [searchInput] = form.elements;

let searchWord = '';
let page = 1;

form.addEventListener('submit', async e => {
  e.preventDefault();
  searchWord = page = 1;
  renderLoaderInGallery();
  try {
    searchWord = parseSearchInput();
    const { hits: images, totalHits } = await fetchImages(searchWord, { page });
    if (images.length === 0) {
      showErrorMessage(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }
    renderNewGallery(images, totalHits);
  } catch (error) {
    handleError(error);
  } finally {
    removeAndResetLoader();
  }
});

moreBtn.addEventListener('click', async () => {
  renderLoaderInMoreContainer();
  try {
    const { hits: images } = await fetchImages(searchWord, { page: page + 1 });
    page++;
    if (images.length === 0) {
      showErrorMessage(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }
    appendImagesHtmlToGallery(images);
    showMoreBtn();
    scrollToNewImages();
  } catch (error) {
    handleError(error);
  } finally {
    removeAndResetLoader();
  }
});

const handleError = error => {
  console.error('Error:', error);
  if (error.message) {
    showErrorMessage(error.message);
    return;
  }
  showErrorMessage('Something went wrong. Please try again later.');
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

const parseSearchInput = () => {
  const inputValue = searchInput.value.trim();
  if (inputValue === '') {
    hideMoreBtn();
    throw new Error('Search field cannot be empty');
  }
  return inputValue;
};
