import { getData } from './helpers.js';

// Function to fetch book information using ISBN
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
    return book;
  } catch (error) {
    console.error('Error fetching book information:', error);
    throw error;
  }
}
