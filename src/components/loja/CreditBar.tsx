import { useCart } from "@/contexts/CartContext";
import { formatCurrency } from "@/data/products";

const CreditBar = ({ compact = false }: { compact?: boolean }) => {
  const { totalCredit, creditUsed, creditRemaining } = useCart();
  const usedPercent = Math.min((creditUsed / totalCredit) * 100, 100);

  if (compact) {
    return (
      <div className="flex items-center gap-3 bg-[#2D2774]/40 rounded-xl px-4 py-2.5">
        <div className="flex-1">
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#E5541C] transition-all duration-500"
              style={{ width: `${usedPercent}%` }}
            />
          </div>
        </div>
        <span className="text-sm font-semibold text-[#F6F5F3] whitespace-nowrap">
          {formatCurrency(creditRemaining)} <span className="text-[#F6F5F3]/50 font-normal">disponível</span>
        </span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#2D2774] to-[#090A2E] rounded-2xl p-5 border border-white/10">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-[#F6F5F3]/60 uppercase tracking-wider">Seu limite</span>
        <span className="text-xs text-[#F6F5F3]/40">
          {formatCurrency(creditUsed)} utilizado
        </span>
      </div>
      <div className="text-3xl font-extrabold text-[#E5541C] mb-3">
        {formatCurrency(creditRemaining)}
        <span className="text-sm font-medium text-[#F6F5F3]/50 ml-2">disponível</span>
      </div>
      <div className="h-2.5 rounded-full bg-white/10 overflow-hidden mb-2">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#E5541C] to-[#E5541C]/70 transition-all duration-500"
          style={{ width: `${usedPercent}%` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-[#F6F5F3]/40">
        <span>Limite total: {formatCurrency(totalCredit)}</span>
        <span>{(100 - usedPercent).toFixed(0)}% livre</span>
      </div>
    </div>
  );
};

export default CreditBar;
