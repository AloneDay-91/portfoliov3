import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [message, setMessage] = useState("");
  const [registerEnabled, setRegisterEnabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/config`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.registerEnabled) {
          setRegisterEnabled(false);
          setTimeout(() => navigate("/login"), 2000);
        }
      })
      .catch(() => setRegisterEnabled(true));
  }, [navigate]);

  if (!registerEnabled) {
    return (
      <div className="text-center mt-12 text-lg text-red-600">
        L'inscription est désactivée.
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    console.log("Form envoyé:", form);
    const API_URL = import.meta.env.VITE_API_URL;
    const res = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    let data;
    try {
      data = await res.json();
    } catch {
      data = { error: "Réponse du serveur invalide" };
    }
    if (res.ok) setMessage("Inscription réussie !");
    else setMessage(data.error || "Erreur");
  };

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
                    <h2 className="text-xl font-bold">Inscription</h2>
                    <Input
                      name="name"
                      placeholder="Nom"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="input"
                    />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="input"
                    />
                    <Input
                      name="password"
                      type="password"
                      placeholder="Mot de passe"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className="input"
                    />
                    <Button type="submit" className="btn">
                      S'inscrire
                    </Button>
                    {message && <div className="text-center">{message}</div>}
                  </form>
                  <div className="flex items-center justify-start ml-10 mt-6 gap-2">
                    <Link to="/login" className="py-2">
                      <span className="text-sm text-muted-foreground flex flex-row gap-2">
                        Vous avez un compte ?
                        <span>
                          <span className="text-primary hover:underline">
                            Se connecter
                          </span>
                        </span>
                      </span>
                    </Link>
                  </div>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
