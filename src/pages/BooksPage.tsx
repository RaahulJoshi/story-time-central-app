
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import BookGrid from "@/components/books/BookGrid";
import BookSearch from "@/components/books/BookSearch";
import { Book } from "@/types";
import { bookService } from "@/services/api";
import { mockBooks } from "@/mocks/data"; // Import for development

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const response = await bookService.getAllBooks();
        
        if (response.success && response.data) {
          setBooks(response.data);
          setFilteredBooks(response.data);
        } else {
          // Fallback to mock data for development
          setBooks(mockBooks);
          setFilteredBooks(mockBooks);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        // Fallback to mock data for development
        setBooks(mockBooks);
        setFilteredBooks(mockBooks);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setFilteredBooks(books);
      return;
    }

    setIsLoading(true);
    
    try {
      // In a real app, we'd call the search API endpoint
      // For development, we'll filter the books we already have
      const response = await bookService.searchBooks(query);
      
      if (response.success && response.data) {
        setFilteredBooks(response.data);
      } else {
        // Fallback to client-side filtering for development
        const lowercaseQuery = query.toLowerCase();
        const filtered = books.filter(
          book =>
            book.title.toLowerCase().includes(lowercaseQuery) ||
            book.author.toLowerCase().includes(lowercaseQuery) ||
            book.genre.toLowerCase().includes(lowercaseQuery)
        );
        setFilteredBooks(filtered);
      }
    } catch (error) {
      console.error("Error searching books:", error);
      
      // Fallback to client-side filtering for development
      const lowercaseQuery = query.toLowerCase();
      const filtered = books.filter(
        book =>
          book.title.toLowerCase().includes(lowercaseQuery) ||
          book.author.toLowerCase().includes(lowercaseQuery) ||
          book.genre.toLowerCase().includes(lowercaseQuery)
      );
      setFilteredBooks(filtered);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookBorrowed = async () => {
    // Refresh the book list to update availability
    try {
      const response = await bookService.getAllBooks();
      
      if (response.success && response.data) {
        setBooks(response.data);
        setFilteredBooks(response.data);
      }
    } catch (error) {
      console.error("Error refreshing books:", error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="font-serif text-3xl font-bold mb-8 text-center">
          Browse Our Book Collection
        </h1>
        
        <BookSearch onSearch={handleSearch} />
        
        {isLoading ? (
          <div className="text-center py-8">Loading books...</div>
        ) : filteredBooks.length > 0 ? (
          <BookGrid books={filteredBooks} onBorrowBook={handleBookBorrowed} />
        ) : (
          <div className="text-center py-8">
            <p>No books found matching your search.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BooksPage;
