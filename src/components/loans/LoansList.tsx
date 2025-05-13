
import { Loan } from "@/types";
import LoanCard from "./LoanCard";

interface LoansListProps {
  loans: Loan[];
  onReturnBook?: () => void;
}

const LoansList = ({ loans, onReturnBook }: LoansListProps) => {
  // Group loans by status
  const activeLoans = loans.filter(loan => loan.status !== "RETURNED");
  const returnedLoans = loans.filter(loan => loan.status === "RETURNED");

  return (
    <div className="space-y-8">
      {activeLoans.length > 0 && (
        <div>
          <h3 className="font-serif text-xl font-medium mb-4">Active Loans</h3>
          <div className="space-y-4">
            {activeLoans.map(loan => (
              <LoanCard 
                key={loan.id} 
                loan={loan} 
                onReturn={onReturnBook} 
              />
            ))}
          </div>
        </div>
      )}
      
      {returnedLoans.length > 0 && (
        <div>
          <h3 className="font-serif text-xl font-medium mb-4">Return History</h3>
          <div className="space-y-4">
            {returnedLoans.map(loan => (
              <LoanCard 
                key={loan.id} 
                loan={loan} 
              />
            ))}
          </div>
        </div>
      )}
      
      {loans.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No books borrowed yet.</p>
        </div>
      )}
    </div>
  );
};

export default LoansList;
