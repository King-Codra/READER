const apiKey = process.env.API_KEY;
const axios = require('axios').default;

// Gets data from Google Books API
export const getData = async function (isbn) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${apiKey}`
    );

    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
    throw new Error(`${err.response.data.message} (${err.response.status})`);
  }
};

// User Locale functions
// Rewriting Language codes to full words
export const rewriteLanguage = function getFullLanguageName(languageCode) {
  const languageDisplay = new Intl.DisplayNames(['en'], { type: 'language' });
  return languageDisplay.of(languageCode);
};

export const dateLocalizer = function (date, locale = 'default') {
  return new Intl.DateTimeFormat(locale).format(date);
};

// Clear Local storage
document
  .getElementById('clearLocalStorageBtn')
  .addEventListener('click', () => {
    localStorage.clear();
    location.reload();
    console.log('Local storage cleared!');
  });

// Fix for way too long description texts
export function truncateText(text, limit) {
  const words = text.split(' ');

  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...';
  }

  return text;
}

const slider = document.querySelector('.my-books-container');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
});

slider.addEventListener('mouseup', () => {
  isDown = false;
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 0.75; // The number 2 determines the scroll speed
  slider.scrollLeft = scrollLeft - walk;
});
