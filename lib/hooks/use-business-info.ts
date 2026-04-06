"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";

export interface BusinessInfo {
  id: string;
  tagline: string | null;
  established: string | null;
  locationTr: string;
  locationEn: string;
  hoursTr: string;
  hoursEn: string;
  phone: string | null;
  website: string | null;
  instagram: string | null;
}

export function useBusinessInfo(slug: string) {
  return useQuery({
    queryKey: ["businessInfo", slug],
    queryFn: () => api<BusinessInfo>(`/businesses/${slug}/info`),
    enabled: !!slug,
  });
}

export function useUpdateBusinessInfo(slug: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<BusinessInfo>) =>
      api(`/businesses/${slug}/info`, { method: "PUT", body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["businessInfo", slug] }),
  });
}
