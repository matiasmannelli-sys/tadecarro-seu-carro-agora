import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency } from "@/data/products";
import { ChevronDown, ChevronUp, Package, Clock, DollarSign, ExternalLink, Trash2, Archive, Eye, EyeOff, X } from "lucide-react";

type OrderStatus = "pendente" | "confirmado" | "enviado" | "entregue";
const STATUS_OPTIONS: OrderStatus[] = ["pendente", "confirmado", "enviado", "entregue"];

const STATUS_COLORS: Record<string, string> = {
  pendente: "bg-yellow-500/20 text-yellow-400",
  confirmado: "bg-blue-500/20 text-blue-400",
  enviado: "bg-purple-500/20 text-purple-400",
  entregue: "bg-green-500/20 text-green-400",
  arquivado: "bg-white/10 text-white/40",
};

interface Order {
  id: string;
  created_at: string | null;
  customer_nome: string | null;
  customer_cpf: string | null;
  customer_whatsapp: string | null;
  customer_placa: string | null;
  items: any;
  total: number;
  payment_method: string;
  status: string;
  credit_applied: number;
  pix_excedente: number;
  endereco_entrega: string | null;
  numero: string | null;
  bairro: string | null;
  cidade: string | null;
  cep: string | null;
  complemento: string | null;
  observacoes: string | null;
  customer_email: string | null;
}

const AdminPage = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [storedPassword, setStoredPassword] = useState("");
  const [error, setError] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const [dateFrom, setDateFrom] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().slice(0, 10);
  });
  const [dateTo, setDateTo] = useState(() => new Date().toISOString().slice(0, 10));
  const [dateFilterActive, setDateFilterActive] = useState(true);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const { data, error: fnError } = await supabase.functions.invoke("admin-orders", {
        body: { password, action: "list" },
      });
      if (fnError || data?.error) {
        setError("Senha incorreta");
        setLoading(false);
        return;
      }
      setStoredPassword(password);
      setAuthenticated(true);
      setOrders((data?.orders as Order[]) || []);
    } catch {
      setError("Erro ao conectar");
    }
    setLoading(false);
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await supabase.functions.invoke("admin-orders", {
        body: { password: storedPassword, action: "list" },
      });
      if (data?.orders) setOrders(data.orders as Order[]);
    } catch {}
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const { data } = await supabase.functions.invoke("admin-orders", {
        body: { password: storedPassword, action: "updateStatus", orderId: id, newStatus },
      });
      if (data?.success) {
        setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
      }
    } catch {}
    setUpdatingId(null);
  };

  const deleteOrder = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este pedido?")) return;
    setUpdatingId(id);
    try {
      const { data } = await supabase.functions.invoke("admin-orders", {
        body: { password: storedPassword, action: "delete", orderId: id },
      });
      if (data?.success) {
        setOrders((prev) => prev.filter((o) => o.id !== id));
      }
    } catch {}
    setUpdatingId(null);
  };

  const archiveOrder = async (id: string) => {
    await updateStatus(id, "arquivado");
  };

  const filteredOrders = useMemo(() => {
    let result = orders;
    if (!showArchived) {
      result = result.filter((o) => o.status !== "arquivado");
    }
    if (dateFilterActive && dateFrom && dateTo) {
      const from = new Date(dateFrom + "T00:00:00");
      const to = new Date(dateTo + "T23:59:59");
      result = result.filter((o) => {
        if (!o.created_at) return false;
        const d = new Date(o.created_at);
        return d >= from && d <= to;
      });
    }
    return result;
  }, [orders, showArchived, dateFilterActive, dateFrom, dateTo]);

  const stats = useMemo(() => {
    const total = filteredOrders.length;
    const pendentes = filteredOrders.filter((o) => o.status === "pendente").length;
    const valorTotal = filteredOrders.reduce((s, o) => s + o.total, 0);
    return { total, pendentes, valorTotal };
  }, [filteredOrders]);

  const formatDate = (d: string | null) => {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatWhatsappLink = (phone: string | null) => {
    if (!phone) return null;
    const clean = phone.replace(/\D/g, "");
    return `https://wa.me/${clean.startsWith("55") ? clean : "55" + clean}`;
  };

  const parseItems = (items: any): { name: string; quantity: number; subtotal?: number }[] => {
    try {
      if (Array.isArray(items)) return items;
      if (typeof items === "string") return JSON.parse(items);
      return [];
    } catch {
      return [];
    }
  };

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1a1a1a] px-4">
        <div className="w-full max-w-xs space-y-4 text-center">
          <h1 className="text-xl font-extrabold text-white">Admin TaDeCarro</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Senha"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#E5541C]/50"
          />
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-xl bg-[#E5541C] py-3 text-sm font-bold text-white transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] px-4 py-6">
      <h1 className="mb-4 text-xl font-extrabold text-white">Painel de Pedidos</h1>

      {/* Date filter */}
      <div className="mb-4 rounded-xl border border-white/10 bg-white/5 p-3">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="mb-1 block text-[10px] text-white/50">De</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => { setDateFrom(e.target.value); setDateFilterActive(true); }}
              className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#E5541C]/50"
            />
          </div>
          <div>
            <label className="mb-1 block text-[10px] text-white/50">Até</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => { setDateTo(e.target.value); setDateFilterActive(true); }}
              className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#E5541C]/50"
            />
          </div>
          {dateFilterActive && (
            <button
              onClick={() => setDateFilterActive(false)}
              className="flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1.5 text-[10px] text-white/60 hover:bg-white/20"
            >
              <X className="h-3 w-3" /> Limpar filtro
            </button>
          )}
        </div>
      </div>

      {/* Show archived toggle */}
      <div className="mb-4 flex items-center gap-2">
        <button
          onClick={() => setShowArchived(!showArchived)}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[10px] font-semibold transition-all ${
            showArchived ? "bg-[#E5541C] text-white" : "bg-white/10 text-white/60 hover:bg-white/20"
          }`}
        >
          {showArchived ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
          {showArchived ? "Mostrando arquivados" : "Mostrar arquivados"}
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
          <Package className="mx-auto mb-1 h-5 w-5 text-[#E5541C]" />
          <p className="text-lg font-bold text-white">{stats.total}</p>
          <p className="text-[10px] text-white/50">Total</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
          <Clock className="mx-auto mb-1 h-5 w-5 text-yellow-400" />
          <p className="text-lg font-bold text-white">{stats.pendentes}</p>
          <p className="text-[10px] text-white/50">Pendentes</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
          <DollarSign className="mx-auto mb-1 h-5 w-5 text-green-400" />
          <p className="text-lg font-bold text-white">{formatCurrency(stats.valorTotal)}</p>
          <p className="text-[10px] text-white/50">Faturado</p>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-sm text-white/50">Carregando...</p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-center text-sm text-white/50">Nenhum pedido encontrado.</p>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map((order) => {
            const expanded = expandedId === order.id;
            const items = parseItems(order.items);
            const whatsLink = formatWhatsappLink(order.customer_whatsapp);

            return (
              <div
                key={order.id}
                className="rounded-xl border border-white/10 bg-white/5 overflow-hidden"
              >
                {/* Header */}
                <button
                  onClick={() => setExpandedId(expanded ? null : order.id)}
                  className="flex w-full items-center justify-between p-3 text-left"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-bold text-white">
                        {order.customer_nome || "Sem nome"}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_COLORS[order.status] || "bg-white/10 text-white/60"}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-white/40">
                      {formatDate(order.created_at)} · {formatCurrency(order.total)}
                    </p>
                  </div>
                  {expanded ? (
                    <ChevronUp className="h-4 w-4 text-white/40" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-white/40" />
                  )}
                </button>

                {/* Expanded content */}
                {expanded && (
                  <div className="border-t border-white/10 p-3 space-y-3">
                    {/* Client info */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-white/40">CPF</p>
                        <p className="text-white">{order.customer_cpf || "—"}</p>
                      </div>
                      <div>
                        <p className="text-white/40">Placa</p>
                        <p className="text-white">{order.customer_placa || "—"}</p>
                      </div>
                      <div>
                        <p className="text-white/40">WhatsApp</p>
                        {whatsLink ? (
                          <a
                            href={whatsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[#E5541C] hover:underline"
                          >
                            {order.customer_whatsapp}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          <p className="text-white">—</p>
                        )}
                      </div>
                      <div>
                        <p className="text-white/40">E-mail</p>
                        <p className="text-white truncate">{order.customer_email || "—"}</p>
                      </div>
                    </div>

                    {/* Address */}
                    {order.endereco_entrega && (
                      <div className="text-xs">
                        <p className="text-white/40">Endereço</p>
                        <p className="text-white">
                          {order.endereco_entrega}, {order.numero}
                          {order.complemento ? ` - ${order.complemento}` : ""} · {order.bairro}, {order.cidade} · CEP {order.cep}
                        </p>
                      </div>
                    )}

                    {/* Items */}
                    <div className="text-xs">
                      <p className="mb-1 text-white/40">Itens</p>
                      {items.map((item, i) => (
                        <div key={i} className="flex justify-between text-white">
                          <span>{item.quantity}x {item.name}</span>
                          {item.subtotal != null && <span>{formatCurrency(item.subtotal)}</span>}
                        </div>
                      ))}
                    </div>

                    {/* Payment */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-white/40">Método</p>
                        <p className="text-white">{order.payment_method}</p>
                      </div>
                      <div>
                        <p className="text-white/40">Total</p>
                        <p className="font-bold text-[#E5541C]">{formatCurrency(order.total)}</p>
                      </div>
                      {order.pix_excedente > 0 && (
                        <div>
                          <p className="text-white/40">Pix excedente</p>
                          <p className="text-white">{formatCurrency(order.pix_excedente)}</p>
                        </div>
                      )}
                    </div>

                    {order.observacoes && (
                      <div className="text-xs">
                        <p className="text-white/40">Observações</p>
                        <p className="text-white">{order.observacoes}</p>
                      </div>
                    )}

                    {/* Status change */}
                    <div>
                      <p className="mb-1.5 text-[10px] text-white/40">Alterar status</p>
                      <div className="flex flex-wrap gap-1.5">
                        {STATUS_OPTIONS.map((s) => (
                          <button
                            key={s}
                            disabled={order.status === s || updatingId === order.id}
                            onClick={() => updateStatus(order.id, s)}
                            className={`rounded-lg px-2.5 py-1 text-[10px] font-semibold transition-all ${
                              order.status === s
                                ? "bg-[#E5541C] text-white"
                                : "bg-white/10 text-white/60 hover:bg-white/20"
                            } disabled:opacity-40`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Actions: archive & delete */}
                    <div className="flex gap-2 pt-1 border-t border-white/10">
                      {order.status !== "arquivado" && (
                        <button
                          onClick={() => archiveOrder(order.id)}
                          disabled={updatingId === order.id}
                          className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white/60 hover:bg-white/20 disabled:opacity-40"
                        >
                          <Archive className="h-3 w-3" /> Esconder
                        </button>
                      )}
                      <button
                        onClick={() => deleteOrder(order.id)}
                        disabled={updatingId === order.id}
                        className="flex items-center gap-1.5 rounded-lg bg-red-500/10 px-3 py-1.5 text-[10px] font-semibold text-red-400 hover:bg-red-500/20 disabled:opacity-40"
                      >
                        <Trash2 className="h-3 w-3" /> Excluir
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
