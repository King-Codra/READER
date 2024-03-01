import { getData } from './helpers.js';

export const monaLisaOverdrive = new Object();

monaLisaOverdrive.authors = `William Gibson`;
monaLisaOverdrive.pages = 350;
monaLisaOverdrive.releaseDate = 1997;
monaLisaOverdrive.language = 'en';
monaLisaOverdrive.title = 'Mona Lisa Overdrive';
monaLisaOverdrive.cover = new URL(
  '../mona-lisa-overdrive.jpg',
  import.meta.url
).toString();
monaLisaOverdrive.isbn13 = 9780553281743;
monaLisaOverdrive.description =
  'The third book in the Sprawl series, by William Gibson';

export const androids = new Object();

androids.authors = `Philip K. Dick`;
androids.pages = 210;
androids.releaseDate = 1969;
androids.language = 'en';
androids.title = 'Do Androids Dream of Electric Sheep';
androids.cover = new URL('../androids.jpg', import.meta.url).toString();
androids.isbn13 = 9780451038005;
androids.description =
  'A blade runner is an agent tasked with finding and retiring replicants';

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
  };
  return book;
}
