"use client";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import BookList from "@/components/BookList";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  const [books, setBooks] = useState([]);

  const searchBooks = async (query: string) => {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    setBooks(data.items || []);
  };
  
  return (
    <div className="relative min-h-screen bg-white text-black"> {/* Añadido relative aquí */}
      <div className="p-6"> {/* Contenedor de padding separado */}
        <header className="flex justify-between items-center pb-4 border-b">
          <h1 className="text-2xl font-bold">Verso y Prosa</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">My Books</a></li>
              <li><a href="#" className="hover:underline">Collections</a></li>
            </ul>
          </nav>
        </header>
        
        <main className="flex-1 max-w-6xl mx-auto mt-8"> {/* Contenedor principal ajustado */}
          <h2 className="text-3xl font-bold text-center mb-4">Find your next adventure</h2>
          <SearchBar onSearch={searchBooks} />
          
          <section className="w-full mt-4">
            <h3 className="text-xl font-semibold text-center">Categories</h3>
            <div className="grid grid-cols-4 gap-4 mt-4">
              {[
                { title: "Action", desc: "Thrilling adventures and high-stakes stories" },
                { title: "Adventure", desc: "Journey to new worlds and exciting places" },
                { title: "Romance", desc: "Love stories that touch the heart" },
                { title: "Fiction", desc: "Imaginative stories beyond reality" }
              ].map((category, index) => (
                <div key={index} className="p-4 bg-[#e8fff9] rounded-lg shadow text-center">
                  <h4 className="font-bold">{category.title}</h4>
                  <p className="text-sm text-black">{category.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 w-full">
            <h3 className="text-xl font-semibold text-center">Popular This Week</h3>
            <BookList books={books} />
          </section>
        </main>
      </div>
      <div className="min-h-screen bg-white">
        {/* Todo tu contenido */}
        <Chatbot /> {/* Solo esto, sin divs adicionales */}
      </div>


    </div>
  );
}