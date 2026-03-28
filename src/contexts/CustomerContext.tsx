import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

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
  session: Session | null;
  isLoggedIn: boolean;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  createOrUpdateCustomer: (data: CustomerData) => Promise<CustomerData | null>;
  logout: () => Promise<void>;
}

const CustomerContext = createContext<CustomerContextType | null>(null);

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        setCustomer(null);
        setLoading(false);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // When session changes, fetch customer data
  useEffect(() => {
    if (!session?.user) return;

    const fetchCustomer = async () => {
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (!error && data) {
        setCustomer({
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
        });
      }
      setLoading(false);
    };

    fetchCustomer();
  }, [session?.user?.id]);

  const signUp = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin },
    });
    if (error) return { error: error.message };
    return { error: null };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { error: null };
  }, []);

  const createOrUpdateCustomer = useCallback(async (data: CustomerData): Promise<CustomerData | null> => {
    if (!session?.user) return null;

    const normalized = data.placa.toUpperCase().replace(/[^A-Z0-9]/g, "");
    const payload = {
      nome: data.nome,
      cpf: data.cpf,
      email: data.email,
      whatsapp: data.whatsapp,
      endereco: data.endereco,
      numero: data.numero,
      complemento: data.complemento,
      bairro: data.bairro,
      cidade: data.cidade,
      cep: data.cep,
      placa: normalized,
      user_id: session.user.id,
    };

    // Check if customer exists for this user
    const { data: existing } = await supabase
      .from("customers")
      .select("id")
      .eq("user_id", session.user.id)
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
  }, [session?.user]);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setCustomer(null);
  }, []);

  return (
    <CustomerContext.Provider value={{ customer, session, isLoggedIn: !!session, loading, signUp, signIn, createOrUpdateCustomer, logout }}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const ctx = useContext(CustomerContext);
  if (!ctx) throw new Error("useCustomer must be used within CustomerProvider");
  return ctx;
}
