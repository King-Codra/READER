import { getData } from './helpers.js';

// Necessary empty let variable to write the currently dislayed book's data into to store into local storage
export let currentBook = null;

// TESTING OBJECTS
// TESTING OBJECTS
// TESTING OBJECTS
export const monaLisaOverdrive = new Object();
export const androids = new Object();
monaLisaOverdrive.authors = `William Gibson`;
monaLisaOverdrive.pages = 350;
monaLisaOverdrive.releaseDate = 1997;
monaLisaOverdrive.language = 'en';
monaLisaOverdrive.title = 'Mona Lisa Overdrive';
monaLisaOverdrive.cover = new URL(
  '../mona-lisa-overdrive.jpg',
  import.meta.url
).toString();
monaLisaOverdrive.isbn = 9780553281743;
monaLisaOverdrive.description =
  'The third book in the Sprawl series, by William Gibson';

androids.authors = `Philip K. Dick`;
androids.pages = 210;
androids.releaseDate = 1969;
androids.language = 'en';
androids.title = 'Do Androids Dream of Electric Sheep';
androids.cover = new URL('../androids.jpg', import.meta.url).toString();
androids.isbn = 9780451038005;
androids.description =
  'A blade runner is an agent tasked with finding and retiring replicants';
// TESTING OBJECTS
// TESTING OBJECTS
// TESTING OBJECTS

// Function to fetch book information using ISBN WITH API
export async function fetchBookInfo(isbn) {
  try {
    const data = await getData(isbn);
    if (!data.items || data.items.length === 0) {
      console.log('No books found for this ISBN.');
      return;
    }
    console.log(`data:`, data);
    const volumeInfo = data.items[0].volumeInfo;

    // Return object with above info
    const book = {
      authors: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown',
      pages: volumeInfo.pageCount > 0 ? volumeInfo.pageCount : 'Unkown',
      releaseDate: volumeInfo.publishedDate
        ? volumeInfo.publishedDate
        : 'Unknown',
      language: volumeInfo.language ? volumeInfo.language : 'Unknown',
      title: volumeInfo.title ? volumeInfo.title : 'Unknown',
      cover:
        volumeInfo.imageLinks?.thumbnail ||
        new URL('../no-cover.png', import.meta.url).toString(),
    };

    currentBook = book;
    return book, currentBook;
  } catch (error) {
    console.error('Error fetching book information:', error);
    throw error;
  }
}

// Testing FETCH function (doesn't use API)
// TESTING TESTING TESTING TESTING TESTING TESTING TESTING TESTING
export async function testFetch(testBook) {
  const volumeInfo = testBook;
  console.log(testBook);
  const book = {
    authors: volumeInfo.authors ? volumeInfo.authors : 'Unknown',
    pages: volumeInfo.pages > 0 ? volumeInfo.pages : 'Unkown',
    releaseDate: volumeInfo.releaseDate ? volumeInfo.releaseDate : 'Unknown',
    language: volumeInfo.language ? volumeInfo.language : 'Unknown',
    title: volumeInfo.title ? volumeInfo.title : 'Unknown',
    cover:
      volumeInfo.cover ||
      new URL('../no-cover.png', import.meta.url).toString(),
    isbn: volumeInfo.isbn ? volumeInfo : 'Unknown',
  };
  currentBook = book;
  return book, currentBook;
}
// TESTING TESTING TESTING TESTING TESTING TESTING TESTING TESTING
// TESTING TESTING TESTING TESTING TESTING TESTING TESTING TESTING

export const addBooksToLS = function (book) {
  let books = JSON.parse(localStorage.getItem('myBooks')) || [];
  const bookAdded = books.some((storedBook) => storedBook.isbn === book.isbn);
  if (bookAdded) {
    console.log('Book is already in My Books');
    return;
  }

  books.push(book);
  localStorage.setItem('myBooks', JSON.stringify(books));
  displayStoredBooks();
};

// Function that will retrieve the Local Storage, so displayStoredBooks can work with the data
const getBooksFromLS = function () {
  return JSON.parse(localStorage.getItem('myBooks')) || [];
};

// Will take data from local storage and put necessary data in the HTMl so user gets desired view in My Books.
export function displayStoredBooks() {
  const books = getBooksFromLS();
  const myBooks = document.getElementById('my-books-container');
  const placeholder = document.getElementById('my-books-placeholder');

  // Removes all child elements of my-books-container to make place for data specific to the book the user will add
  Array.from(myBooks.children).forEach((child) => {
    if (!child.classList.contains('placeholder')) {
      myBooks.removeChild(child);
    }
  });

  // Checks wether there are any books in the local storage, if so removes placeholder. (we don't need a placeholder to take up space in your My Books folder, do we? )
  if (books.length === 0) {
    placeholder.style.display = 'block';
  } else {
    placeholder.style.display = 'none';

    // Adds the necessary book specific data into the My Books HTML to show the bok in the container
    books.forEach((book) => {
      const bookElement = document.createElement('div');
      bookElement.classList.add('my-book-item');
      bookElement.innerHTML = `
      <img src="${
        book.cover || 'add-book.png'
      }" alt="Book Cover" class="my-book-cover" />
      <div class="my-book-info">
        <h3 class="my-book-title">${book.title || 'No Title'}</h3>
        <p class="my-book-author">${book.authors || 'Unknown Author'}</p>
        <p class="my-book-description">${
          book.description || 'No Description Available'
        }</p>
      </div>
    `;
      myBooks.appendChild(bookElement);
    });
  }
}
