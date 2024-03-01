import { fetchBookInfo } from './model.js';
import { testFetch } from './model.js';
import { bookView } from './views/standardView.js';
import { monaLisaOverdrive } from './model.js';
import { androids } from './model.js';

const testBook = androids; // Change according to which book we would like to test

const submitBtn = document.getElementById('submitBtn');
const ISBNInputField = document.getElementById('isbnInput');
const addBookBtn = document.getElementById('addBookBtn');

// Button click starts grabbing data from API and renders the book view accordingly
submitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('Button is now hidden');
  // Official Project code
  const isbn = ISBNInputField.value.replace(/ /g, '');
  // fetchBookInfo(isbn) // Runs API call. Only when testing full code! Will exhaust API calls
  testFetch(testBook)
    .then((bookInfo) => {
      // console.log(bookInfo);
      bookView.render(bookInfo);
    })
    .catch((error) => {
      console.error('Error fetching book information:', error);
    });
});
