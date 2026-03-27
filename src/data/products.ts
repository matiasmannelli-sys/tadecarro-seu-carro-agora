import imgTv40 from "@/assets/product-tv.png";
import imgTv50 from "@/assets/product-tv-50.png";
import imgArCondicionado from "@/assets/product-ar-condicionado.png";
import imgCooktop2 from "@/assets/product-cooktop-2bocas.png";
import imgCooktop4 from "@/assets/product-cooktop-4bocas.png";
import imgFreezer100 from "@/assets/product-freezer.png";
import imgFreezer400 from "@/assets/product-freezer-400l.png";
import imgAirfryerOven from "@/assets/product-airfryer-oven.png";
import imgAirfryer7l from "@/assets/product-airfryer.png";
import imgGeladeiraBranca from "@/assets/product-geladeira.png";
import imgGeladeiraCinza from "@/assets/product-geladeira-cinza.png";
import imgGeladeiraSBS from "@/assets/product-geladeira-sbs.png";
import imgLavaLoucas from "@/assets/product-lava-loucas.png";
import imgKitChave from "@/assets/product-kit-chave.png";
import imgMacaco from "@/assets/product-macaco.png";
import imgEscada from "@/assets/product-escada.png";
import imgFornoEletrico from "@/assets/product-forno-eletrico.png";

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  installments: number;
  category: string;
  brand: string;
  voltage?: string;
  image: string;
  available: boolean;
  deliveryDays: number;
  pending?: boolean;
}

export const categories = [
  { id: "todos", label: "Todos" },
  { id: "tvs", label: "TVs" },
  { id: "ar-condicionado", label: "Ar-condicionado" },
  { id: "geladeiras", label: "Geladeiras" },
  { id: "freezers", label: "Freezers" },
  { id: "cooktops", label: "Cooktops e Cozinha" },
  { id: "airfryers", label: "Airfryers e Eletroportáteis" },
  { id: "lava-loucas", label: "Lava-louças" },
  { id: "ferramentas", label: "Ferramentas" },
];

export const products: Product[] = [
  // TVs
  {
    id: "tv-40-hq",
    sku: "88335",
    name: 'Smart TV HQ 40" Full HD',
    description: 'Smart TV HQ 40 polegadas Full HD, tela sem bordas, sistema Android 12, design slim. Acesse seus apps favoritos como Netflix, YouTube e muito mais.',
    price: 1043.37,
    installments: 24,
    category: "tvs",
    brand: "HQ",
    image: imgTv40,
    available: true,
    deliveryDays: 7,
  },
  {
    id: "tv-50-hq",
    sku: "84047",
    name: 'Smart TV HQ 50" UHD',
    description: 'Smart TV HQ 50 polegadas UHD 4K, tela sem bordas, sistema Android, design moderno. Imagem nítida e vibrante para toda a família.',
    price: 1554.93,
    installments: 24,
    category: "tvs",
    brand: "HQ",
    image: imgTv50,
    available: true,
    deliveryDays: 7,
  },

  // Ar-condicionado
  {
    id: "ar-split-12000",
    sku: "94681",
    name: "Ar-condicionado Split HQ 12.000 BTU/h Frio",
    description: "Ar-condicionado Split HQ Hi Wall 12.000 BTU/h, frio, monofásico, branco. Economia de energia e conforto térmico para seu ambiente. 220V.",
    price: 1665.77,
    installments: 24,
    category: "ar-condicionado",
    brand: "HQ",
    voltage: "220V",
    image: imgArCondicionado,
    available: true,
    deliveryDays: 10,
  },

  // Cooktops
  {
    id: "cooktop-2bocas",
    sku: "82990",
    name: "Cooktop Indução HQ 2 Bocas",
    description: "Cooktop de indução embutir HQ 2 bocas, painel touch, 3500W, preto. Cozinha rápida, segura e econômica. 220V.",
    price: 637.87,
    installments: 24,
    category: "cooktops",
    brand: "HQ",
    voltage: "220V",
    image: imgCooktop2,
    available: true,
    deliveryDays: 5,
  },
  {
    id: "cooktop-4bocas",
    sku: "82991",
    name: "Cooktop Indução HQ 4 Bocas Free Zone",
    description: "Cooktop de indução embutir HQ 4 bocas, painel touch, Free Zone, 7000W, preto. Versatilidade total na cozinha. 220V.",
    price: 1123.98,
    installments: 24,
    category: "cooktops",
    brand: "HQ",
    voltage: "220V",
    image: imgCooktop4,
    available: true,
    deliveryDays: 5,
  },
  {
    id: "forno-eletrico-38l",
    sku: "78352",
    name: "Forno Elétrico HQ 38 Litros",
    description: "Forno elétrico HQ 38 litros, 1600W, preto. Ideal para assar, gratinar e aquecer com praticidade.",
    price: 325.56,
    installments: 24,
    category: "cooktops",
    brand: "HQ",
    image: imgFornoEletrico,
    available: true,
    deliveryDays: 4,
  },

  // Freezers
  {
    id: "freezer-100l",
    sku: "95556",
    name: "Freezer Horizontal HQ 100L",
    description: "Freezer e conservador horizontal HQ 100 litros, branco. Compacto e eficiente para armazenar alimentos congelados.",
    price: 1057.92,
    installments: 24,
    category: "freezers",
    brand: "HQ",
    image: imgFreezer100,
    available: true,
    deliveryDays: 7,
  },
  {
    id: "freezer-400l",
    sku: "95575",
    name: "Freezer Horizontal HQ 2 Portas 400L",
    description: "Freezer e conservador horizontal HQ 2 portas, 400 litros, branco. Amplo espaço para grandes armazenamentos.",
    price: 2452.88,
    installments: 24,
    category: "freezers",
    brand: "HQ",
    image: imgFreezer400,
    available: true,
    deliveryDays: 10,
  },

  // Airfryers
  {
    id: "airfryer-oven-12l",
    sku: "79846",
    name: "Air Fryer Oven HQ 12L 1700W",
    description: "Air Fryer Oven HQ 12 litros, 1700W, preto. Frita, assa, gratina e desidrata com pouco ou nenhum óleo. 220V.",
    price: 415.68,
    installments: 24,
    category: "airfryers",
    brand: "HQ",
    voltage: "220V",
    image: imgAirfryerOven,
    available: true,
    deliveryDays: 4,
  },
  {
    id: "airfryer-7l-digital",
    sku: "84430",
    name: "Airfryer HQ 7L Digital com Visor",
    description: "Fritadeira elétrica sem óleo Airfryer HQ 7 litros, digital com visor, preta. Praticidade e saúde para o dia a dia. 220V.",
    price: 235.43,
    installments: 24,
    category: "airfryers",
    brand: "HQ",
    voltage: "220V",
    image: imgAirfryer7l,
    available: true,
    deliveryDays: 3,
  },

  // Geladeiras
  {
    id: "geladeira-230l-branca",
    sku: "82110",
    name: "Geladeira HQ Defrost 230L Branca",
    description: "Geladeira Refrigerador HQ Defrost 230 litros, branca. Espaçosa, econômica e prática para o dia a dia. 220V.",
    price: 1471.26,
    installments: 24,
    category: "geladeiras",
    brand: "HQ",
    voltage: "220V",
    image: imgGeladeiraBranca,
    available: true,
    deliveryDays: 7,
  },
  {
    id: "geladeira-230l-cinza",
    sku: "83771",
    name: "Geladeira HQ Defrost 230L Cinza",
    description: "Geladeira Refrigerador HQ Defrost 230 litros, cinza. Design moderno com a mesma eficiência e praticidade. 220V.",
    price: 1471.25,
    installments: 24,
    category: "geladeiras",
    brand: "HQ",
    voltage: "220V",
    image: imgGeladeiraCinza,
    available: true,
    deliveryDays: 7,
  },
  {
    id: "geladeira-sbs-460l",
    sku: "83618",
    name: "Geladeira HQ Frost Free Side by Side 460L Cinza",
    description: "Geladeira Refrigerador HQ Frost Free Side by Side 460 litros, cinza. ⚠️ Apenas 127V disponível — pendente validação para 220V.",
    price: 2803.46,
    installments: 24,
    category: "geladeiras",
    brand: "HQ",
    voltage: "127V",
    image: imgGeladeiraSBS,
    available: false,
    pending: true,
    deliveryDays: 10,
  },

  // Lava-louças
  {
    id: "lava-loucas-6-servicos",
    sku: "84368",
    name: "Lava-louças HQ Digital 6 Serviços",
    description: "Lava-louças HQ digital para 6 serviços, branca. Economia de água e praticidade na cozinha. 220V.",
    price: 1642.05,
    installments: 24,
    category: "lava-loucas",
    brand: "HQ",
    voltage: "220V",
    image: imgLavaLoucas,
    available: true,
    deliveryDays: 7,
  },

  // Ferramentas
  {
    id: "kit-chave-catraca-57",
    sku: "77268",
    name: "Kit Maleta Jogo de Chave Catraca 57 Peças FORTT",
    description: "Kit maleta completo com jogo de chave catraca, 57 peças, preto. Tudo que você precisa para reparos e manutenções.",
    price: 132.65,
    installments: 24,
    category: "ferramentas",
    brand: "FORTT",
    image: imgKitChave,
    available: true,
    deliveryDays: 3,
  },
  {
    id: "macaco-hidraulico-3t",
    sku: "79507",
    name: "Macaco Hidráulico Tipo Garrafa 3T FORTT",
    description: "Macaco hidráulico tipo garrafa, capacidade 3 toneladas, vermelho. Essencial para emergências e trocas de pneu.",
    price: 68.33,
    installments: 24,
    category: "ferramentas",
    brand: "FORTT",
    image: imgMacaco,
    available: true,
    deliveryDays: 3,
  },
  {
    id: "escada-telescopica-2-6m",
    sku: "79497",
    name: "Escada Telescópica Alumínio FORTT 2,6m",
    description: "Escada telescópica em alumínio, 2,6 metros, 9 degraus. Leve, compacta quando fechada e resistente. Ideal para casa e trabalho.",
    price: 355.61,
    installments: 24,
    category: "ferramentas",
    brand: "FORTT",
    image: imgEscada,
    available: true,
    deliveryDays: 5,
  },
];

export function getInstallmentPrice(price: number, installments: number): number {
  return Math.ceil((price / installments) * 100) / 100;
}

export function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
