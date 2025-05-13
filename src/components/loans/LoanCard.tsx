
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { loanService } from "@/services/api";
import { Loan } from "@/types";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface LoanCardProps {
  loan: Loan;
  onReturn?: () => void;
}

const LoanCard = ({ loan, onReturn }: LoanCardProps) => {
  const isReturned = loan.status === "RETURNED";
  const isOverdue = loan.status === "OVERDUE";

  const handleReturn = async () => {
    try {
      const response = await loanService.returnBook(loan.id);
      if (response.success) {
        toast.success(`You've successfully returned "${loan.book.title}"`);
        if (onReturn) onReturn();
      }
    } catch (error) {
      toast.error("Failed to return book");
    }
  };

  return (
    <Card className={`overflow-hidden ${isOverdue ? "border-red-500" : ""}`}>
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-1/4 max-w-[150px]">
          <img
            src={loan.book.coverImage}
            alt={`${loan.book.title} cover`}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-grow p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-serif font-bold text-lg mb-1">
                <Link 
                  to={`/books/${loan.book.id}`}
                  className="hover:text-library-navy hover:underline"
                >
                  {loan.book.title}
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {loan.book.author}
              </p>
            </div>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                isReturned
                  ? "bg-green-100 text-green-700"
                  : isOverdue
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {loan.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
            <div>
              <p className="text-xs text-muted-foreground">Borrowed on</p>
              <p className="text-sm">
                {format(new Date(loan.borrowDate), "MMMM d, yyyy")}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Due date</p>
              <p className="text-sm">
                {format(new Date(loan.dueDate), "MMMM d, yyyy")}
              </p>
            </div>
            {loan.returnDate && (
              <div>
                <p className="text-xs text-muted-foreground">Returned on</p>
                <p className="text-sm">
                  {format(new Date(loan.returnDate), "MMMM d, yyyy")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {!isReturned && (
        <CardFooter className="p-4 pt-0 flex justify-end">
          <Button
            onClick={handleReturn}
            className="bg-library-navy hover:bg-library-darkNavy"
          >
            Return Book
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default LoanCard;
