import { getData } from './helpers.js';

export const testBook = new Object();

testBook.authors = `William Gibson`;
testBook.pages = 350;
testBook.releaseDate = 1997;
testBook.language = 'en';
testBook.title = 'Mona Lisa Overdrive';
testBook.cover = './book-cover.jpg';
testBook.isbn10 = 9780553281743;

// Function to fetch book information using ISBN

export async function fetchBookInfo(testBook) {
  // Param should be isbn at project launch or to test api
  try {
    const data = await getData(testBook);
    // Param should be isbn at project launch or to test api
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
    return book;
  } catch (error) {
    console.error('Error fetching book information:', error);
    throw error;
  }
}
