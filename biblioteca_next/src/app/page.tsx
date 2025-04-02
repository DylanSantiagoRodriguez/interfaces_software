"use client";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import BookList from "@/components/BookList";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const searchBooks = async (query: string) => {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    setBooks(data.items || []);
  };

  const fetchBooksByCategory = async (category: string) => {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(category)}`
    );
    const data = await res.json();
    setBooks(data.items || []);
    setSelectedCategory(category);
  };

  return (
    <div className="relative min-h-screen bg-white text-black">
      <div className="p-6">
        <header className="flex justify-between items-center pb-4">
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">My Books</a></li>
            </ul>
          </nav>
        </header>

        <main className="flex-1 max-w-6xl mx-auto mt-8">
          <h2 className="text-6xl font-bold text-center mb-4 text-[#4e6660]" style={{ fontFamily: "'Bebas Neue', cursive" }}>   Verso y Prosa</h2>
          <SearchBar onSearch={searchBooks} />

          <section className="w-full mt-4">
            <h3 className="text-xl font-semibold text-left text-[#4e6660]" style={{ fontFamily: "'Bebas Neue', cursive" }}>Categories:</h3>
            <div className="grid grid-cols-4 gap-4 mt-4">
              {[
                { title: "Action", desc: "Thrilling adventures and high-stakes stories" },
                { title: "Adventure", desc: "Journey to new worlds and exciting places" },
                { title: "Romance", desc: "Love stories that touch the heart" },
                { title: "Fiction", desc: "Imaginative stories beyond reality" }
              ].map((category, index) => (
                <div key={index} className="p-4 bg-[#e8fff9] rounded-lg shadow text-center">
                  <h4
                    className="font-bold text-2xl text-[#4e6660]"
                    style={{ fontFamily: "'Bebas Neue', cursive" }}
                  >
                    {category.title}
                  </h4>
                  <p className="text-sm text-black">{category.desc}</p>
                  <button
                    onClick={() => fetchBooksByCategory(category.title)}
                    className="mt-4 p-2 bg-[#42af92] text-white rounded-lg hover:bg-[#9dccc0]"
                  >
                    Ver Populares
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 w-full">
            <h3 className="text-xl font-semibold text-left" style={{ fontFamily: "'Bebas Neue', cursive" }}>
              {selectedCategory ? `Popular ${selectedCategory} Books` : "Search Results"}
            </h3>
            <BookList books={books} addToMyBooks={(book) => console.log("Added to My Books:", book)} />
          </section>
        </main>
      </div>
      <div className="min-h-screen bg-white">
        <Chatbot />
      </div>
    </div>
  );
}
