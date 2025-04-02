"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import BookList from "@/components/BookList";

export default function MyBooks() {
  const [myBooks, setMyBooks] = useState([]);

  // Cargar libros guardados en el localStorage cuando el componente se monta
  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem("myBooks") || "[]");
    setMyBooks(savedBooks);
  }, []);

  const removeBook = (bookId: string) => {
    const updatedBooks = myBooks.filter((book: any) => book.id !== bookId);
    setMyBooks(updatedBooks);
    localStorage.setItem("myBooks", JSON.stringify(updatedBooks));
  };

  return (
    <section className="relative min-h-screen bg-white text-black">
      <section className="p-6">
        <header className="flex justify-between items-center pb-4">
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/">
                  <a className="hover:underline">Home</a>
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="flex-1 max-w-6xl mx-auto mt-8">
          <h2 className="text-6xl font-bold text-center mb-4 text-[#4e6660]" style={{ fontFamily: "'Bebas Neue', cursive" }}>
            My Books
          </h2>

          <section className="w-full mt-4">
            <h3 className="text-xl font-semibold text-left text-[#4e6660]" style={{ fontFamily: "'Bebas Neue', cursive" }}>My Saved Books</h3>
            {myBooks.length > 0 ? (
              <BookList books={myBooks} removeFromMyBooks={removeBook} />
            ) : (
              <p>No books added yet.</p>
            )}
          </section>
        </main>
      </section>
    </section>
  );
}
