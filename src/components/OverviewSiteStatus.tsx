import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { apiFetch, apiService } from "@/services/apiService";

// Types
export type Status = "online" | "offline";
export interface SiteHistory {
  _id?: string;
  url: string;
  name: string;
  history: Status[];
  lastChecked: string;
}

export default function OverviewSiteStatus() {
  const [sites, setSites] = useState<SiteHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [editSite, setEditSite] = useState<SiteHistory | null>(null);
  const [form, setForm] = useState({ name: "", url: "" });
  const [actionLoading, setActionLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<SiteHistory | null>(null);

  // Charger la liste des sites
  const fetchSites = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch(apiService.getSiteStatus());
      // data = { url: { name, history, lastChecked }, ... }
      setSites(
        Object.entries(data).map(([url, h]) => {
          const site = h as Partial<SiteHistory>;
          return {
            _id: site._id,
            url,
            name: site.name ?? url,
            history: Array.isArray(site.history) ? site.history : [],
            lastChecked: site.lastChecked ?? "",
          };
        })
      );
    } catch {
      setError("Erreur lors du chargement des sites");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSites();
  }, []);

  // Ajout/édition
  const handleOpenDialog = (site?: SiteHistory) => {
    setEditSite(site || null);
    setForm(site ? { name: site.name, url: site.url } : { name: "", url: "" });
    setShowDialog(true);
  };
  const handleCloseDialog = () => {
    setShowDialog(false);
    setEditSite(null);
    setForm({ name: "", url: "" });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const method = editSite ? "PUT" : "POST";
      const url = editSite
        ? apiService.editSite(editSite.url)
        : apiService.addSite();
      let body: Record<string, string> = form;
      if (editSite) {
        // Si l'URL a changé, on envoie newUrl
        if (form.url !== editSite.url) {
          body = { name: form.name, newUrl: form.url };
        } else {
          body = { name: form.name };
        }
      }
      await apiFetch(url, {
        method,
        body: JSON.stringify(body),
      });
      await fetchSites();
      handleCloseDialog();
      toast.success(
        editSite ? "Le site a bien été modifié." : "Le site a bien été ajouté."
      );
    } catch (err: unknown) {
      const error = err as Error;
      setError("Erreur lors de l'enregistrement");
      toast.error(error?.message || "Erreur lors de l'enregistrement");
    }
    setActionLoading(false);
  };

  // Suppression
  const handleDelete = async (site: SiteHistory) => {
    setActionLoading(true);
    try {
      await apiFetch(apiService.deleteSite(site.url), {
        method: "DELETE",
      });
      await fetchSites();
      toast.success("Le site a bien été supprimé.");
    } catch {
      setError("Erreur lors de la suppression");
      toast.error("Erreur lors de la suppression");
    }
    setActionLoading(false);
    setConfirmDelete(null);
  };

  // Vérification manuelle
  const handleCheck = async (site: SiteHistory) => {
    setActionLoading(true);
    try {
      await apiFetch(apiService.checkSiteStatus(site.url), {
        method: "POST",
      });
      await fetchSites();
    } catch {
      setError("Erreur lors de la vérification");
    }
    setActionLoading(false);
  };

  return (
    <Card className="w-full">
      <div className="flex flex-col gap-2 md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-xl font-normal">Statut des sites</h2>
        <Button
          className="w-full sm:w-auto"
          variant="default"
          size="sm"
          onClick={() => handleOpenDialog()}
        >
          Ajouter un site
        </Button>
      </div>
      {loading ? (
        <div>Chargement...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : sites.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          Aucun site à surveiller.
        </div>
      ) : (
        <div>
          {/* Table sur desktop, cards sur mobile */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">Nom</th>
                  <th className="py-2 px-4 text-left">URL</th>
                  <th className="py-2 px-4 text-left">Statut</th>
                  <th className="py-2 px-4 text-left">Dernier check</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sites.map((site) => {
                  const lastStatus = site.history[site.history.length - 1];
                  return (
                    <tr key={site.url} className="border-b hover:bg-accent/30">
                      <td className="py-2 px-4 font-medium">{site.name}</td>
                      <td className="py-2 px-4">
                        <a
                          href={site.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline break-all"
                        >
                          {site.url}
                        </a>
                      </td>
                      <td className="py-2 px-4">
                        <span
                          className={`font-bold ${
                            lastStatus === "online"
                              ? "text-green-500"
                              : lastStatus === "offline"
                              ? "text-red-500"
                              : "text-gray-400"
                          }`}
                        >
                          {lastStatus === "online"
                            ? "En ligne"
                            : lastStatus === "offline"
                            ? "Hors ligne"
                            : "-"}
                        </span>
                      </td>
                      <td className="py-2 px-4">
                        {site.lastChecked
                          ? new Date(site.lastChecked).toLocaleString("fr-FR")
                          : "-"}
                      </td>
                      <td className="py-2 px-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              aria-label="Actions"
                            >
                              <DotsVerticalIcon className="w-5 h-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleCheck(site)}
                              disabled={actionLoading}
                            >
                              Vérifier
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleOpenDialog(site)}
                              disabled={actionLoading}
                            >
                              Éditer
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setConfirmDelete(site)}
                              disabled={actionLoading}
                              className="text-red-600 focus:text-red-600"
                            >
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Cards sur mobile */}
          <div className="flex flex-col gap-4 md:hidden">
            {sites.map((site) => {
              const lastStatus = site.history[site.history.length - 1];
              return (
                <div
                  key={site.url}
                  className="rounded-xl border bg-background p-4 flex flex-col gap-2 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-base">{site.name}</div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          aria-label="Actions"
                        >
                          <DotsVerticalIcon className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleCheck(site)}
                          disabled={actionLoading}
                        >
                          Vérifier
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleOpenDialog(site)}
                          disabled={actionLoading}
                        >
                          Éditer
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setConfirmDelete(site)}
                          disabled={actionLoading}
                          className="text-red-600 focus:text-red-600"
                        >
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline text-xs break-all"
                  >
                    {site.url}
                  </a>
                  <div className="flex items-center gap-2 text-sm">
                    <span
                      className={`font-bold ${
                        lastStatus === "online"
                          ? "text-green-500"
                          : lastStatus === "offline"
                          ? "text-red-500"
                          : "text-gray-400"
                      }`}
                    >
                      {lastStatus === "online"
                        ? "En ligne"
                        : lastStatus === "offline"
                        ? "Hors ligne"
                        : "-"}
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {site.lastChecked
                        ? new Date(site.lastChecked).toLocaleString("fr-FR")
                        : "-"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogTitle>
            {editSite ? "Éditer le site" : "Ajouter un site"}
          </DialogTitle>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
            <Input
              name="name"
              placeholder="Nom du site"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              name="url"
              placeholder="URL (https://...)"
              value={form.url}
              onChange={handleChange}
              required
              pattern="https?://.+"
            />
            <div className="flex gap-2 justify-end">
              <Button type="submit" disabled={actionLoading}>
                {editSite ? "Enregistrer" : "Ajouter"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
                disabled={actionLoading}
              >
                Annuler
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {/* Dialog de confirmation de suppression */}
      <Dialog
        open={!!confirmDelete}
        onOpenChange={(open) => !open && setConfirmDelete(null)}
      >
        <DialogContent>
          <DialogTitle>Supprimer le site</DialogTitle>
          <div className="py-2">
            Voulez-vous vraiment supprimer le site{" "}
            <span className="font-semibold">{confirmDelete?.name}</span> ? Cette
            action est irréversible.
          </div>
          <div className="flex gap-2 justify-end mt-4">
            <Button
              variant="outline"
              onClick={() => setConfirmDelete(null)}
              disabled={actionLoading}
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={() => confirmDelete && handleDelete(confirmDelete)}
              disabled={actionLoading}
            >
              Supprimer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
