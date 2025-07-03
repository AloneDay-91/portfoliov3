import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { EyeOff, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function Login() {
  const { login, user, loading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const success = await login(form.email, form.password);
    if (success) {
      setMessage("Connexion réussie !");
      toast.success("Connexion réussie !");
      navigate("/dashboard");
    } else {
      setMessage("Email ou mot de passe incorrect");
      toast.error("Email ou mot de passe incorrect");
    }
  };

  useEffect(() => {
    if (!loading && user) navigate("/dashboard");
  }, [user, loading, navigate]);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <div>
        <div className="border-grid flex flex-1 flex-col items-center">
          <div className="border-grid w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <section className="relative max-w-screen-2xl mx-auto border-l border-r w-full py-12 px-12 gap-8 min-h-screen">
              <div className="absolute inset-0 -z-10 h-auto min-h-full w-full dark:bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:14px_24px]"></div>
              <div className="flex flex-col items-center justify-center gap-8">
                <Card
                  variant="dots"
                  className="flex flex-col gap-2 bg-background max-w-xl mx-auto"
                >
                  <form
                    onSubmit={handleSubmit}
                    className="max-w-sm mx-auto flex flex-col gap-4"
                  >
                    <h2 className="text-xl font-bold">Connexion</h2>
                    {message && (
                      <Alert variant="destructive">
                        <AlertDescription>{message}</AlertDescription>
                      </Alert>
                    )}
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="input"
                    />

                    <div className="flex items-center justify-start gap-2 w-full">
                      <div className="relative w-full">
                        <Input
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Mot de passe"
                          value={form.password}
                          onChange={handleChange}
                          required
                          className="input"
                        />
                        <Button
                          size="icon"
                          variant="secondary"
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground rounded-tl-none rounded-bl-none"
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </Button>
                      </div>
                    </div>

                    <Button type="submit" className="btn">
                      Se connecter
                    </Button>
                  </form>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
