
import { Book } from "@/types";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { loanService } from "@/services/api";

interface BookDetailProps {
  book: Book;
  onBorrow?: () => void;
}

const BookDetail = ({ book, onBorrow }: BookDetailProps) => {
  const { isAuthenticated } = useAuth();

  const handleBorrow = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to borrow books");
      return;
    }

    if (book.available <= 0) {
      toast.error("This book is currently unavailable");
      return;
    }

    try {
      const response = await loanService.borrowBook(book.id);
      if (response.success) {
        toast.success(`You've successfully borrowed "${book.title}"`);
        if (onBorrow) onBorrow();
      }
    } catch (error) {
      toast.error("Failed to borrow book");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/3 lg:w-1/4">
        <img
          src={book.coverImage}
          alt={`${book.title} cover`}
          className="w-full rounded-lg shadow-lg object-cover max-h-[500px]"
        />
      </div>
      <div className="md:w-2/3 lg:w-3/4">
        <h1 className="font-serif text-3xl font-bold mb-2">{book.title}</h1>
        <p className="text-lg text-muted-foreground mb-4">by {book.author}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-sm px-3 py-1 bg-accent text-accent-foreground rounded-full">
            {book.genre}
          </span>
          <span className="text-sm px-3 py-1 bg-muted text-muted-foreground rounded-full">
            ISBN: {book.isbn}
          </span>
          <span className="text-sm px-3 py-1 bg-muted text-muted-foreground rounded-full">
            Published: {new Date(book.published).getFullYear()}
          </span>
          <span
            className={`text-sm px-3 py-1 rounded-full ${
              book.available > 0
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {book.available > 0
              ? `${book.available} Available`
              : "Unavailable"}
          </span>
        </div>

        <div className="prose max-w-none mb-8">
          <h3 className="font-serif text-xl font-medium mb-2">Description</h3>
          <p className="whitespace-pre-line">{book.description}</p>
        </div>

        <Button
          className="w-full md:w-auto bg-library-gold text-library-navy hover:bg-library-cream"
          size="lg"
          disabled={!isAuthenticated || book.available <= 0}
          onClick={handleBorrow}
        >
          {!isAuthenticated
            ? "Login to Borrow"
            : book.available <= 0
            ? "Currently Unavailable"
            : "Borrow this Book"}
        </Button>
      </div>
    </div>
  );
};

export default BookDetail;
