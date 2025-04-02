import { useState } from "react";

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: { thumbnail?: string };
    description?: string;
  };
}
interface BookListPropsDel {
  books: Array<any>;
  removeFromMyBooks: (bookId: string) => void;
}
interface BookListProps {
  books: Book[];
  addToMyBooks: (book: Book) => void;
}

export default function BookList({ books, addToMyBooks }: BookListProps, ) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <>
      <ul className="mt-4 space-y-4">
        {books.length === 0 ? (
          <p className="text-black">No books found.</p>
        ) : (
          books.map((book) => (
            <li
              key={book.id}
              className="flex items-center gap-4 p-4 bg-[#e8fff9] rounded-lg justify-between"
            >
              <div className="flex items-center gap-4">
                {book.volumeInfo.imageLinks?.thumbnail && (
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                    className="w-16 h-24 object-cover rounded-md"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-black">{book.volumeInfo.title}</h3>
                  <p className="text-sm text-black">
                    {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedBook(book)}
                  className="p-2 bg-[#42af92] text-white rounded-lg hover:bg-[#9dccc0]"
                >
                  👁
                </button>
                <button
                  onClick={() => addToMyBooks(book)}
                  className="p-2 bg-[#42af92] text-white rounded-lg hover:bg-[#9dccc0]"
                >
                  Add
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      {selectedBook && (
        <div className="fixed inset-0 bg-whithe bg-opacity-10 flex justify-center items-center backdrop-blur-md">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[60%] flex gap-4">
            <div className="flex-shrink-0">
              {selectedBook.volumeInfo.imageLinks?.thumbnail && (
                <img
                  src={selectedBook.volumeInfo.imageLinks.thumbnail}
                  alt={selectedBook.volumeInfo.title}
                  className="w-32 h-48 object-cover rounded-md"
                />
              )}
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-bold mb-2">{selectedBook.volumeInfo.title}</h2>
              <p className="text-gray-700 mb-2">
                {selectedBook.volumeInfo.authors?.join(", ") || "Unknown Author"}
              </p>
              <p className="text-sm">{selectedBook.volumeInfo.description || "No description available."}</p>
              <button
                onClick={() => setSelectedBook(null)}
                className="mt-4 p-2 bg-[#42af92] text-white rounded-lg hover:bg-[#9dccc0]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
