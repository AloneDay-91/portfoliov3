import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

type Status = "online" | "offline";

interface SiteHistory {
  url: string;
  name: string;
  history: Status[];
  lastChecked: string;
}

const HISTORY_LENGTH = 60;
const API_URL = import.meta.env.VITE_API_URL;

export default function SiteStatusCheckerPage() {
  const [histories, setHistories] = useState<SiteHistory[]>([]);
  const [loading, setLoading] = useState(true);

  // Fonction pour charger l'historique depuis le backend
  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      // data est un objet {url: {name, history, lastChecked}, ...}
      setHistories(
        Object.entries(data).map(([url, h]: [string, unknown]) => {
          const obj = h as {
            name?: string;
            history?: Status[];
            lastChecked?: string;
          };
          return {
            url,
            name: obj?.name ?? url,
            history: Array.isArray(obj?.history) ? obj.history : [],
            lastChecked: obj?.lastChecked ?? "",
          };
        })
      );
    } catch {
      setHistories([]);
    }
    setLoading(false);
  };

  // Charger l'historique au montage et toutes les 30s
  useEffect(() => {
    fetchHistory();
    const interval = setInterval(fetchHistory, 30000);
    return () => clearInterval(interval);
  }, []);

  // Calcul du résumé global
  const allOperational = histories.every(
    (h) =>
      Array.isArray(h.history) &&
      (h.history.length === 0 || h.history[h.history.length - 1] === "online")
  );

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <div className="border-grid flex flex-1 flex-col items-center">
        <div className="border-grid w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <section className="relative max-w-screen-2xl mx-auto border-l border-r w-full py-12 px-12 gap-8 min-h-screen">
            <div className="absolute inset-0 -z-10 h-auto min-h-full w-full dark:bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:14px_24px]" />
            <div className="flex flex-col items-center justify-center gap-8">
              <div className="flex flex-col gap-2 w-full max-w-3xl">
                <div className="flex flex-row justify-between items-center">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold">
                      Status des sites
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Afficher l'état opérationnel actuel de tous les systèmes
                    </p>
                  </div>
                  <div
                    className={`font-semibold text-lg ${
                      allOperational ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {allOperational
                      ? "Tous les systèmes sont opérationnels"
                      : "Incident détecté"}
                  </div>
                </div>
                <div className="grid gap-6 w-full mt-4">
                  {loading ? (
                    <div className="text-center text-gray-500">
                      Chargement...
                    </div>
                  ) : histories.length === 0 ? (
                    <div className="text-gray-500 text-center">
                      Aucun site à surveiller.
                    </div>
                  ) : (
                    histories.map((h) => {
                      const upCount = h.history.filter(
                        (s) => s === "online"
                      ).length;
                      const percent =
                        h.history.length > 0
                          ? (upCount / h.history.length) * 100
                          : 100;
                      return (
                        <Card
                          key={h.url}
                          className="bg-background p-6 rounded-xl border border-neutral-800"
                        >
                          <div className="flex flex-row justify-between items-center mb-2">
                            <div className="font-semibold text-lg">
                              {h.name}
                            </div>
                            <div className="font-mono text-green-400 text-2xl">
                              {percent.toFixed(1)}%
                            </div>
                          </div>
                          <div className="flex flex-row gap-1 items-center mb-2">
                            {Array.from({ length: HISTORY_LENGTH }).map(
                              (_, i) => {
                                const status =
                                  h.history[
                                    h.history.length - HISTORY_LENGTH + i
                                  ];
                                return (
                                  <div
                                    key={i}
                                    className={`w-2 h-8 rounded-sm ${
                                      status === "offline"
                                        ? "bg-red-500"
                                        : status === "online"
                                        ? "bg-green-400"
                                        : "bg-neutral-700"
                                    }`}
                                  />
                                );
                              }
                            )}
                          </div>
                          <div className="flex flex-row justify-between items-center text-xs text-muted-foreground">
                            <span>Mise à jour : {h.lastChecked || "-"}</span>
                          </div>
                        </Card>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
