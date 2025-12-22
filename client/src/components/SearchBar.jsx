import { Search, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const SearchBar = ({ initialQuery = "", onClear }) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const navigate = useNavigate();

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    // Clear the search query from URL but stay on search page
    if (onClear) {
      onClear();
    }
  };

  return (
    <form onSubmit={searchHandler} className="w-full">
      <div className="relative flex items-center max-w-2xl mx-auto">
        <div className="absolute left-4 text-gray-400">
          <Search className="h-5 w-5" />
        </div>

        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for courses, categories, or instructors..."
          className="w-full pl-12 pr-24 py-6 text-base border-2 border-gray-200 dark:border-gray-700 rounded-full focus:border-violet-600 dark:focus:border-violet-400 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all"
        />

        {searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-24 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        <Button
          type="submit"
          disabled={!searchQuery.trim()}
          className="absolute right-2 bg-violet-600 hover:bg-violet-700 text-white rounded-full px-6 h-10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Search
        </Button>
      </div>

      {searchQuery.length === 0 && (
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Popular searches:{" "}
            <button
              type="button"
              onClick={() => setSearchQuery("React")}
              className="text-violet-600 hover:underline mx-1"
            >
              React
            </button>
            •
            <button
              type="button"
              onClick={() => setSearchQuery("JavaScript")}
              className="text-violet-600 hover:underline mx-1"
            >
              JavaScript
            </button>
            •
            <button
              type="button"
              onClick={() => setSearchQuery("Python")}
              className="text-violet-600 hover:underline mx-1"
            >
              Python
            </button>
          </p>
        </div>
      )}
    </form>
  );
};

export default SearchBar;