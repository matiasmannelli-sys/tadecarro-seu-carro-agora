import imgGeladeira from "@/assets/product-geladeira.png";
import imgFogao from "@/assets/product-fogao.png";
import imgMicroondas from "@/assets/product-microondas.png";
import imgAirfryer from "@/assets/product-airfryer.png";
import imgChurrasqueira from "@/assets/product-churrasqueira.png";
import imgLavaLoucas from "@/assets/product-lava-loucas.png";
import imgTv from "@/assets/product-tv.png";
import imgMaquinaLavar from "@/assets/product-maquina-lavar.png";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  installments: number;
  category: string;
  image: string;
  available: boolean;
  deliveryDays: number;
}

export const categories = [
  { id: "todos", label: "Todos" },
  { id: "refrigeracao", label: "Refrigeração" },
  { id: "cozinha", label: "Cozinha" },
  { id: "lavanderia", label: "Lavanderia" },
  { id: "eletronicos", label: "Eletrônicos" },
  { id: "pequenos", label: "Pequenos Eletros" },
];

export const products: Product[] = [
  {
    id: "geladeira-300l",
    name: "Geladeira Britânia 300L Frost Free",
    description: "Geladeira espaçosa com tecnologia Frost Free, ideal para famílias. Compartimentos organizados, gaveta de frutas e legumes, prateleiras removíveis e eficiência energética classe A.",
    price: 1899,
    installments: 24,
    category: "refrigeracao",
    image: imgGeladeira,
    available: true,
    deliveryDays: 7,
  },
  {
    id: "fogao-4bocas",
    name: "Fogão Britânia 4 Bocas Inox",
    description: "Fogão com 4 bocas, acendimento automático, forno com grill e acabamento em inox. Tampa de vidro temperado e grades removíveis para fácil limpeza.",
    price: 849,
    installments: 24,
    category: "cozinha",
    image: imgFogao,
    available: true,
    deliveryDays: 5,
  },
  {
    id: "microondas-30l",
    name: "Micro-ondas Britânia 30L",
    description: "Micro-ondas com 30 litros de capacidade, painel digital, 10 níveis de potência e função descongelar. Design compacto e moderno.",
    price: 529,
    installments: 24,
    category: "cozinha",
    image: imgMicroondas,
    available: true,
    deliveryDays: 4,
  },
  {
    id: "airfryer-4l",
    name: "Air Fryer Britânia 4L Digital",
    description: "Air Fryer com capacidade de 4 litros, painel digital touch, timer programável e 8 funções pré-definidas. Cozinhe com até 80% menos óleo.",
    price: 429,
    installments: 24,
    category: "pequenos",
    image: imgAirfryer,
    available: true,
    deliveryDays: 3,
  },
  {
    id: "churrasqueira-eletrica",
    name: "Churrasqueira Elétrica Britânia",
    description: "Churrasqueira elétrica com grelha antiaderente, bandeja coletora de gordura e controle de temperatura. Perfeita para churrascos sem fumaça.",
    price: 379,
    installments: 24,
    category: "pequenos",
    image: imgChurrasqueira,
    available: true,
    deliveryDays: 3,
  },
  {
    id: "lava-loucas",
    name: "Lava-louças Britânia 8 Serviços",
    description: "Lava-louças compacta com capacidade para 8 serviços, 6 programas de lavagem, economia de água e energia. Instalação simples.",
    price: 1299,
    installments: 24,
    category: "cozinha",
    image: imgLavaLoucas,
    available: true,
    deliveryDays: 7,
  },
  {
    id: "smart-tv-42",
    name: 'Smart TV 42" Multilaser Full HD',
    description: 'Smart TV de 42 polegadas com resolução Full HD, sistema Android TV, Wi-Fi integrado, 3 entradas HDMI e 2 USB. Acesse Netflix, YouTube e mais.',
    price: 1599,
    installments: 24,
    category: "eletronicos",
    image: imgTv,
    available: true,
    deliveryDays: 5,
  },
  {
    id: "maquina-lavar-11kg",
    name: "Máquina de Lavar Britânia 11kg",
    description: "Máquina de lavar com capacidade de 11kg, 15 programas de lavagem, centrifugação eficiente e sistema de economia de água. Painel digital intuitivo.",
    price: 1399,
    installments: 24,
    category: "lavanderia",
    image: imgMaquinaLavar,
    available: true,
    deliveryDays: 7,
  },
];

export function getInstallmentPrice(price: number, installments: number): number {
  return Math.ceil((price / installments) * 100) / 100;
}

export function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
