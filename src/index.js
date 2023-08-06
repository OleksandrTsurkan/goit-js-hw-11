import axios from 'axios';
import notiflix from './notiflix.js';
const { Notiflix, Notify, Report, Confirm, Loading, Block } = notiflix;


const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const searchQueryInput = form.elements.searchQuery;

const API_KEY = '38678956-a1561c04372c108d76606b5d7';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 20;

let page = 1;
let searchQuery = '';

async function fetchImages() {
    try {
        const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${PER_PAGE}`);
    return response.data;
    } catch {
       // throw new Error(response.statusText);
       Notiflix.Notify.failure(
        //'❌ Sorry, there are no images matching your search query. Please try again.'
      );
    }
}

function renderMarkup(images) {
    const cardsHtml = images.map((image) => {
      return `
        <div class="photo-card">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
          <div class="info">
            <p class="info-item"><b>Likes:</b> ${image.likes}</p>
            <p class="info-item"><b>Views:</b> ${image.views}</p>
            <p class="info-item"><b>Comments:</b> ${image.comments}</p>
            <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
          </div>
        </div>
      `;
    });
  
    gallery.insertAdjacentHTML('beforeend', cardsHtml.join(''));
  }

function clearGallery () {
    gallery.innerHTML = '';
}

function showResultsMessage() {
    notiflix.Notify.success('✅ Hooray! We found ${images.totalHits} images.');
}

function showNoResultsMessage() {
    notiflix.Notify.failure('❌Sorry, there are no images. Please try again.');
  }
  
  function showEndOfResultsMessage() {
    notiflix.Notify.info("You've reached the end of search results.");
  }


  async function searchImages(event) {
    event.preventDefault();
    searchQuery = searchQueryInput.value.trim();
    if (!searchQuery) return;
  
    page = 1;
    clearGallery();
  
    const images = await fetchImages();
  
    if (images && images.hits.length > 0) {
      renderMarkup(images.hits);
      scrollTop(0.2);
      loadMoreBtn.style.display = 'block';
      notiflix.Notify.success(`Found ${images.totalHits} images matching your search query.`);
      notiflix.Notify.success(`✅ Hooray! We found ${images.totalHits} images.`);
    } else {
      showNoResultsMessage();
    }
  }

  async function loadMoreImages() {
    page++;
    const images = await fetchImages();
  
    if (images && images.hits.length > 0) {
      renderMarkup(images.hits);
      scrollTop(2);
      //notiflix.Notify.success(`Loaded ${images.hits.length} more images.`);
      notiflix.Notify.success(`✅ Hooray! We found ${images.totalHits - images.hits.length} images.`);
    } else {
      loadMoreBtn.style.display = 'none';
      showEndOfResultsMessage();
    }
  }
  
  form.addEventListener('submit', searchImages);
  loadMoreBtn.addEventListener('click', loadMoreImages);



function scrollTop(el) {
    const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * el,
        behavior: "smooth",
      });
}

function onClickBtnUp() {
    window.scrollBy({
      top: -99999999999,
      behavior: 'smooth',
    });
    hidden(refs.btnUp);
  }


