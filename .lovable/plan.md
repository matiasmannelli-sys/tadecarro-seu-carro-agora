

## Plan

This request combines 4 groups of changes. Items 1-5 (prices, installments, weekly format) are **already implemented** from the previous edit. The remaining work covers: visual card redesign, admin panel enhancements, and "em 104 semanas" labels.

---

### A. Visual Changes — Product Cards & Images

**Files:** `src/components/loja/ProductCard.tsx`, `src/index.css`, `src/pages/loja/ProdutoPage.tsx`, `src/pages/loja/CarrinhoPage.tsx`

1. **Off-white card backgrounds**: Change ProductCard wrapper from `bg-card/70` to `bg-[#F5F3EF]` with dark text (`text-gray-900`) for name, price, SKU. The outer page background stays dark.

2. **Contextual image backgrounds**: Replace the current dark `product-surface--*` CSS variables with environment-themed warm tones:
   - TVs: `hsl(220, 15%, 85%)` — sala/escritório cool gray
   - Ar-condicionado: `hsl(200, 20%, 88%)` — parede/quarto soft blue
   - Cooktops/forno/airfryers: `hsl(30, 20%, 85%)` — cozinha warm beige
   - Geladeiras/freezers/lava-louças: `hsl(35, 15%, 87%)` — cozinha light cream
   - Ferramentas: `hsl(40, 12%, 80%)` — garagem/oficina sandy

3. **Image filter**: Add `filter: contrast(1.1) saturate(1.1)` to product images via a CSS class or inline style on `<img>` elements in ProductCard, ProdutoPage, and CarrinhoPage.

---

### B. Admin Panel Enhancements

**Files:** `supabase/functions/admin-orders/index.ts`, `src/pages/AdminPage.tsx`

1. **Delete order**: Add `action: "delete"` to edge function — deletes from `orders` table by `orderId`. AdminPage gets a red trash icon per card with confirmation dialog (`window.confirm`).

2. **Archive order**: Add `action: "archive"` — sets status to `"arquivado"`. Add `"arquivado"` to valid statuses. AdminPage gets a "Esconder" button and a "Mostrar arquivados" toggle at the top. Default listing filters out `arquivado` orders unless toggle is on.

3. **Date filter**: Add two date inputs (de/até) at the top. Default: last 30 days. Filter is applied client-side on `created_at`. "Limpar filtro" button resets to show all.

4. **Edge function changes**: Update `admin-orders` to support `delete` action (using `.delete().eq("id", orderId)`) and allow `"arquivado"` as valid status.

5. **DB migration**: None needed — status is a text field, no enum constraint.

---

### C. "em 104 semanas" Labels

**Files:** `src/components/loja/ProductCard.tsx`, `src/pages/loja/ProdutoPage.tsx`, `src/pages/loja/CarrinhoPage.tsx`, `src/pages/loja/CheckoutPage.tsx`

Add a small muted line under every weekly price display:

- **ProductCard**: Below `formatWeekly(product.price)`, add `<span className="text-[9px] text-muted-foreground">em 104 semanas</span>` (will use dark muted since card is now light)
- **ProdutoPage**: Below the weekly price in the pricing card, add "em 104 semanas"
- **CarrinhoPage**: Each item line: change to `{formatWeekly(price*qty)} × 104 sem`. Summary total: "por 104 semanas" after the weekly value
- **CheckoutPage**: In order summary, add "104 semanas de {weekly}/sem" below total

---

### Technical Details

- Product card text colors need explicit dark overrides (`text-gray-800`, `text-gray-500`) since the card background changes to light while the page remains dark-themed
- The ProductCard add/quantity buttons should keep their current primary/secondary colors (they work on both light and dark)
- Edge function delete uses `supabase.from("orders").delete().eq("id", orderId)` with service_role
- Date filter is client-side only — no backend changes needed for filtering

