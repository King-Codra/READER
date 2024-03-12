export let currentBook = null;

// IF YOU ADD NEW KEYS TO TEST BOOKS ALWAYS ALSO ADD THEM TO testFetch !!!!!
const testBooks = {
  monaLisaOverdrive: {
    authors: 'William Gibson',
    pages: 350,
    releaseDate: 1997,
    language: 'en',
    title: 'Mona Lisa Overdrive',
    cover: new URL(
      '../imgs/mona-lisa-overdrive.jpg',
      import.meta.url
    ).toString(),
    isbn: 9780553281743,
    description: 'The third book in the Sprawl series, by William Gibson',
    type: 'Paperback',
  },
  androids: {
    authors: 'Philip K. Dick',
    pages: 210,
    releaseDate: 1969,
    language: 'en',
    title: 'Do Androids Dream of Electric Sheep',
    cover: new URL('../imgs/androids.jpg', import.meta.url).toString(),
    isbn: 9780451038005,
    description:
      'A blade runner is an agent tasked with finding and retiring replicants',
    type: 'E-book',
  },
  fellowship: {
    authors: 'J.R.R. Tolkien',
    pages: 407,
    releaseDate: 2022,
    language: 'en',
    title: 'The Fellowship of the Ring (Lord of the Rings Vol.1)',
    cover: new URL('../imgs/fellowship.jpg', import.meta.url).toString(),
    isbn: 9780008567125,
    description:
      'In a sleepy village in the Shire, a young hobbit is entrusted with an immense task. He must make a perilous journey across Middle-Earth to the Cracks of Doom, there to destroy the Ruling Ring of Power - the only thing that prevents the Dark Lords evil dominion',
    type: 'Hardcover',
  },
};

export async function testFetch(isbn) {
  Object.values(testBooks).forEach((book) => {
    if (book.isbn == isbn) {
      neededBook = book;
      console.log(book);
    }
  });

  if (!neededBook) {
    console.log('No test book found for this ISBN:', isbn);
    return null;
  }
  const volumeInfo = neededBook;
  console.log('testBook (param):', testBooks);
  console.log('neededBook DEZEEEEE:', volumeInfo);

  const book = {
    // WHENEVER YOU ADD NEW DATA TO TEST BOOKS ALWAYS TEST HERE
    authors: volumeInfo.authors ? volumeInfo.authors : 'Unknown',
    pages: volumeInfo.pages > 0 ? volumeInfo.pages : 'Unknown',
    releaseDate: volumeInfo.releaseDate ? volumeInfo.releaseDate : 'Unknown',
    language: volumeInfo.language ? volumeInfo.language : 'Unknown',
    title: volumeInfo.title ? volumeInfo.title : 'Unknown',
    cover:
      volumeInfo.cover ||
      new URL('../imgs/no-cover.png', import.meta.url).toString(),
    isbn: volumeInfo.isbn ? volumeInfo.isbn : 'Unknown',
    description: volumeInfo.description ? volumeInfo.description : 'Unknown',
    type: volumeInfo.type ? volumeInfo.type : 'Unknown',
  };
  currentBook = book;
  console.log('book:', book);
  console.log('currentBook:', currentBook);
  return book, currentBook;
}
