import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface CustomerData {
  id?: string;
  nome: string;
  cpf: string;
  email: string;
  whatsapp: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  cep: string;
  placa: string;
}

interface CustomerContextType {
  customer: CustomerData | null;
  isLoggedIn: boolean;
  loginByPlaca: (placa: string) => Promise<CustomerData | null>;
  createOrUpdateCustomer: (data: CustomerData) => Promise<CustomerData | null>;
  logout: () => void;
}

const CustomerContext = createContext<CustomerContextType | null>(null);

const STORAGE_KEY = "tdcarro-customer";

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<CustomerData | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (customer) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customer));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [customer]);

  const loginByPlaca = useCallback(async (placa: string): Promise<CustomerData | null> => {
    const normalized = placa.toUpperCase().replace(/[^A-Z0-9]/g, "");
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("placa", normalized)
      .maybeSingle();

    if (error || !data) return null;

    const customerData: CustomerData = {
      id: data.id,
      nome: data.nome,
      cpf: data.cpf,
      email: data.email || "",
      whatsapp: data.whatsapp || "",
      endereco: data.endereco || "",
      numero: data.numero || "",
      complemento: data.complemento || "",
      bairro: data.bairro || "",
      cidade: data.cidade || "",
      cep: data.cep || "",
      placa: data.placa,
    };
    setCustomer(customerData);
    return customerData;
  }, []);

  const createOrUpdateCustomer = useCallback(async (data: CustomerData): Promise<CustomerData | null> => {
    const normalized = data.placa.toUpperCase().replace(/[^A-Z0-9]/g, "");
    const payload = { ...data, placa: normalized };
    delete (payload as any).id;

    // Check if customer exists
    const { data: existing } = await supabase
      .from("customers")
      .select("id")
      .eq("placa", normalized)
      .maybeSingle();

    let result;
    if (existing) {
      const { data: updated, error } = await supabase
        .from("customers")
        .update(payload)
        .eq("id", existing.id)
        .select()
        .single();
      if (error) { console.error(error); return null; }
      result = updated;
    } else {
      const { data: created, error } = await supabase
        .from("customers")
        .insert(payload)
        .select()
        .single();
      if (error) { console.error(error); return null; }
      result = created;
    }

    const customerData: CustomerData = {
      id: result.id,
      nome: result.nome,
      cpf: result.cpf,
      email: result.email || "",
      whatsapp: result.whatsapp || "",
      endereco: result.endereco || "",
      numero: result.numero || "",
      complemento: result.complemento || "",
      bairro: result.bairro || "",
      cidade: result.cidade || "",
      cep: result.cep || "",
      placa: result.placa,
    };
    setCustomer(customerData);
    return customerData;
  }, []);

  const logout = useCallback(() => {
    setCustomer(null);
  }, []);

  return (
    <CustomerContext.Provider value={{ customer, isLoggedIn: !!customer, loginByPlaca, createOrUpdateCustomer, logout }}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const ctx = useContext(CustomerContext);
  if (!ctx) throw new Error("useCustomer must be used within CustomerProvider");
  return ctx;
}
