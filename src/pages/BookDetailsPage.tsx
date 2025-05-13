
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import BookDetail from "@/components/books/BookDetail";
import { Book } from "@/types";
import { bookService } from "@/services/api";
import { mockBooks } from "@/mocks/data"; // Import for development

const BookDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) {
        setError("Book ID is required");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const bookId = parseInt(id);
        const response = await bookService.getBookById(bookId);
        
        if (response.success && response.data) {
          setBook(response.data);
        } else {
          // Fallback to mock data for development
          const mockBook = mockBooks.find(b => b.id === bookId);
          if (mockBook) {
            setBook(mockBook);
          } else {
            setError("Book not found");
          }
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
        setError("Failed to load book details");
        
        // Fallback to mock data for development
        const mockBook = mockBooks.find(b => b.id === parseInt(id));
        if (mockBook) {
          setBook(mockBook);
          setError(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleBookBorrowed = async () => {
    // Refresh the book details to update availability
    if (id) {
      try {
        const bookId = parseInt(id);
        const response = await bookService.getBookById(bookId);
        
        if (response.success && response.data) {
          setBook(response.data);
        }
      } catch (error) {
        console.error("Error refreshing book details:", error);
      }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {isLoading ? (
          <div className="text-center">Loading book details...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : book ? (
          <BookDetail book={book} onBorrow={handleBookBorrowed} />
        ) : (
          <div className="text-center text-red-500">Book not found</div>
        )}
      </div>
    </Layout>
  );
};

export default BookDetailsPage;
