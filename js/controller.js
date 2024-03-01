import { fetchBookInfo } from './model.js';
import { addBooksToLS } from './model.js';
// import { currentBook } from './model.js'; // When using Google API
import { bookView } from './views/standardView.js';
import { testFetch } from './testingAPI.js';
import { testBooks } from './testingAPI.js';
import { currentBook } from './testingAPI.js'; // When using testingAPI.js (for tests without API)

// Selecting elements from HTML
const submitBtn = document.getElementById('submitBtn');
const ISBNInputField = document.getElementById('isbnInput');
const addBookBtn = document.getElementById('addBookBtn');

// Button click starts grabbing data from API and renders the book view accordingly
submitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const isbn = ISBNInputField.value.replace(/ /g, '');
  if (!isbn) {
    console.log('No ISBN entered');
    return;
  }
  // fetchBookInfo(isbn) // Runs API call. Only when testing full code! Will exhaust API calls
  testFetch(isbn) // TEST fetch function (doesn't use API)
    .then((bookInfo) => {
      console.log('bookInfo:', bookInfo);
      bookView.render(bookInfo);
    })
    .catch((error) => {
      console.error('Error fetching book information:', error);
    });
});

// Way too complicated logic to do a simple event listener for a button, but there you go Add Book button starts adding the Book found through search field to Local Storage which will in turn add it to the My Books view at the bottom of the page
document.querySelector('.book-details').addEventListener('click', (event) => {
  if (event.target.id === 'addBookBtn') {
  }
  console.log('current book is: ', currentBook);
  currentBook
    ? addBooksToLS(currentBook)
    : console.log('There is no current book');
});
