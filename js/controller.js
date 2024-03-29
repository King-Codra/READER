import { fetchBookInfo } from './model.js';
import { addBooksToLS } from './model.js';
// import { currentBook } from './model.js'; // When using Google API
import { bookView } from './views/standardView.js';
import { closeModalBtn } from './views/standardView.js';
import { modal } from './views/standardView.js';
import { openModal } from './views/standardView.js';
import { testFetch } from './testingAPI.js';
import { testBooks } from './testingAPI.js';
import { currentBook } from './testingAPI.js'; // When using testingAPI.js (for tests without API)

// Selecting elements from HTML
const submitBtn = document.getElementById('submitBtn');
const ISBNInputField = document.getElementById('isbnInput');
const addBookBtn = document.getElementById('addBookBtn');
const myBooksView = document.getElementById('my-books-container');

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

// Way too complicated logic to do a simple event listener for a button, but there you go               Add Book button starts adding the Book found through search field to Local Storage which will in turn add it to the My Books view at the bottom of the page
document.querySelector('.book-details').addEventListener('click', (e) => {
  if (e.target.id === 'addBookBtn') {
    console.log(e.target.id);
    console.log('current book is: ', currentBook);
    currentBook
      ? addBooksToLS(currentBook)
      : console.log('There is no current book');
  }
});

ISBNInputField.addEventListener('keypress', (e) => {
  e.preventDefault();
  if (e.key === 'Enter') {
    submitBtn.click();
  }
});

myBooksView.addEventListener('click', function (e) {
  e.preventDefault();
  let clickedBook = e.target.closest('.my-book-item');
  console.log('book was clicked');
  if (clickedBook) {
    console.log(clickedBook.dataset.isbn);
    const isbn = clickedBook.dataset.isbn;

    console.log(clickedBook);
    let bookForModal = testFetch(isbn);
    console.log(currentBook);
    openModal(currentBook);
  }
});

closeModalBtn.addEventListener('click', (e) => {
  e.preventDefault();
  modal.style.display = 'none';
});

window.onclick = function (e) {
  e.preventDefault();
  if (e.target == modal) {
    modal.style.display = 'none';
  }
};
