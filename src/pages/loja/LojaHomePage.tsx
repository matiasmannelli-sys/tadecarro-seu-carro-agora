import HeroSection from "@/components/loja/HeroSection";
import HowItWorks from "@/components/loja/HowItWorks";
import ProductCard from "@/components/loja/ProductCard";
import CreditBar from "@/components/loja/CreditBar";
import { products, categories } from "@/data/products";
import { useState } from "react";

const LojaHomePage = () => {
  const [activeCategory, setActiveCategory] = useState("todos");

  const filtered =
    activeCategory === "todos"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <>
      <HeroSection />
      <HowItWorks />

      {/* Products section */}
      <section id="produtos" className="bg-[#090A2E] py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4">
            <CreditBar compact />
          </div>

          <h2 className="text-lg font-extrabold text-[#F6F5F3] mb-1">
            Escolha seus produtos
          </h2>
          <p className="text-xs text-[#F6F5F3]/40 mb-5">
            Use seu limite para equipar sua casa do jeito que merece.
          </p>

          {/* Category filter */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-5 scrollbar-hide -mx-4 px-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition-all active:scale-95 ${
                  activeCategory === cat.id
                    ? "bg-[#E5541C] text-white"
                    : "bg-white/5 text-[#F6F5F3]/60 hover:bg-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-[#F6F5F3]/40">Nenhum produto nesta categoria.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA bottom */}
      <section className="bg-[#2D2774] py-10 px-4 text-center">
        <h2 className="text-xl font-extrabold text-[#F6F5F3] mb-2">
          Seu crédito, sua <span className="text-[#E5541C]">conquista</span>
        </h2>
        <p className="text-xs text-[#F6F5F3]/50 mb-5 max-w-sm mx-auto">
          Mais facilidade para conquistar o que você precisa. Escolha hoje com o limite que já está disponível.
        </p>
        <button
          onClick={() => document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" })}
          className="bg-[#E5541C] hover:bg-[#E5541C]/90 text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all active:scale-95 shadow-lg shadow-[#E5541C]/25"
        >
          Usar meu limite agora
        </button>
      </section>
    </>
  );
};

export default LojaHomePage;
