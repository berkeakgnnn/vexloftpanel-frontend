"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";

export interface Business {
  id: string;
  name: string;
  slug: string;
  template: string;
  isActive: boolean;
  ownerId: string;
  owner?: { name: string; email: string };
  _count?: { categories: number; menuItems: number };
}

export function useBusinesses() {
  return useQuery({
    queryKey: ["businesses"],
    queryFn: () => api<Business[]>("/businesses"),
  });
}

export function useBusiness(slug: string) {
  return useQuery({
    queryKey: ["business", slug],
    queryFn: () => api<Business>(`/businesses/${slug}`),
    enabled: !!slug,
  });
}

export function useUpdateBusiness(slug: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Business>) =>
      api(`/businesses/${slug}`, { method: "PUT", body: JSON.stringify(data) }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["business", slug] });
      qc.invalidateQueries({ queryKey: ["businesses"] });
    },
  });
}

export function useDeleteBusiness(slug: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => api(`/businesses/${slug}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["businesses"] }),
  });
}

export function useCreateBusiness() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string; slug: string; template: string; ownerId: string }) =>
      api<Business>("/businesses", { method: "POST", body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["businesses"] }),
  });
}
