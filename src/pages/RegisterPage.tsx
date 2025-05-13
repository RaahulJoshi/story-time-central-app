
import Layout from "@/components/layout/Layout";
import RegisterForm from "@/components/auth/RegisterForm";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
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
        <RegisterForm />
      </div>
    </Layout>
  );
};

export default RegisterPage;
