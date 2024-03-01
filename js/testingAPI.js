export let currentBook = null;

const testBooks = {
  monaLisaOverdrive: {
    authors: 'William Gibson',
    pages: 350,
    releaseDate: 1997,
    language: 'en',
    title: 'Mona Lisa Overdrive',
    cover: new URL('../mona-lisa-overdrive.jpg', import.meta.url).toString(),
    isbn: 9780553281743,
    description: 'The third book in the Sprawl series, by William Gibson',
  },
  androids: {
    authors: 'Philip K. Dick',
    pages: 210,
    releaseDate: 1969,
    language: 'en',
    title: 'Do Androids Dream of Electric Sheep',
    cover: new URL('../androids.jpg', import.meta.url).toString(),
    isbn: 9780451038005,
    description:
      'A blade runner is an agent tasked with finding and retiring replicants',
  },
};

export async function testFetch(isbn) {
  Object.values(testBooks).forEach((book) => {
    if (book.isbn == isbn) {
      neededBook = book;
    }
  });

  if (!neededBook) {
    console.log('No test book found for this ISBN:', isbn);
    return null;
  }
  const volumeInfo = neededBook;
  console.log('testBook (param):', testBooks);

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
