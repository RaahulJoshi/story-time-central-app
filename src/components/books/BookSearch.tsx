
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface BookSearchProps {
  onSearch: (query: string) => void;
}

const BookSearch = ({ onSearch }: BookSearchProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-lg gap-2 mb-6 mx-auto"
    >
      <Input
        type="text"
        placeholder="Search by title, author, or genre..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow"
      />
      <Button 
        type="submit"
        className="bg-library-navy hover:bg-library-darkNavy"
      >
        Search
      </Button>
    </form>
  );
};

export default BookSearch;
