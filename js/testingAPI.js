export let currentBook = null;

const monaLisaOverdrive = new Object();
const androids = new Object();
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

export const testBook = androids; // Change according to which book we would like to test

export async function testFetch(testBook) {
  const volumeInfo = testBook;
  console.log('testBook (param):', testBook);
  const book = {
    authors: volumeInfo.authors ? volumeInfo.authors : 'Unknown',
    pages: volumeInfo.pages > 0 ? volumeInfo.pages : 'Unknown',
    releaseDate: volumeInfo.releaseDate ? volumeInfo.releaseDate : 'Unknown',
    language: volumeInfo.language ? volumeInfo.language : 'Unknown',
    title: volumeInfo.title ? volumeInfo.title : 'Unknown',
    cover:
      volumeInfo.cover ||
      new URL('../no-cover.png', import.meta.url).toString(),
    isbn: volumeInfo.isbn ? volumeInfo.isbn : 'Unknown',
    description: volumeInfo.description ? volumeInfo.description : 'Unknown',
  };
  currentBook = book;
  console.log('book:', book);
  console.log('currentBook:', currentBook);
  return book, currentBook;
}
