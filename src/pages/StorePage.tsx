import { ShoppingBag, MessageCircle } from "lucide-react";
import { useState } from "react";

import imgGeladeira from "@/assets/product-geladeira.png";
import imgFogao from "@/assets/product-fogao.png";
import imgMicroondas from "@/assets/product-microondas.png";
import imgAirfryer from "@/assets/product-airfryer.png";
import imgChurrasqueira from "@/assets/product-churrasqueira.png";
import imgLavaLoucas from "@/assets/product-lava-loucas.png";
import imgTv from "@/assets/product-tv.png";
import imgMaquinaLavar from "@/assets/product-maquina-lavar.png";
import imgKwid from "@/assets/car-kwid.png";
import imgArgo from "@/assets/car-argo.png";

const WHATSAPP_URL = "https://wa.me/qr/FEIURWZ6B4QSG1";
const CLIENT_NAME = "João Silva";
const CONTRACT = "#1042";

const products = [
  { name: "Geladeira Britânia 300L", price: "R$ 1.800", installment: "24x de R$ 99", img: imgGeladeira },
  { name: "Fogão Britânia 4 bocas", price: "R$ 800", installment: "24x de R$ 44", img: imgFogao },
  { name: "Micro-ondas Britânia 30L", price: "R$ 500", installment: "24x de R$ 28", img: imgMicroondas },
  { name: "Air Fryer Britânia 4L", price: "R$ 400", installment: "24x de R$ 22", img: imgAirfryer },
  { name: "Churrasqueira Britânia", price: "R$ 350", installment: "24x de R$ 19", img: imgChurrasqueira },
  { name: "Lava-louças Britânia", price: "R$ 1.200", installment: "24x de R$ 66", img: imgLavaLoucas },
  { name: "Smart TV 42\" Multilaser", price: "R$ 1.500", installment: "24x de R$ 83", img: imgTv },
  { name: "Máquina de lavar Britânia 11kg", price: "R$ 1.300", installment: "24x de R$ 72", img: imgMaquinaLavar },
];

const carCategories = [
  { name: "Uber X", price: "R$ 875/semana", models: "Kwid ou Uno", img: imgKwid },
  { name: "Confort", price: "R$ 990/semana", models: "Argo ou Peugeot 208", img: imgArgo },
];

type Tab = "crediario" | "carros";

const StorePage = () => {
  const [tab, setTab] = useState<Tab>("crediario");
  const availableCredit = 5000;

  const openWA = () => {
    window.open(WHATSAPP_URL, "_blank");
  };

  return (
    <div className="px-4 py-4">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingBag className="w-5 h-5 text-brand" />
        <h1 className="text-lg font-bold text-foreground">Loja</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab("crediario")}
          className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-colors active:scale-[0.97] ${
            tab === "crediario" ? "brand-gradient text-primary-foreground" : "bg-secondary text-foreground"
          }`}
        >
          🏪 Crediário
        </button>
        <button
          onClick={() => setTab("carros")}
          className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-colors active:scale-[0.97] ${
            tab === "carros" ? "brand-gradient text-primary-foreground" : "bg-secondary text-foreground"
          }`}
        >
          Carros
        </button>
      </div>

      {tab === "crediario" && (
        <>
          <div className="glass-card p-4 mb-4 border-brand/30 text-center">
            <p className="text-xs text-muted-foreground mb-1">Seu crédito disponível</p>
            <p className="text-2xl font-bold text-brand">R$ {availableCredit.toLocaleString("pt-BR")}</p>
            <p className="text-[10px] text-muted-foreground mt-1">Parcele em até 24x direto no seu contrato</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => (
              <div key={product.name} className="glass-card p-4 flex flex-col items-center text-center gap-2">
                <img src={product.img} alt={product.name} className="w-20 h-20 object-contain rounded-lg" />
                <h3 className="text-xs font-medium text-foreground leading-tight">{product.name}</h3>
                <span className="text-[10px] text-muted-foreground line-through">{product.price}</span>
                <span className="text-xs text-brand font-semibold">{product.installment}</span>
                <button
                  onClick={() => openWA()}
                  className="w-full mt-1 py-1.5 text-[11px] font-medium rounded-lg brand-gradient text-primary-foreground active:scale-95 transition-transform flex items-center justify-center gap-1"
                  className="w-full mt-1 py-1.5 text-[11px] font-medium rounded-lg brand-gradient text-primary-foreground active:scale-95 transition-transform flex items-center justify-center gap-1"
                >
                  <MessageCircle className="w-3 h-3" />
                  Quero este produto
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "carros" && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground mb-2">Quer mudar de categoria?</p>
          {carCategories.map((cat) => (
            <div key={cat.name} className="glass-card p-4">
              <div className="flex items-center gap-4 mb-3">
                <img src={cat.img} alt={cat.name} className="w-28 h-auto object-contain rounded-lg" />
                <div>
                  <h3 className="text-base font-bold text-foreground">{cat.name}</h3>
                  <span className="text-sm font-bold text-brand">{cat.price}</span>
                  <p className="text-xs text-muted-foreground">Modelos: {cat.models}</p>
                </div>
              </div>
              <button
                onClick={() => openWA()}
                className="w-full py-2.5 text-xs font-medium rounded-xl bg-secondary text-foreground border border-border active:scale-95 transition-transform flex items-center justify-center gap-1"
              >
                <MessageCircle className="w-3 h-3" />
                Solicitar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StorePage;
