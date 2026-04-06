"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";

export interface Category {
  id: string;
  nameTr: string;
  nameEn: string;
  slug: string;
  banner: string | null;
  sortOrder: number;
  layout: string;
  isActive: boolean;
  _count?: { items: number };
}

export function useCategories(slug: string) {
  return useQuery({
    queryKey: ["categories", slug],
    queryFn: () => api<Category[]>(`/businesses/${slug}/categories`),
    enabled: !!slug,
  });
}

export function useCreateCategory(slug: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { nameTr: string; nameEn: string; layout?: string }) =>
      api(`/businesses/${slug}/categories`, { method: "POST", body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories", slug] }),
  });
}

export function useUpdateCategory(slug: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string; [key: string]: unknown }) =>
      api(`/businesses/${slug}/categories/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories", slug] }),
  });
}

export function useDeleteCategory(slug: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api(`/businesses/${slug}/categories/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories", slug] }),
  });
}

export function useReorderCategories(slug: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (items: { id: string; sortOrder: number }[]) =>
      api(`/businesses/${slug}/categories/reorder`, { method: "PUT", body: JSON.stringify(items) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories", slug] }),
  });
}
