"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";

export interface BusinessTheme {
  id: string;
  primaryColor: string;
  accentColor: string;
  bgColor: string;
  cardBgColor: string;
  textColor: string;
  mutedTextColor: string;
  borderColor: string;
  fontHeading: string;
  fontBody: string;
  layoutType: string;
  heroImage: string | null;
  logo: string | null;
  customCSS: string | null;
}

export function useTheme(slug: string) {
  return useQuery({
    queryKey: ["theme", slug],
    queryFn: () => api<BusinessTheme>(`/businesses/${slug}/theme`),
    enabled: !!slug,
  });
}

export function useUpdateTheme(slug: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<BusinessTheme>) =>
      api(`/businesses/${slug}/theme`, { method: "PUT", body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["theme", slug] }),
  });
}
