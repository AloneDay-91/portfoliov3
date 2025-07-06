import React, { useState, useEffect } from "react";
import { Card as UICard } from "@/components/ui/card";
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
import { apiFetch } from "@/services/apiService";
import { Skeleton } from "./ui/skeleton";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Label } from "@/components/ui/label";

// Type de carte (doit correspondre à l'API)
type CardType = {
  _id?: string;
  category: string;
  description: string;
  title: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  badgeColor?: string;
  date?: string;
  avatars?: { src: string; label: string }[];
  content?: string;
};

function CardSkeleton() {
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

function formatDate(date: Date | undefined) {
  if (!date) return "";
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
function isValidDate(date: Date | undefined) {
  if (!date) return false;
  return !isNaN(date.getTime());
}

export default function OverviewCards() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [editingCard, setEditingCard] = useState<CardType | null>(null);
  const [form, setForm] = useState<CardType>({
    category: "",
    description: "",
    title: "",
    src: "",
    ctaText: "",
    ctaLink: "",
    badgeColor: "yellow",
    date: "",
    avatars: [],
    content: "",
  });
  const [actionLoading, setActionLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<CardType | null>(null);
  const [dateOpen, setDateOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(
    form.date ? new Date(form.date) : undefined
  );
  const [dateValue, setDateValue] = React.useState(
    form.date ? formatDate(new Date(form.date)) : ""
  );

  // Charger la liste des cartes
  const fetchCards = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch("/api/cards");
      setCards(data);
    } catch {
      setError("Erreur lors du chargement des cartes");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  // Ajout/édition
  const handleOpenDialog = (card?: CardType) => {
    setEditingCard(card || null);
    setForm(
      card
        ? { ...card }
        : {
            category: "",
            description: "",
            title: "",
            src: "",
            ctaText: "",
            ctaLink: "",
            badgeColor: "yellow",
            date: "",
            avatars: [],
            content: "",
          }
    );
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setEditingCard(null);
    setForm({
      category: "",
      description: "",
      title: "",
      src: "",
      ctaText: "",
      ctaLink: "",
      badgeColor: "yellow",
      date: "",
      avatars: [],
      content: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Ajouter ou éditer une carte
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    // Nettoyage du formulaire avant envoi
    const cleanForm = {
      ...form,
      avatars: Array.isArray(form.avatars) ? form.avatars : [],
      date: form.date || undefined,
      badgeColor: form.badgeColor || undefined,
      content: form.content || undefined,
    };
    // On retire _id avant d'envoyer au backend
    const { _id, ...formSansId } = cleanForm;
    try {
      const method = editingCard ? "PUT" : "POST";
      const url = editingCard ? `/api/cards/${editingCard._id}` : "/api/cards";
      await apiFetch(url, {
        method,
        body: JSON.stringify(formSansId),
      });
      await fetchCards();
      handleCloseDialog();
      toast.success(editingCard ? "Carte modifiée" : "Carte ajoutée");
    } catch {
      toast.error("Erreur lors de l'enregistrement");
    }
    setActionLoading(false);
  };

  // Suppression
  const handleDelete = async (card: CardType) => {
    setActionLoading(true);
    try {
      await apiFetch(`/api/cards/${card._id}`, { method: "DELETE" });
      await fetchCards();
      toast.success("Carte supprimée");
    } catch {
      toast.error("Erreur lors de la suppression");
    }
    setActionLoading(false);
    setConfirmDelete(null);
  };

  // Récupérer la liste des catégories distinctes
  const categories = Array.from(
    new Set(cards.map((c) => c.category).filter(Boolean))
  );
  const [customCategory, setCustomCategory] = useState("");
  const isOtherCategory = form.category === "__other__";

  return (
    <UICard className="w-full">
      <div className="flex flex-col gap-2 md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-xl font-normal">Gestion des cartes (projets)</h2>
        <Button
          className="w-full sm:w-auto"
          variant="default"
          size="sm"
          onClick={() => handleOpenDialog()}
        >
          Ajouter une carte
        </Button>
      </div>
      {loading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : cards.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          Aucune carte à afficher.
        </div>
      ) : (
        <div className="space-y-6">
          {cards.map((card) => (
            <div
              key={card._id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/30 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                  {card.src && (
                    <img
                      src={card.src}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <div className="font-medium flex items-center gap-2">
                    {card.title}
                    {card.badgeColor && (
                      <Badge
                        variant={
                          card.badgeColor as
                            | "outline"
                            | "blue"
                            | "green"
                            | "red"
                            | "yellow"
                            | "default"
                            | "secondary"
                            | "destructive"
                        }
                        className="font-normal"
                      >
                        {card.category}
                      </Badge>
                    )}
                    {card.date && (
                      <Badge variant="outline">
                        <span className="text-xs p-0.5 font-light">
                          {new Date(card.date).toLocaleDateString("fr-FR", {
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {card.description}
                  </div>
                  {card.avatars && card.avatars.length > 0 && (
                    <div className="flex gap-1 mt-1">
                      {card.avatars.map((a, i) => (
                        <img
                          key={i}
                          src={a.src}
                          alt={a.label}
                          title={a.label}
                          className="w-6 h-6 rounded-full border"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <DotsVerticalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleOpenDialog(card)}>
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setConfirmDelete(card)}
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
      )}

      {/* Dialog pour ajout/édition */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogTitle>
            {editingCard ? "Modifier la carte" : "Ajouter une carte"}
          </DialogTitle>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Titre"
              required
            />
            {/* Select pour la catégorie */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Catégorie
              </label>
              <Select
                value={isOtherCategory ? "__other__" : form.category}
                onValueChange={(value) => {
                  if (value === "__other__") {
                    setForm((f) => ({ ...f, category: "__other__" }));
                  } else {
                    setForm((f) => ({ ...f, category: value }));
                    setCustomCategory("");
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                  <SelectItem value="__other__">Autre…</SelectItem>
                </SelectContent>
              </Select>
              {isOtherCategory && (
                <Input
                  className="mt-2"
                  placeholder="Nouvelle catégorie"
                  value={customCategory}
                  onChange={(e) => {
                    setCustomCategory(e.target.value);
                    setForm((f) => ({ ...f, category: e.target.value }));
                  }}
                  required
                />
              )}
            </div>
            <Input
              name="src"
              value={form.src}
              onChange={handleChange}
              placeholder="Image (URL)"
            />
            <Input
              name="ctaText"
              value={form.ctaText}
              onChange={handleChange}
              placeholder="Texte du bouton"
            />
            <Input
              name="ctaLink"
              value={form.ctaLink}
              onChange={handleChange}
              placeholder="Lien du bouton"
            />
            <Input
              name="badgeColor"
              value={form.badgeColor}
              onChange={handleChange}
              placeholder="Couleur du badge"
            />
            <div>
              <Label htmlFor="date" className="px-1">
                Date
              </Label>
              <div className="relative flex gap-2">
                <Input
                  id="date"
                  value={dateValue}
                  placeholder="01 juin 2025"
                  className="bg-background pr-10"
                  onChange={(e) => {
                    const d = new Date(e.target.value);
                    setDateValue(e.target.value);
                    if (isValidDate(d)) {
                      setForm((f) => ({ ...f, date: d.toISOString() }));
                      setMonth(d);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setDateOpen(true);
                    }
                  }}
                />
                <Popover open={dateOpen} onOpenChange={setDateOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      id="date-picker"
                      variant="ghost"
                      className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                      type="button"
                    >
                      <CalendarIcon className="size-3.5" />
                      <span className="sr-only">Sélectionner une date</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="end"
                    alignOffset={-8}
                    sideOffset={10}
                  >
                    <Calendar
                      mode="single"
                      selected={form.date ? new Date(form.date) : undefined}
                      captionLayout="dropdown"
                      month={month}
                      onMonthChange={setMonth}
                      onSelect={(d) => {
                        if (d) {
                          setForm((f) => ({ ...f, date: d.toISOString() }));
                          setDateValue(formatDate(d));
                          setDateOpen(false);
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <Textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full border rounded p-2"
            />
            <Textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Contenu détaillé (markdown ou texte)"
              className="w-full border rounded p-2"
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={actionLoading}>
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
            Êtes-vous sûr de vouloir supprimer la carte "{confirmDelete?.title}"
            ?
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
    </UICard>
  );
}
