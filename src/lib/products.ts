import penImg from "@/assets/product-pen.jpg";
import boxImg from "@/assets/product-box.jpg";

export type Product = {
  id: string;
  name: string;
  dose: string;
  description: string;
  longDescription: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: string;
  inStock: boolean;
};

export const PRODUCTS: Product[] = [
  {
    id: "monjaro-2-5",
    name: "Mounjaro 2,5 mg Tirzepatida",
    dose: "Dose inicial",
    description: "Caneta KwikPen com 4 doses injetáveis semanais. Ideal para iniciar o tratamento.",
    longDescription:
      "Mounjaro 2,5 mg Tirzepatida com 4 doses injetáveis. Medicamento injetável utilizado no tratamento do diabetes tipo 2 e auxiliar no controle do peso. Princípio ativo: tirzepatida. Fabricante: Eli Lilly. VENDA LIMITADA A DUAS UNIDADES POR CLIENTE.",
    price: 210.99,
    oldPrice: 1754.96,
    image: penImg,
    badge: "Mais procurado",
    inStock: true,
  },
  {
    id: "monjaro-5",
    name: "Mounjaro 5 mg Tirzepatida",
    dose: "Manutenção inicial",
    description: "Dose terapêutica padrão após adaptação. Caneta com 4 doses injetáveis.",
    longDescription:
      "Mounjaro 5 mg Tirzepatida com 4 Doses Injetáveis. Primeira dose de manutenção, indicada após 4 semanas de uso da dose inicial de 2,5 mg. Caneta KwikPen original Eli Lilly. Tratamento adjuvante para diabetes tipo 2.",
    price: 210.99,
    oldPrice: 2193.91,
    image: boxImg,
    inStock: true,
  },
  {
    id: "monjaro-7-5",
    name: "Mounjaro 7,5 mg Tirzepatida",
    dose: "Dose intermediária",
    description: "Dose intermediária — 4 doses injetáveis. Conforme prescrição médica.",
    longDescription:
      "Mounjaro 7,5 mg Tirzepatida com 4 Doses Injetáveis. Dose intermediária utilizada na evolução gradual do tratamento, conforme orientação médica. Caneta KwikPen Eli Lilly.",
    price: 210.99,
    oldPrice: 2576.36,
    image: penImg,
    inStock: true,
  },
  {
    id: "monjaro-10",
    name: "Mounjaro 10 mg Tirzepatida",
    dose: "Dose alta",
    description: "Dose alta — 4 doses injetáveis. Sempre com acompanhamento médico.",
    longDescription:
      "Mounjaro 10 mg Tirzepatida com 4 Doses Injetáveis. Dose alta indicada na evolução do tratamento, conforme prescrição médica. Caneta KwikPen original Eli Lilly.",
    price: 210.99,
    oldPrice: 2990.43,
    image: boxImg,
    badge: "Premium",
    inStock: true,
  },
  {
    id: "monjaro-12-5",
    name: "Mounjaro 12,5 mg Tirzepatida",
    dose: "Dose elevada",
    description: "Caneta de alta concentração — 4 doses para tratamentos avançados.",
    longDescription:
      "Mounjaro 12,5 mg Tirzepatida com 4 Doses Injetáveis. Para tratamentos em estágio avançado, sempre conforme prescrição médica. Caneta KwikPen Eli Lilly.",
    price: 210.99,
    oldPrice: 3506.95,
    image: penImg,
    inStock: true,
  },
  {
    id: "monjaro-15",
    name: "Mounjaro 15 mg Tirzepatida",
    dose: "Dose máxima",
    description: "Maior concentração disponível — 4 doses. Indicada apenas com prescrição.",
    longDescription:
      "Mounjaro 15 mg Tirzepatida com 4 Doses Injetáveis. Maior concentração disponível, indicada exclusivamente com prescrição médica para casos específicos. Caneta KwikPen Eli Lilly.",
    price: 210.99,
    oldPrice: 3950.00,
    image: boxImg,
    badge: "Maior dose",
    inStock: true,
  },
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);

export const formatBRL = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
