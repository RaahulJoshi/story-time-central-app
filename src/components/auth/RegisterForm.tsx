
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/services/api";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { username, email, password, confirmPassword } = formData;
    
    // Basic validation
    if (!username.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await authService.register({
        username,
        email,
        password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      
      if (response.success && response.data) {
        toast.success("Registration successful");
        
        // Auto login after successful registration
        const loginResponse = await authService.login({ username, password });
        if (loginResponse.success && loginResponse.data) {
          login(loginResponse.data.token, loginResponse.data.user);
          navigate("/dashboard");
        } else {
          navigate("/login");
        }
      }
    } catch (error) {
      toast.error("Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // For demo purposes - mock registration
  const handleDemoRegister = () => {
    // This would be removed in production with real backend
    login("mock-token-123", {
      id: 1,
      username: "new_user",
      email: "new@example.com",
      role: "USER",
      firstName: "New",
      lastName: "User"
    });
    toast.success("Demo registration successful");
    navigate("/dashboard");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="font-serif text-2xl text-center">Create an Account</CardTitle>
        <CardDescription className="text-center">
          Join LibraryHub to borrow books and more
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="username">Username *</Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              disabled={isLoading}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              disabled={isLoading}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              disabled={isLoading}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password *</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              disabled={isLoading}
              required
            />
          </div>
          
          <Button
            type="submit"
            className="w-full bg-library-navy hover:bg-library-darkNavy"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
          
          {/* This would be removed in production with real backend */}
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleDemoRegister}
          >
            Demo Register (For Testing)
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-library-navy hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
