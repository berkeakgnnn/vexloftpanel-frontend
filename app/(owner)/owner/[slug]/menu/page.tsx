"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
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
import { InlinePriceEdit } from "@/components/inline-price-edit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { Plus, Pencil, Trash2, ChevronDown, ChevronRight, UtensilsCrossed } from "lucide-react";

// ---- Types ----

interface CategoryFormState {
  nameTr: string;
  nameEn: string;
  layout: string;
}

interface ItemFormState {
  nameTr: string;
  nameEn: string;
  descriptionTr: string;
  descriptionEn: string;
  price: string;
  image: string;
  categoryId: string;
}

// ---- Category dialog ----

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
          <DialogTitle className="text-lg font-bold">
            {initial?.nameTr ? "Kategori Düzenle" : "Kategori Ekle"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Ad (TR)</Label>
            <Input
              value={form.nameTr}
              onChange={(e) => setForm((f) => ({ ...f, nameTr: e.target.value }))}
              placeholder="Sıcak İçecekler"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Ad (EN)</Label>
            <Input
              value={form.nameEn}
              onChange={(e) => setForm((f) => ({ ...f, nameEn: e.target.value }))}
              placeholder="Hot Beverages"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Görünüm</Label>
            <Select
              value={form.layout}
              onValueChange={(v) => {
                if (v) setForm((f) => ({ ...f, layout: v }));
              }}
            >
              <SelectTrigger className="w-full h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GRID">Grid</SelectItem>
                <SelectItem value="LIST">Liste</SelectItem>
                <SelectItem value="CARD">Kart</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            İptal
          </Button>
          <Button
            onClick={() => onSave(form)}
            disabled={loading || !form.nameTr || !form.nameEn}
            className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white border-0"
          >
            {loading ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ---- Item sheet ----

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
  const buildFormFromInitial = () => ({
    nameTr: initial?.nameTr ?? "",
    nameEn: initial?.nameEn ?? "",
    descriptionTr: initial?.descriptionTr ?? "",
    descriptionEn: initial?.descriptionEn ?? "",
    price: initial?.price !== undefined ? String(initial.price) : "",
    image: initial?.image ?? "",
    categoryId: initial?.categoryId ?? categoryId,
  });

  const [form, setForm] = useState<ItemFormState>(buildFormFromInitial);

  // Sync form when initial (editItem) changes
  useEffect(() => {
    if (initial) {
      setForm(buildFormFromInitial());
    }
  }, [initial?.id]);

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

  const field =
    (key: keyof ItemFormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <Sheet open={open} onOpenChange={handleOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-lg font-bold">
            {initial?.nameTr ? "Ürün Düzenle" : "Ürün Ekle"}
          </SheetTitle>
        </SheetHeader>
        <div className="space-y-4 px-4 pb-4">
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Ad (TR)</Label>
            <Input
              value={form.nameTr}
              onChange={field("nameTr")}
              placeholder="Americano"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Ad (EN)</Label>
            <Input
              value={form.nameEn}
              onChange={field("nameEn")}
              placeholder="Americano"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Açıklama (TR)</Label>
            <Input
              value={form.descriptionTr}
              onChange={field("descriptionTr")}
              placeholder="Espresso + su"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Açıklama (EN)</Label>
            <Input
              value={form.descriptionEn}
              onChange={field("descriptionEn")}
              placeholder="Espresso + water"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Fiyat (TL)</Label>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={field("price")}
              placeholder="45.00"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Görsel URL</Label>
            <Input
              value={form.image}
              onChange={field("image")}
              placeholder="https://..."
              className="h-11"
            />
          </div>
        </div>
        <SheetFooter className="px-4 pb-6 gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className="flex-1"
          >
            İptal
          </Button>
          <Button
            onClick={() => onSave(form)}
            disabled={loading || !form.nameTr || !form.nameEn || !form.price}
            className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white border-0"
          >
            {loading ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// ---- Delete confirmation ----

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
          <AlertDialogTitle>Silmek istediğinize emin misiniz?</AlertDialogTitle>
          <AlertDialogDescription>
            <strong>{title}</strong> kalıcı olarak silinecek. Bu işlem geri alınamaz.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onOpenChange(false)}>İptal</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onConfirm} disabled={loading}>
            {loading ? "Siliniyor..." : "Sil"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// ---- Category section (accordion card) ----

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
            toast.success("Ürün güncellendi");
            setEditItem(null);
          },
          onError: () => toast.error("Güncelleme başarısız"),
        }
      );
    } else {
      createItem.mutate(payload, {
        onSuccess: () => {
          toast.success("Ürün eklendi");
          setAddItemOpen(false);
        },
        onError: () => toast.error("Ekleme başarısız"),
      });
    }
  };

  const handlePriceSave = async (item: MenuItem, newPrice: number) => {
    await new Promise<void>((resolve, reject) => {
      updateItem.mutate(
        { id: item.id, price: newPrice },
        {
          onSuccess: () => {
            toast.success("Fiyat güncellendi");
            resolve();
          },
          onError: () => {
            toast.error("Fiyat güncellenemedi");
            reject(new Error("price update failed"));
          },
        }
      );
    });
  };

  const handleDeleteItem = () => {
    if (!deleteItem) return;
    deleteItemMutation.mutate(deleteItem.id, {
      onSuccess: () => {
        toast.success("Ürün silindi");
        setDeleteItem(null);
      },
      onError: () => toast.error("Silme başarısız"),
    });
  };

  const itemCount = category._count?.items ?? 0;

  return (
    <Card className="overflow-hidden border border-gray-100 shadow-sm">
      <CardHeader className="p-4 pb-4">
        <div className="flex items-center gap-2">
          {/* Expand/collapse toggle */}
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex flex-1 items-center gap-3 text-left cursor-pointer"
          >
            <div
              className={`flex items-center justify-center h-7 w-7 rounded-lg transition-colors ${
                expanded ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-500"
              }`}
            >
              {expanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-lg text-gray-900">{category.nameTr}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                {itemCount} ürün
              </span>
            </div>
          </button>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onEdit(category)}
              className="text-gray-400 hover:text-indigo-600 hover:bg-indigo-50"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onDelete(category)}
              className="text-gray-400 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {expanded && (
        <CardContent className="px-4 pb-4 pt-0 space-y-2 border-t border-gray-50">
          {itemsLoading ? (
            <div className="space-y-2 pt-3">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : (
            <div className="pt-2 space-y-2">
              {items?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-white hover:border-gray-200 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="shrink-0 h-10 w-10 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt={item.nameTr}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UtensilsCrossed className="h-4 w-4 text-gray-400" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-gray-900 truncate">
                      {item.nameTr}
                    </p>
                    {item.descriptionTr && (
                      <p className="text-sm text-gray-500 truncate mt-0.5">
                        {item.descriptionTr}
                      </p>
                    )}
                  </div>

                  {/* Inline price editor */}
                  <div className="shrink-0">
                    <InlinePriceEdit
                      price={item.price}
                      onSave={(newPrice) => handlePriceSave(item, newPrice)}
                    />
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setEditItem(item)}
                      className="text-gray-400 hover:text-indigo-600 hover:bg-indigo-50"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setDeleteItem(item)}
                      className="text-gray-400 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {/* Add item button */}
              <Button
                variant="outline"
                size="default"
                className="w-full mt-1 h-10 border-dashed border-gray-200 text-gray-500 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/50"
                onClick={() => setAddItemOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Ürün Ekle
              </Button>
            </div>
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
        onOpenChange={(v) => {
          if (!v) setEditItem(null);
        }}
        initial={editItem ?? undefined}
        categoryId={category.id}
        onSave={handleSaveItem}
        loading={updateItem.isPending}
      />

      {/* Delete item dialog */}
      <DeleteDialog
        open={!!deleteItem}
        onOpenChange={(v) => {
          if (!v) setDeleteItem(null);
        }}
        title={deleteItem?.nameTr ?? ""}
        onConfirm={handleDeleteItem}
        loading={deleteItemMutation.isPending}
      />
    </Card>
  );
}

// ---- Main page ----

export default function OwnerMenuPage() {
  const params = useParams();
  const slug = params.slug as string;
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
            toast.success("Kategori güncellendi");
            setEditCat(null);
          },
          onError: () => toast.error("Güncelleme başarısız"),
        }
      );
    } else {
      createCategory.mutate(form, {
        onSuccess: () => {
          toast.success("Kategori eklendi");
          setAddCatOpen(false);
        },
        onError: () => toast.error("Ekleme başarısız"),
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
      onError: () => toast.error("Silme başarısız"),
    });
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Menü Yönetimi</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Kategoriler ve ürünleri buradan yönetebilirsiniz.
          </p>
        </div>
        <Button
          onClick={() => setAddCatOpen(true)}
          className="h-11 px-5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white border-0"
        >
          <Plus className="h-4 w-4 mr-2" />
          Kategori Ekle
        </Button>
      </div>

      {/* Categories list */}
      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-16 w-full rounded-xl" />
          <Skeleton className="h-16 w-full rounded-xl" />
          <Skeleton className="h-16 w-full rounded-xl" />
        </div>
      ) : !categories?.length ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
          <div className="flex justify-center mb-4">
            <div className="h-14 w-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
              <UtensilsCrossed className="h-7 w-7 text-indigo-400" />
            </div>
          </div>
          <p className="text-base font-semibold text-gray-700">Henüz kategori yok</p>
          <p className="text-sm text-gray-500 mt-1 mb-5">
            Menünüze ilk kategoriyi ekleyerek başlayın.
          </p>
          <Button
            onClick={() => setAddCatOpen(true)}
            className="h-11 px-6 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white border-0"
          >
            <Plus className="h-4 w-4 mr-2" />
            İlk Kategoriyi Ekle
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
        onOpenChange={(v) => {
          if (!v) setEditCat(null);
        }}
        initial={editCat ?? undefined}
        onSave={handleSaveCategory}
        loading={updateCategory.isPending}
      />

      {/* Delete category dialog */}
      <DeleteDialog
        open={!!deleteCat}
        onOpenChange={(v) => {
          if (!v) setDeleteCat(null);
        }}
        title={deleteCat?.nameTr ?? ""}
        onConfirm={handleDeleteCategory}
        loading={deleteCategory.isPending}
      />
    </div>
  );
}
