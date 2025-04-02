"use client";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <section className="flex items-center gap-2 p-4  rounded-lg">
      <input
        type="text"
        placeholder="Search for books..."
        className="flex-1 p-2  bg-gray-100 rounded-md text-black "
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="p-2 bg-[#42af92] text-white rounded-md"
        onClick={handleSearch}
      >
        Search
      </button>
    </section>
  );
}
