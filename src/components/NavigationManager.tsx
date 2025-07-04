import React, { useState, useEffect } from "react";
import { NavigationLink } from "../types/navigation";
import { NavigationService } from "../services/navigationService";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { toast } from "sonner";
import {
  Trash2,
  Edit,
  Plus,
  GripVertical,
  MoreHorizontal,
  FileIcon,
  FrameIcon,
  Lock,
  Layers,
  TextIcon,
} from "lucide-react";
import { Half2Icon, ComponentBooleanIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } =
  {
    Half2Icon: Half2Icon,
    FileIcon: FileIcon,
    FrameIcon: FrameIcon,
    Lock: Lock,
    Layers: Layers,
    TextIcon: TextIcon,
    ComponentBooleanIcon: ComponentBooleanIcon,
  };

const ICON_OPTIONS = [
  { value: "Half2Icon", label: "Half2Icon" },
  { value: "FileIcon", label: "FileIcon" },
  { value: "FrameIcon", label: "FrameIcon" },
  { value: "Lock", label: "Lock" },
  { value: "Layers", label: "Layers" },
  { value: "TextIcon", label: "TextIcon" },
  { value: "ComponentBooleanIcon", label: "ComponentBooleanIcon" },
];

const SECTIONS: { id: NavigationLink["section"]; title: string }[] = [
  { id: "mes-outils", title: "Mes Outils" },
  { id: "a-propos", title: "À Propos" },
];

export default function NavigationManager() {
  const [links, setLinks] = useState<NavigationLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [editingLink, setEditingLink] = useState<NavigationLink | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deletingLink, setDeletingLink] = useState<NavigationLink | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    icon: "",
    description: "",
    section: "mes-outils" as NavigationLink["section"],
    order: 0,
    active: true,
    showBadge: false,
    badgeText: "Nouveau",
    badgeDuration: 14, // jours
  });

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    try {
      setLoading(true);
      setShowSkeleton(true);

      // Délai minimum pour éviter le clignotement
      const startTime = Date.now();
      const minLoadingTime = 800; // 800ms minimum

      const data = await NavigationService.getAllLinks();
      setLinks(data);

      // Attendre le délai minimum si nécessaire
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < minLoadingTime) {
        await new Promise((resolve) =>
          setTimeout(resolve, minLoadingTime - elapsedTime)
        );
      }
    } catch (error) {
      toast.error(
        `Erreur lors du chargement des liens: ${
          error instanceof Error ? error.message : "Erreur inconnue"
        }`
      );
    } finally {
      setLoading(false);
      // Délai supplémentaire pour masquer le skeleton
      setTimeout(() => setShowSkeleton(false), 200);
    }
  };

  // Fonction pour déclencher le rechargement de la navbar
  const triggerNavbarReload = () => {
    // Déclencher un événement personnalisé
    window.dispatchEvent(new CustomEvent("navigation-updated"));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingLink) {
        await NavigationService.updateLink(editingLink.id!, formData);
        toast.success("Lien modifié avec succès");
      } else {
        await NavigationService.addLink(formData);
        toast.success("Lien ajouté avec succès");
      }
      setIsDialogOpen(false);
      resetForm();
      loadLinks();
      // Déclencher le rechargement de la navbar
      triggerNavbarReload();
    } catch (error) {
      toast.error(
        `Erreur lors de l'opération: ${
          error instanceof Error ? error.message : "Erreur inconnue"
        }`
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await NavigationService.deleteLink(id);
      toast.success("Lien supprimé avec succès");
      loadLinks();
      setIsDeleteDialogOpen(false);
      setDeletingLink(null);
      // Déclencher le rechargement de la navbar
      triggerNavbarReload();
    } catch (error) {
      toast.error(
        `Erreur lors de la suppression: ${
          error instanceof Error ? error.message : "Erreur inconnue"
        }`
      );
    }
  };

  const openDeleteDialog = (link: NavigationLink) => {
    setDeletingLink(link);
    setIsDeleteDialogOpen(true);
  };

  const handleEdit = (link: NavigationLink) => {
    setEditingLink(link);
    setFormData({
      title: link.title,
      url: link.url,
      icon: link.icon || "",
      description: link.description || "",
      section: link.section,
      order: link.order,
      active: link.active,
      showBadge: link.showBadge || false,
      badgeText: link.badgeText || "Nouveau",
      badgeDuration: link.badgeDuration || 14,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingLink(null);
    setFormData({
      title: "",
      url: "",
      icon: "",
      description: "",
      section: "mes-outils",
      order: 0,
      active: true,
      showBadge: false,
      badgeText: "Nouveau",
      badgeDuration: 14,
    });
  };

  const groupedLinks = SECTIONS.map((section) => ({
    ...section,
    links: links
      .filter((link) => link.section === section.id)
      .sort((a, b) => a.order - b.order),
  }));

  if (loading || showSkeleton) {
    return (
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          <div className="h-10 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        </div>

        {/* Sections skeleton */}
        <div className="grid gap-6">
          {[1, 2].map((sectionIndex) => (
            <div key={sectionIndex} className="border rounded-lg">
              {/* Section header skeleton */}
              <div className="p-6 border-b">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                  <div className="h-6 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                </div>
              </div>

              {/* Section content skeleton */}
              <div className="p-6">
                <div className="space-y-3">
                  {[1, 2, 3].map((linkIndex) => (
                    <div
                      key={linkIndex}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                          <div className="h-5 w-12 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                        </div>
                        <div className="h-4 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                      </div>
                      <div className="h-8 w-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header responsive */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl md:text-2xl font-bold">
          Gestion de la Navigation
        </h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()} className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un lien
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-[425px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingLink ? "Modifier le lien" : "Ajouter un lien"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Titre</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="icon">Icône (optionnel)</Label>
                <div className="flex items-center gap-2">
                  <Select
                    value={formData.icon || "none"}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        icon: value === "none" ? "" : value,
                      })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Aucune</SelectItem>
                      {ICON_OPTIONS.map((option) => {
                        const Icon = iconMap[option.value];
                        return (
                          <SelectItem key={option.value} value={option.value}>
                            <span className="flex items-center gap-2">
                              {Icon && <Icon className="w-5 h-5" />}
                              {option.label}
                            </span>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {formData.icon &&
                    formData.icon !== "none" &&
                    iconMap[formData.icon] &&
                    React.createElement(iconMap[formData.icon], {
                      className: "w-6 h-6 ml-2",
                    })}
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Description du lien"
                />
              </div>
              <div>
                <Label htmlFor="section">Section</Label>
                <Select
                  value={formData.section}
                  onValueChange={(value: NavigationLink["section"]) =>
                    setFormData({ ...formData, section: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SECTIONS.map((section) => (
                      <SelectItem key={section.id} value={section.id}>
                        {section.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="order">Ordre</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.active}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, active: checked })
                  }
                />
                <Label htmlFor="active">Actif</Label>
              </div>

              {/* Section Badge */}
              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="showBadge"
                    checked={formData.showBadge}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, showBadge: checked })
                    }
                  />
                  <Label htmlFor="showBadge">Afficher un badge</Label>
                </div>

                {formData.showBadge && (
                  <div className="space-y-3 pl-6">
                    <div>
                      <Label htmlFor="badgeText">Texte du badge</Label>
                      <Input
                        id="badgeText"
                        value={formData.badgeText}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            badgeText: e.target.value,
                          })
                        }
                        placeholder="ex: Nouveau, Promo, etc."
                      />
                    </div>
                    <div>
                      <Label htmlFor="badgeDuration">
                        Durée d'affichage (jours)
                      </Label>
                      <Input
                        id="badgeDuration"
                        type="number"
                        min="1"
                        max="365"
                        value={formData.badgeDuration}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            badgeDuration: parseInt(e.target.value) || 14,
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="w-full sm:w-auto"
                >
                  Annuler
                </Button>
                <Button type="submit" className="w-full sm:w-auto">
                  {editingLink ? "Modifier" : "Ajouter"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Grille responsive */}
      <div className="grid gap-4 md:gap-6">
        {groupedLinks.map((section) => (
          <Card key={section.id} className="p-0">
            <div className="p-0 md:p-6 border-b">
              <h3 className="text-base md:text-lg font-bold flex items-center gap-2">
                <GripVertical className="w-4 h-4 md:w-5 md:h-5" />
                {section.title}
              </h3>
            </div>
            <CardContent className="p-0 md:p-6">
              {section.links.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  Aucun lien dans cette section
                </p>
              ) : (
                <div className="space-y-2">
                  {section.links.map((link) => (
                    <div
                      key={link.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg gap-2"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 min-w-0">
                          <span className="text-sm font-medium truncate">
                            {link.title}
                          </span>
                          {!link.active && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded w-fit">
                              Inactif
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground truncate">
                          {link.url}
                        </span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 self-end sm:self-auto"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(link)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => openDeleteDialog(link)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog de confirmation de suppression */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="w-[95vw] max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Êtes-vous sûr de vouloir supprimer le lien{" "}
              <span className="font-medium text-foreground">
                "{deletingLink?.title}"
              </span>
              ? Cette action est irréversible.
            </p>
            <div className="flex flex-col sm:flex-row justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDeleteDialogOpen(false);
                  setDeletingLink(null);
                }}
                className="w-full sm:w-auto"
              >
                Annuler
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  if (deletingLink?.id) {
                    handleDelete(deletingLink.id);
                  }
                }}
                className="w-full sm:w-auto"
              >
                Supprimer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
