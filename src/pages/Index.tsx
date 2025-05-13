
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import BookGrid from "@/components/books/BookGrid";
import BookSearch from "@/components/books/BookSearch";
import { Book } from "@/types";
import { bookService } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { mockBooks } from "@/mocks/data"; // Import for development

const Index = () => {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [recentlyAdded, setRecentlyAdded] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        // In a real app, we'd make API calls to get different book categories
        // For now, we'll use our mock data and split it for different sections
        const response = await bookService.getAllBooks();
        
        if (response.success) {
          const books = response.data || mockBooks;
          setFeaturedBooks(books.slice(0, 3));
          setRecentlyAdded(books.slice(3));
        } else {
          // Fallback to mock data for development
          setFeaturedBooks(mockBooks.slice(0, 3));
          setRecentlyAdded(mockBooks.slice(3));
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        // Fallback to mock data for development
        setFeaturedBooks(mockBooks.slice(0, 3));
        setRecentlyAdded(mockBooks.slice(3));
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-library-navy text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Welcome to <span className="text-library-gold">LibraryHub</span>
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Your gateway to thousands of books, resources, and knowledge. 
            Browse our collection and start your reading journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg" 
              className="bg-library-gold text-library-navy hover:bg-library-cream"
            >
              <Link to="/books">Explore Books</Link>
            </Button>
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-library-navy"
            >
              <Link to="/register">Join Library</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16 bg-library-cream">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold mb-8 text-center">
            Featured Books
          </h2>
          {isLoading ? (
            <div className="text-center">Loading featured books...</div>
          ) : (
            <BookGrid books={featuredBooks} />
          )}
        </div>
      </section>

      {/* Recently Added */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold mb-8 text-center">
            Recently Added
          </h2>
          {isLoading ? (
            <div className="text-center">Loading recent books...</div>
          ) : (
            <>
              <BookSearch onSearch={() => {}} />
              <BookGrid books={recentlyAdded} />
              <div className="text-center mt-8">
                <Button 
                  asChild
                  variant="outline"
                  className="border-library-navy text-library-navy hover:bg-library-navy hover:text-white"
                >
                  <Link to="/books">View All Books</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Library Services */}
      <section className="py-16 bg-library-lightBlue">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold mb-12 text-center">
            Our Library Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-library-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-bold mb-2">Book Loans</h3>
              <p className="text-muted-foreground">
                Borrow from our vast collection of books across all genres and interests.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-library-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-bold mb-2">Book Search</h3>
              <p className="text-muted-foreground">
                Easily find books by title, author, genre, or any keyword.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-library-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-bold mb-2">User Accounts</h3>
              <p className="text-muted-foreground">
                Manage your loans, save favorites, and get personalized recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
