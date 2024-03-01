import { rewriteLanguage } from '../helpers';
import { displayStoredBooks } from '../model';
export const modal = document.getElementById('bookModal');
export const closeModalBtn = document.getElementsByClassName('close-button')[0];

// Making sure all User's books are ready at load page
document.addEventListener('DOMContentLoaded', displayStoredBooks);

// Class of the Main book view on page load. Includes functionality to inject HTML with necessary info
class BookView {
  #parentElement = document.querySelector('.book-details');
  #data;

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }

  #generateMarkup() {
    return `
      <img src="${this.#data.cover}" alt="Book Cover" class="book-cover" />
      <div class="book-details">
        <h2 class="book-title">${this.#data.title}</h2>
        <p class="book-author">${this.#data.authors}</p>
        <p class="book-release-date">Year: ${this.#data.releaseDate}</p>
        <p class="book-pages">Pages: ${this.#data.pages}</p>
        <p class="book-language">${rewriteLanguage(
          `${this.#data.language}`
        )}</p>
        <button id="addBookBtn">Add Book</button>
      </div>
    `;
  }
}

export const bookView = new BookView();

export function openModal(book) {
  modal.style.display = 'block';
  document.getElementById('modalBookTitle').textContent = book.title;
  document.getElementById('modalBookAuthor').textContent = book.authors;
  document.getElementById('modalBookDescription').textContent =
    book.description;
  document.getElementById('modalBookCover').src = book.cover;
  document.getElementById('modalBookISBN').textContent = `ISBN: ${book.isbn}`;
}
