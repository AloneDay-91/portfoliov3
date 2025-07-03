import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      if (!location.state?.fromLogout) {
        toast.info("Vous devez être connecté pour accéder à cette page.");
      }
      navigate("/login");
    }
  }, [user, loading, navigate, location.state]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span>Chargement...</span>
      </div>
    );
  }

  return <>{children}</>;
}
