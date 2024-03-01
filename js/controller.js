import { fetchBookInfo } from './model.js';
import { bookView } from './views/standardView.js';

const submitBtn = document.getElementById('submitBtn');
const ISBNInputField = document.getElementById('isbnInput');

// Button click starts grabbing data from API and renders the book view accordingly
submitBtn.addEventListener('click', () => {
  const isbn = ISBNInputField.value.replace(/ /g, '');
  fetchBookInfo(isbn)
    .then((bookInfo) => {
      console.log(bookInfo);
      bookView.render(bookInfo);
    })
    .catch((error) => {
      console.error('Error fetching book information:', error);
    });
});
