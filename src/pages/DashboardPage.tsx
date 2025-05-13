
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import LoansList from "@/components/loans/LoansList";
import { Loan } from "@/types";
import { loanService } from "@/services/api";
import { mockLoans } from "@/mocks/data"; // Import for development
import { useAuth } from "@/contexts/AuthContext";

const DashboardPage = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchLoans = async () => {
      setIsLoading(true);
      try {
        const response = await loanService.getUserLoans();
        
        if (response.success && response.data) {
          setLoans(response.data);
        } else {
          // Fallback to mock data for development
          setLoans(mockLoans);
        }
      } catch (error) {
        console.error("Error fetching loans:", error);
        // Fallback to mock data for development
        setLoans(mockLoans);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchLoans();
    }
  }, [isAuthenticated]);

  const handleBookReturn = async () => {
    // Refresh the loans list
    try {
      const response = await loanService.getUserLoans();
      
      if (response.success && response.data) {
        setLoans(response.data);
      }
    } catch (error) {
      console.error("Error refreshing loans:", error);
    }
  };

  if (!isAuthenticated) {
    return null; // Redirect handled by useEffect
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="font-serif text-3xl font-bold mb-2">
          {user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'My' : 'My'} Dashboard
        </h1>
        <p className="text-muted-foreground mb-8">
          Manage your borrowed books and library account
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl font-semibold mb-4">Your Books</h2>
            {isLoading ? (
              <div className="text-center py-8">Loading your loans...</div>
            ) : (
              <LoansList loans={loans} onReturnBook={handleBookReturn} />
            )}
          </div>

          <div className="bg-library-lightBlue rounded-lg p-6">
            <h2 className="font-serif text-2xl font-semibold mb-4">Account Summary</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Username</p>
                <p className="font-medium">{user?.username || 'User'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user?.email || 'email@example.com'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Loans</p>
                <p className="font-medium">
                  {loans.filter(loan => loan.status !== 'RETURNED').length}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overdue Items</p>
                <p className="font-medium">
                  {loans.filter(loan => loan.status === 'OVERDUE').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
