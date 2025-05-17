import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

export const gallery = document.querySelector('.gallery');
export const moreBtn = document.querySelector('.more-btn');
const moreContainer = document.querySelector('.more_container');

const loader = document.createElement('span');
loader.classList.add('loader');

iziToast.settings({
  position: 'topRight',
  messageSize: '16px',
  displayMode: 2,
});

const simpleGallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function buildImagesHtml(images) {
  return images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="gallery-item">
            <div class="img-wrapper">
              <a href="${largeImageURL}">
                  <img
                    class="gallery-img"
                    src="${webformatURL}" 
                    alt="${tags}"
                    width="360"
                    height="200">
              </a> 
            </div>
            <div class="text-wrapper">
              <ul class="img-info-list">
                <li class="info-item">
                  <h3 class="info-title">likes</h3>
                  <p class="info-text">${likes}</p>
                </li>
                <li class="info-item">
                  <h3 class="info-title">views</h3>
                  <p class="info-text">${views}</p>
                </li>
                <li class="info-item">
                  <h3 class="info-title">comments</h3>
                  <p class="info-text">${comments}</p>
                </li>
                <li class="info-item">
                  <h3 class="info-title">downloads</h3>
                  <p class="info-text">${downloads}</p>
                </li>
              </ul>
            </div>
        </li>`;
      }
    )
    .join(' ');
}

const clearGallery = () => {
  gallery.innerHTML = '';
};

export const renderNewGallery = (images, totalHits) => {
  const imagesHtml = buildImagesHtml(images);
  gallery.innerHTML = imagesHtml;
  simpleGallery.refresh();
  totalHits > 15 ? showMoreBtn() : hideMoreBtn();
};

export const appendImagesHtmlToGallery = images => {
  const imagesHtml = buildImagesHtml(images);
  gallery.insertAdjacentHTML('beforeend', imagesHtml);
  simpleGallery.refresh();
};

export const renderLoaderInGallery = () => {
  clearGallery();
  gallery.append(loader);
  loader.classList.add('center');
};

export const renderLoaderInMoreContainer = () => {
  hideMoreBtn();
  moreContainer.append(loader);
};

export const removeAndResetLoader = () => {
  loader.remove();
  loader.className = 'loader';
};

export const showMoreBtn = () => {
  moreBtn.classList.remove('visually-hidden');
};

export const hideMoreBtn = () => {
  moreBtn.classList.add('visually-hidden');
};

export const showErrorMessage = message => {
  iziToast.error({
    message,
  });
};
