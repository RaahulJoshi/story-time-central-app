
import { Book } from "@/types";
import BookCard from "./BookCard";

interface BookGridProps {
  books: Book[];
  onBorrowBook?: () => void;
}

const BookGrid = ({ books, onBorrowBook }: BookGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onBorrow={onBorrowBook} />
      ))}
    </div>
  );
};

export default BookGrid;
