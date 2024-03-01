import { fetchBookInfo } from './model.js';
import { bookView } from './views/standardView.js';
import { testBook } from './model.js';

const submitBtn = document.getElementById('submitBtn');
const ISBNInputField = document.getElementById('isbnInput');
const addBookBtn = document.getElementById('addBookBtn');

// Button click starts grabbing data from API and renders the book view accordingly
submitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  // Official Project code
  const isbn = ISBNInputField.value.replace(/ /g, '');
  // Test runs to not deplete API Calls
  const testISBN = testBook.isbn10;
  // addBookBtn.classList.remove('hidden');
  console.log('Button is now hidden');
  fetchBookInfo(testISBN)
    .then((bookInfo) => {
      console.log(bookInfo);
      bookView.render(bookInfo);
    })
    .catch((error) => {
      console.error('Error fetching book information:', error);
    });
});
