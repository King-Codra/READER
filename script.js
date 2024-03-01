// const axios = require('axios').default;
// // const apiKey = process.env.API_KEY;
// const submitBtn = document.getElementById('submitBtn');
// const ISBNInputField = document.getElementById('isbnInput');

// function getFullLanguageName(languageCode) {
//   const languageDisplay = new Intl.DisplayNames(['en'], { type: 'language' });
//   return languageDisplay.of(languageCode);
// }

// // Function to fetch book information using ISBN
// async function fetchBookInfo(isbn) {
//   try {
//     const response = await axios.get(
//       `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${apiKey}`
//     );
//     const data = response.data;
//     // Check if items array exists and has at least one item
//     if (!data.items || data.items.length === 0) {
//       console.log('No books found for this ISBN.');
//       return; // Exit the function if no books are found
//     }

//     console.log(`data:`, data);

//     const volumeInfo = data.items[0].volumeInfo;

//     // Return object with above info
//     const book = {
//       authors: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown',
//       pages: volumeInfo.pageCount > 0 ? volumeInfo.pageCount : 'Unkown',
//       releaseDate: volumeInfo.publishedDate
//         ? volumeInfo.publishedDate
//         : 'Unknown',
//       language: volumeInfo.language ? volumeInfo.language : 'Unknown',
//       title: volumeInfo.title ? volumeInfo.title : 'Unknown',
//       cover:
//         volumeInfo.imageLinks?.thumbnail ||
//         new URL('no-cover.png', import.meta.url).toString(),
//     };
//     return book;
//   } catch (error) {
//     console.error('Error fetching book information:', error);
//     throw error;
//   }
// }

// class BookView {
//   #parentElement = document.querySelector('.book-details');
//   #data;

//   render(data) {
//     this.#data = data;
//     const markup = this.#generateMarkup();
//     this.#clear();
//     this.#parentElement.insertAdjacentHTML('afterbegin', markup);
//   }

//   #clear() {
//     this.#parentElement.innerHTML = '';
//   }

//   #generateMarkup() {
//     return `

//     <img src="${this.#data.cover}" alt="Book Cover" class="book-cover" />
//     <div class="book-details">
//       <h2 class="book-title">${this.#data.title}</h2>
//       <p class="book-author">${this.#data.authors}</p>
//       <p class="book-release-date">Year: ${this.#data.releaseDate}</p>
//       <p class="book-pages">Pages: ${this.#data.pages}</p>
//       <p class="book-language">${getFullLanguageName(
//         `${this.#data.language}`
//       )}</p>
// `;
//   }
// }

// const bookView = new BookView();

// // Button click event handler that "searches" and updates according to passed in ISBN
// submitBtn.addEventListener('click', () => {
//   const isbn = ISBNInputField.value;
//   fetchBookInfo(isbn)
//     .then((bookInfo) => {
//       bookView.render(bookInfo);
//     })
//     .catch((error) => {
//       console.error('Error fetching book information:', error);
//     });
// });
