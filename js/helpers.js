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

// Rewriting Language codes to full words
export const rewriteLanguage = function getFullLanguageName(languageCode) {
  const languageDisplay = new Intl.DisplayNames(['en'], { type: 'language' });
  return languageDisplay.of(languageCode);
};
