"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";

export default function MyBooks() {
  const router = useRouter();
  const [myBooks, setMyBooks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Obtener los libros del localStorage
  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("myBooks") || "[]");
    setMyBooks(storedBooks);
  }, []);

  // Filtrar los libros por título basándonos en la búsqueda
  const filteredBooks = myBooks.filter(book => 
    book.volumeInfo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Volver a la página de inicio
  const handleBackToHome = () => {
    router.push("/"); // Vuelve a la página principal
  };

  return (
    <div className="relative min-h-screen bg-white text-black">
      <div className="p-6">
        <header className="flex justify-between items-center pb-4">
          <button 
            onClick={handleBackToHome}
            className="text-lg font-semibold text-[#42af92] hover:text-[#9dccc0]"
          >
            Home
          </button>
        </header>

        <main className="flex-1 max-w-6xl mx-auto mt-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-[#4e6660]" style={{ fontFamily: "'Bebas Neue', cursive" }}>
            My Books
          </h2>
          
          {/* Buscador */}
          <SearchBar onSearch={setSearchQuery} />

          <section className="mt-4">
            <h3 className="text-xl font-semibold text-left text-[#4e6660]" style={{ fontFamily: "'Bebas Neue', cursive" }}>
              My Added Books
            </h3>
            <div className="grid grid-cols-4 gap-4 mt-4">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book, index) => (
                  <div key={index} className="p-4 bg-[#e8fff9] rounded-lg shadow text-center">
                    <h4 className="font-bold text-2xl text-[#4e6660]" style={{ fontFamily: "'Bebas Neue', cursive" }}>
                      {book.volumeInfo.title}
                    </h4>
                    <p className="text-sm text-black">{book.volumeInfo.description || "No description available"}</p>
                  </div>
                ))
              ) : (
                <p>No books found.</p>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
