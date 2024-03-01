import { fetchBookInfo } from './model.js';
import { testFetch } from './model.js';
import { bookView } from './views/standardView.js';
import { addBooksToLS } from './model.js';
import { monaLisaOverdrive } from './model.js';
import { androids } from './model.js';
import { currentBook } from './model.js';

const testBook = androids; // Change according to which book we would like to test

// Selecting elements from HTML
const submitBtn = document.getElementById('submitBtn');
const ISBNInputField = document.getElementById('isbnInput');
const addBookBtn = document.getElementById('addBookBtn');

// Button click starts grabbing data from API and renders the book view accordingly
submitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('Button is now hidden');
  const isbn = ISBNInputField.value.replace(/ /g, '');
  // fetchBookInfo(isbn) // Runs API call. Only when testing full code! Will exhaust API calls
  testFetch(testBook) // TEST fetch function (doesn't use API)
    .then((bookInfo) => {
      // console.log(bookInfo);
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
