
import Layout from "@/components/layout/Layout";
import LoginForm from "@/components/auth/LoginForm";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <LoginForm />
      </div>
    </Layout>
  );
};

export default LoginPage;
