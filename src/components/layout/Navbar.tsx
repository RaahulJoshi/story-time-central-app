
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { UserRound, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-library-navy shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-library-gold font-serif text-2xl font-bold">
            LibraryHub
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-white hover:text-library-gold transition-colors"
          >
            Home
          </Link>
          <Link
            to="/books"
            className="text-white hover:text-library-gold transition-colors"
          >
            Books
          </Link>
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="text-white hover:text-library-gold transition-colors"
            >
              Dashboard
            </Link>
          ) : null}
          {isAuthenticated && user?.role !== "USER" ? (
            <Link
              to="/admin"
              className="text-white hover:text-library-gold transition-colors"
            >
              Admin Panel
            </Link>
          ) : null}
        </nav>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link 
                to="/profile" 
                className="flex items-center text-white hover:text-library-gold transition-colors"
              >
                <UserRound className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">{user?.username}</span>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={logout}
                className="border-library-gold text-library-gold hover:bg-library-gold hover:text-library-navy"
              >
                <LogOut className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                asChild
                className="border-library-gold text-library-gold hover:bg-library-gold hover:text-library-navy"
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button 
                size="sm" 
                asChild
                className="bg-library-gold text-library-navy hover:bg-library-cream hover:text-library-navy"
              >
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
