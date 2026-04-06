"use client";

import { use, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  type Category,
} from "@/lib/hooks/use-categories";
import {
  useMenuItems,
  useCreateMenuItem,
  useUpdateMenuItem,
  useDeleteMenuItem,
  type MenuItem,
} from "@/lib/hooks/use-menu-items";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Plus, Pencil, Trash2, ChevronDown, ChevronRight } from "lucide-react";

// ---- Category form dialog ----

interface CategoryFormState {
  nameTr: string;
  nameEn: string;
  layout: string;
}

function CategoryDialog({
  open,
  onOpenChange,
  initial,
  onSave,
  loading,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial?: Partial<CategoryFormState>;
  onSave: (data: CategoryFormState) => void;
  loading: boolean;
}) {
  const [form, setForm] = useState<CategoryFormState>({
    nameTr: initial?.nameTr ?? "",
    nameEn: initial?.nameEn ?? "",
    layout: initial?.layout ?? "GRID",
  });

  // Sync when dialog re-opens with new initial values
  const handleOpen = (v: boolean) => {
    if (v) {
      setForm({
        nameTr: initial?.nameTr ?? "",
        nameEn: initial?.nameEn ?? "",
        layout: initial?.layout ?? "GRID",
      });
    }
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{initial?.nameTr ? "Kategori Duzenle" : "Kategori Ekle"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label>Ad (TR)</Label>
            <Input
              value={form.nameTr}
              onChange={(e) => setForm((f) => ({ ...f, nameTr: e.target.value }))}
              placeholder="Sicak Icecekler"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Ad (EN)</Label>
            <Input
              value={form.nameEn}
              onChange={(e) => setForm((f) => ({ ...f, nameEn: e.target.value }))}
              placeholder="Hot Beverages"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Layout</Label>
            <Select value={form.layout} onValueChange={(v) => { if (v) setForm((f) => ({ ...f, layout: v })); }}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GRID">Grid</SelectItem>
                <SelectItem value="LIST">List</SelectItem>
                <SelectItem value="CARD">Card</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Iptal
          </Button>
          <Button onClick={() => onSave(form)} disabled={loading || !form.nameTr || !form.nameEn}>
            {loading ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ---- Menu item form sheet ----

interface ItemFormState {
  nameTr: string;
  nameEn: string;
  descriptionTr: string;
  descriptionEn: string;
  price: string;
  image: string;
  categoryId: string;
}

function ItemSheet({
  open,
  onOpenChange,
  initial,
  categoryId,
  onSave,
  loading,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial?: Partial<MenuItem>;
  categoryId: string;
  onSave: (data: ItemFormState) => void;
  loading: boolean;
}) {
  const [form, setForm] = useState<ItemFormState>({
    nameTr: initial?.nameTr ?? "",
    nameEn: initial?.nameEn ?? "",
    descriptionTr: initial?.descriptionTr ?? "",
    descriptionEn: initial?.descriptionEn ?? "",
    price: initial?.price !== undefined ? String(initial.price) : "",
    image: initial?.image ?? "",
    categoryId: initial?.categoryId ?? categoryId,
  });

  const handleOpen = (v: boolean) => {
    if (v) {
      setForm({
        nameTr: initial?.nameTr ?? "",
        nameEn: initial?.nameEn ?? "",
        descriptionTr: initial?.descriptionTr ?? "",
        descriptionEn: initial?.descriptionEn ?? "",
        price: initial?.price !== undefined ? String(initial.price) : "",
        image: initial?.image ?? "",
        categoryId: initial?.categoryId ?? categoryId,
      });
    }
    onOpenChange(v);
  };

  const field = (key: keyof ItemFormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <Sheet open={open} onOpenChange={handleOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="pb-2">
          <SheetTitle>{initial?.nameTr ? "Urun Duzenle" : "Urun Ekle"}</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 px-4 pb-4">
          <div className="space-y-1.5">
            <Label>Ad (TR)</Label>
            <Input value={form.nameTr} onChange={field("nameTr")} placeholder="Americano" />
          </div>
          <div className="space-y-1.5">
            <Label>Ad (EN)</Label>
            <Input value={form.nameEn} onChange={field("nameEn")} placeholder="Americano" />
          </div>
          <div className="space-y-1.5">
            <Label>Aciklama (TR)</Label>
            <Input value={form.descriptionTr} onChange={field("descriptionTr")} placeholder="Espresso + su" />
          </div>
          <div className="space-y-1.5">
            <Label>Aciklama (EN)</Label>
            <Input value={form.descriptionEn} onChange={field("descriptionEn")} placeholder="Espresso + water" />
          </div>
          <div className="space-y-1.5">
            <Label>Fiyat</Label>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={field("price")}
              placeholder="45.00"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Gorsel URL</Label>
            <Input value={form.image} onChange={field("image")} placeholder="https://..." />
          </div>
        </div>
        <SheetFooter className="px-4 pb-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className="flex-1"
          >
            Iptal
          </Button>
          <Button
            onClick={() => onSave(form)}
            disabled={loading || !form.nameTr || !form.nameEn || !form.price}
            className="flex-1"
          >
            {loading ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// ---- Delete confirmation dialog ----

function DeleteDialog({
  open,
  onOpenChange,
  title,
  onConfirm,
  loading,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  onConfirm: () => void;
  loading: boolean;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Silmek istediginize emin misiniz?</AlertDialogTitle>
          <AlertDialogDescription>
            <strong>{title}</strong> kalici olarak silinecek. Bu islem geri alinamaz.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onOpenChange(false)}>Iptal</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Siliniyor..." : "Sil"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// ---- Category section ----

function CategorySection({
  slug,
  category,
  onEdit,
  onDelete,
}: {
  slug: string;
  category: Category;
  onEdit: (cat: Category) => void;
  onDelete: (cat: Category) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<MenuItem | null>(null);

  const { data: items, isLoading: itemsLoading } = useMenuItems(slug, category.id);
  const createItem = useCreateMenuItem(slug);
  const updateItem = useUpdateMenuItem(slug);
  const deleteItemMutation = useDeleteMenuItem(slug);

  const handleSaveItem = (form: ItemFormState) => {
    const payload = {
      ...form,
      price: parseFloat(form.price),
      categoryId: category.id,
    };
    if (editItem) {
      updateItem.mutate(
        { id: editItem.id, ...payload },
        {
          onSuccess: () => {
            toast.success("Urun guncellendi");
            setEditItem(null);
          },
          onError: () => toast.error("Guncelleme basarisiz"),
        }
      );
    } else {
      createItem.mutate(payload, {
        onSuccess: () => {
          toast.success("Urun eklendi");
          setAddItemOpen(false);
        },
        onError: () => toast.error("Ekleme basarisiz"),
      });
    }
  };

  const handleDeleteItem = () => {
    if (!deleteItem) return;
    deleteItemMutation.mutate(deleteItem.id, {
      onSuccess: () => {
        toast.success("Urun silindi");
        setDeleteItem(null);
      },
      onError: () => toast.error("Silme basarisiz"),
    });
  };

  return (
    <Card>
      <CardHeader className="p-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex flex-1 items-center gap-2 text-left"
          >
            {expanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
            )}
            <div>
              <span className="font-medium text-sm">{category.nameTr}</span>
              <span className="text-xs text-muted-foreground ml-2">
                {category._count?.items ?? 0} urun
              </span>
            </div>
          </button>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon-sm" onClick={() => onEdit(category)}>
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon-sm" onClick={() => onDelete(category)}>
              <Trash2 className="h-3.5 w-3.5 text-destructive" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {expanded && (
        <CardContent className="p-3 pt-0 space-y-2">
          {itemsLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <>
              {items?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-2 rounded-lg border bg-gray-50/50"
                >
                  {item.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image}
                      alt={item.nameTr}
                      className="h-10 w-10 rounded object-cover shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.nameTr}</p>
                    <p className="text-xs text-muted-foreground">
                      {typeof item.price === "number" ? item.price.toFixed(2) : item.price} TL
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="icon-sm" onClick={() => setEditItem(item)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon-sm" onClick={() => setDeleteItem(item)}>
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-1"
                onClick={() => setAddItemOpen(true)}
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                Urun Ekle
              </Button>
            </>
          )}
        </CardContent>
      )}

      {/* Add item sheet */}
      <ItemSheet
        open={addItemOpen}
        onOpenChange={setAddItemOpen}
        categoryId={category.id}
        onSave={handleSaveItem}
        loading={createItem.isPending}
      />

      {/* Edit item sheet */}
      <ItemSheet
        open={!!editItem}
        onOpenChange={(v) => { if (!v) setEditItem(null); }}
        initial={editItem ?? undefined}
        categoryId={category.id}
        onSave={handleSaveItem}
        loading={updateItem.isPending}
      />

      {/* Delete item dialog */}
      <DeleteDialog
        open={!!deleteItem}
        onOpenChange={(v) => { if (!v) setDeleteItem(null); }}
        title={deleteItem?.nameTr ?? ""}
        onConfirm={handleDeleteItem}
        loading={deleteItemMutation.isPending}
      />
    </Card>
  );
}

// ---- Main page ----

export default function MenuPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data: categories, isLoading } = useCategories(slug);
  const createCategory = useCreateCategory(slug);
  const updateCategory = useUpdateCategory(slug);
  const deleteCategory = useDeleteCategory(slug);

  const [addCatOpen, setAddCatOpen] = useState(false);
  const [editCat, setEditCat] = useState<Category | null>(null);
  const [deleteCat, setDeleteCat] = useState<Category | null>(null);

  const handleSaveCategory = (form: CategoryFormState) => {
    if (editCat) {
      updateCategory.mutate(
        { id: editCat.id, ...form },
        {
          onSuccess: () => {
            toast.success("Kategori guncellendi");
            setEditCat(null);
          },
          onError: () => toast.error("Guncelleme basarisiz"),
        }
      );
    } else {
      createCategory.mutate(form, {
        onSuccess: () => {
          toast.success("Kategori eklendi");
          setAddCatOpen(false);
        },
        onError: () => toast.error("Ekleme basarisiz"),
      });
    }
  };

  const handleDeleteCategory = () => {
    if (!deleteCat) return;
    deleteCategory.mutate(deleteCat.id, {
      onSuccess: () => {
        toast.success("Kategori silindi");
        setDeleteCat(null);
      },
      onError: () => toast.error("Silme basarisiz"),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href={`/businesses/${slug}`}>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold">Menu Yonetimi</h1>
          <p className="text-sm text-muted-foreground">/{slug}</p>
        </div>
        <Button onClick={() => setAddCatOpen(true)}>
          <Plus className="h-4 w-4 mr-1.5" />
          Kategori Ekle
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>
      ) : !categories?.length ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">Henuz kategori yok.</p>
          <Button variant="outline" className="mt-3" onClick={() => setAddCatOpen(true)}>
            <Plus className="h-4 w-4 mr-1.5" />
            Ilk Kategoriyi Ekle
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {categories.map((cat) => (
            <CategorySection
              key={cat.id}
              slug={slug}
              category={cat}
              onEdit={(c) => setEditCat(c)}
              onDelete={(c) => setDeleteCat(c)}
            />
          ))}
        </div>
      )}

      {/* Add category dialog */}
      <CategoryDialog
        open={addCatOpen}
        onOpenChange={setAddCatOpen}
        onSave={handleSaveCategory}
        loading={createCategory.isPending}
      />

      {/* Edit category dialog */}
      <CategoryDialog
        open={!!editCat}
        onOpenChange={(v) => { if (!v) setEditCat(null); }}
        initial={editCat ?? undefined}
        onSave={handleSaveCategory}
        loading={updateCategory.isPending}
      />

      {/* Delete category dialog */}
      <DeleteDialog
        open={!!deleteCat}
        onOpenChange={(v) => { if (!v) setDeleteCat(null); }}
        title={deleteCat?.nameTr ?? ""}
        onConfirm={handleDeleteCategory}
        loading={deleteCategory.isPending}
      />
    </div>
  );
}
