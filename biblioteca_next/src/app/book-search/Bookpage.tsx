"use client";
import { useState } from "react";
import { useBooks } from "../../Hooks/useBooks";

export default function BookSearchPage() {
  const [query, setQuery] = useState("");
  const { data: books, isLoading } = useBooks(query);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Book Search</h1>
      <input
        type="text"
        placeholder="Search for a book..."
        className="w-full p-2 border rounded-md mt-4"
        onChange={(e) => setQuery(e.target.value)}
      />
      {isLoading && <p>Loading...</p>}
      <ul className="mt-4 space-y-3">
        {books?.map((book: any) => (
          <li key={book.id} className="p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold">{book.volumeInfo.title}</h3>
            <p className="text-sm text-gray-600">{book.volumeInfo.authors?.join(", ")}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
