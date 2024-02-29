const axios = require('axios').default;
const apiKey = process.env.API_KEY;
const submitBtn = document.getElementById('submitBtn');
const ISBNInputField = document.getElementById('isbnInput');

// Function to fetch book information using ISBN
async function fetchBookInfo(isbn) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${apiKey}`
    );
    const bookData = response.data;
    console.log(`bookData:`, bookData);

    // Return object with above info
    return {
      authors: bookData.items[0].volumeInfo.authors.join(', '),
      pages: bookData.items[0].volumeInfo.pageCount,
      releaseDate: bookData.items[0].volumeInfo.publishedDate,
      language: bookData.items[0].volumeInfo.language,
      title: bookData.items[0].volumeInfo.title,
    };
  } catch (error) {
    console.error('Error fetching book information:', error);
    throw error;
  }
}

// Button click event handler that "searches" and updates according to passed in ISBN
submitBtn.addEventListener('click', () => {
  const isbn = ISBNInputField.value;
  fetchBookInfo(isbn)
    .then((bookInfo) => {
      console.log(bookInfo);
    })
    .catch((error) => {
      console.error('Error fetching book information:', error);
    });
});
