"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";

export interface MenuItem {
  id: string;
  nameTr: string;
  nameEn: string;
  descriptionTr: string;
  descriptionEn: string;
  price: number | string;
  image: string | null;
  sortOrder: number;
  isActive: boolean;
  badges: Record<string, string> | null;
  categoryId: string;
}

export function useMenuItems(slug: string, categoryId?: string) {
  return useQuery({
    queryKey: ["menuItems", slug, categoryId],
    queryFn: () =>
      api<MenuItem[]>(
        `/businesses/${slug}/menu-items${categoryId ? `?categoryId=${categoryId}` : ""}`
      ),
    enabled: !!slug,
  });
}

export function useCreateMenuItem(slug: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (
      data: Partial<MenuItem> & { categoryId: string; nameTr: string; nameEn: string; price: number }
    ) =>
      api(`/businesses/${slug}/menu-items`, { method: "POST", body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["menuItems", slug] }),
  });
}

export function useUpdateMenuItem(slug: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string; [key: string]: unknown }) =>
      api(`/businesses/${slug}/menu-items/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["menuItems", slug] }),
  });
}

export function useDeleteMenuItem(slug: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api(`/businesses/${slug}/menu-items/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["menuItems", slug] }),
  });
}
