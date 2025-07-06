import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { apiService, apiFetch } from "@/services/apiService";
import { Skeleton } from "./ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { useId } from "react";

// Types
export type Resource = {
  _id?: string;
  nom: string;
  url: string;
  nb_components: string;
  image: string;
  category: string;
  active: boolean;
  order: number;
};

// Skeleton pour une ressource
function ResourceSkeleton() {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg animate-pulse gap-3">
      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-12 rounded-lg" />
        <div>
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <Skeleton className="h-6 w-16 rounded" />
    </div>
  );
}

export default function OverviewResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [form, setForm] = useState({
    nom: "",
    url: "",
    nb_components: "1",
    image: "",
    category: "",
    active: true,
  });
  const [actionLoading, setActionLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<Resource | null>(null);
  const activeId = useId();

  // Charger la liste des ressources
  const fetchResources = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch(apiService.getResources());
      // data = { id: { nom, url, nb_components, image, category, active, order }, ... }
      setResources(
        Object.entries(data).map(([id, r]) => {
          const resource = r as Partial<Resource>;
          return {
            _id: id,
            nom: resource.nom || "",
            url: resource.url || "",
            nb_components: resource.nb_components || "1",
            image: resource.image || "",
            category: resource.category || "",
            active: resource.active !== undefined ? resource.active : true,
            order: resource.order || 0,
          };
        })
      );
    } catch {
      setError("Erreur lors du chargement des ressources");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchResources();
  }, []);

  // Ajout/édition
  const handleOpenDialog = (resource?: Resource) => {
    setEditingResource(resource || null);
    setForm(
      resource
        ? {
            nom: resource.nom,
            url: resource.url,
            nb_components: resource.nb_components,
            image: resource.image,
            category: resource.category,
            active: resource.active,
          }
        : {
            nom: "",
            url: "",
            nb_components: "1",
            image: "",
            category: "",
            active: true,
          }
    );
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setEditingResource(null);
    setForm({
      nom: "",
      url: "",
      nb_components: "1",
      image: "",
      category: "",
      active: true,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const method = editingResource ? "PUT" : "POST";
      const url = editingResource
        ? apiService.updateResource(editingResource._id!)
        : apiService.addResource();

      await apiFetch(url, {
        method,
        body: JSON.stringify(form),
      });

      await fetchResources();
      handleCloseDialog();
      toast.success(
        editingResource
          ? "La ressource a bien été modifiée."
          : "La ressource a bien été ajoutée."
      );
    } catch (err: unknown) {
      const error = err as Error;
      setError("Erreur lors de l'enregistrement");
      toast.error(error?.message || "Erreur lors de l'enregistrement");
    }
    setActionLoading(false);
  };

  // Suppression
  const handleDelete = async (resource: Resource) => {
    setActionLoading(true);
    try {
      await apiFetch(apiService.deleteResource(resource._id!), {
        method: "DELETE",
      });
      await fetchResources();
      toast.success("La ressource a bien été supprimée.");
    } catch {
      setError("Erreur lors de la suppression");
      toast.error("Erreur lors de la suppression");
    }
    setActionLoading(false);
    setConfirmDelete(null);
  };

  // Grouper par catégorie
  const groupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {} as Record<string, Resource[]>);

  return (
    <Card className="w-full">
      <div className="flex flex-col gap-2 md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-xl font-normal">Gestion des ressources</h2>
        <Button
          className="w-full sm:w-auto"
          variant="default"
          size="sm"
          onClick={() => handleOpenDialog()}
        >
          Ajouter une ressource
        </Button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <ResourceSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : resources.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          Aucune ressource à afficher.
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedResources).map(
            ([category, categoryResources]) => (
              <div key={category} className="border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-3">{category}</h3>
                <div className="space-y-2">
                  {categoryResources.map((resource) => (
                    <div
                      key={resource._id}
                      className={`flex items-center justify-between p-3 border rounded-lg hover:bg-accent/30 transition-all duration-200 ${
                        !resource.active ? "opacity-60" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                          {resource.image && (
                            <img
                              src={resource.image}
                              alt={resource.nom}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{resource.nom}</div>
                          <div className="text-sm text-muted-foreground">
                            {resource.url}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 text-xs rounded font-semibold transition-all duration-200
    ${
      resource.active
        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
        : "bg-red-600 text-white border border-red-700 shadow dark:bg-red-900 dark:text-red-200 dark:border-red-400 opacity-100 grayscale-0"
    }
  `}
                        >
                          {resource.active ? "Actif" : "Inactif"}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <DotsVerticalIcon className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleOpenDialog(resource)}
                            >
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setConfirmDelete(resource)}
                              className="text-red-600"
                            >
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* Dialog pour ajout/édition */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>
            {editingResource
              ? "Modifier la ressource"
              : "Ajouter une ressource"}
          </DialogTitle>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom</Label>
                <Input
                  id="nom"
                  name="nom"
                  value={form.nom}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                <Input
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                name="url"
                value={form.url}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nb_components">Nombre de composants</Label>
                <Input
                  id="nb_components"
                  name="nb_components"
                  value={form.nb_components}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={activeId}
                name="active"
                checked={form.active}
                onCheckedChange={(checked) =>
                  handleChange({
                    target: {
                      name: "active",
                      type: "checkbox",
                      checked: !!checked,
                    },
                  } as any)
                }
                className="rounded"
              />
              <Label htmlFor={activeId} className="cursor-pointer select-none">
                Actif
              </Label>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCloseDialog}
              >
                Annuler
              </Button>
              <Button type="submit" size="sm" disabled={actionLoading}>
                {actionLoading ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmation de suppression */}
      <Dialog
        open={!!confirmDelete}
        onOpenChange={() => setConfirmDelete(null)}
      >
        <DialogContent>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <p>
            Êtes-vous sûr de vouloir supprimer la ressource "
            {confirmDelete?.nom}" ?
          </p>
          <div className="flex justify-end gap-2">
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
              {actionLoading ? "Suppression..." : "Supprimer"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
