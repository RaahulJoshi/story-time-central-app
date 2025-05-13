
import { Book } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { loanService } from "@/services/api";

interface BookCardProps {
  book: Book;
  onBorrow?: () => void;
}

const BookCard = ({ book, onBorrow }: BookCardProps) => {
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
    <Card className="book-card overflow-hidden h-full flex flex-col">
      <div className="relative pt-[120%]">
        <img
          src={book.coverImage}
          alt={`${book.title} cover`}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <CardContent className="p-4 flex-grow">
        <h3 className="font-serif font-bold text-lg mb-1 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-xs px-2 py-1 bg-accent text-accent-foreground rounded-full">
            {book.genre}
          </span>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
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
        <p className="text-sm line-clamp-3">{book.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          asChild
        >
          <Link to={`/books/${book.id}`}>Details</Link>
        </Button>
        <Button
          size="sm"
          className="flex-1 bg-library-gold text-library-navy hover:bg-library-cream"
          disabled={!isAuthenticated || book.available <= 0}
          onClick={handleBorrow}
        >
          Borrow
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
