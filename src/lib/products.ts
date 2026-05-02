import penImg from "@/assets/monjaro-pen.jpg";
import boxImg from "@/assets/monjaro-box.jpg";
import duoImg from "@/assets/monjaro-duo.jpg";
import kitImg from "@/assets/monjaro-kit.jpg";

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
    name: "Monjaro 2,5 mg",
    dose: "Dose inicial",
    description: "Caneta KwikPen com 4 doses semanais. Ideal para iniciar o tratamento.",
    longDescription:
      "Monjaro 2,5 mg é a dose inicial recomendada de tirzepatida. Cada caneta contém 4 aplicações semanais. Indicado para o início gradual do tratamento, permitindo melhor adaptação do organismo.",
    price: 1190,
    oldPrice: 1390,
    image: penImg,
    badge: "Mais procurado",
    inStock: true,
  },
  {
    id: "monjaro-5",
    name: "Monjaro 5 mg",
    dose: "Manutenção inicial",
    description: "Dose terapêutica padrão após adaptação. Caneta com 4 aplicações.",
    longDescription:
      "Monjaro 5 mg é a primeira dose de manutenção. Recomendada após 4 semanas com a dose inicial de 2,5 mg. Caneta KwikPen original Eli Lilly com 4 doses semanais.",
    price: 1390,
    image: boxImg,
    inStock: true,
  },
  {
    id: "monjaro-7-5",
    name: "Monjaro 7,5 mg",
    dose: "Dose intermediária",
    description: "Dose intermediária para evolução do tratamento conforme orientação.",
    longDescription:
      "Monjaro 7,5 mg é uma dose intermediária utilizada conforme prescrição médica para evolução gradual do tratamento. Caneta com 4 aplicações semanais.",
    price: 1690,
    image: duoImg,
    inStock: true,
  },
  {
    id: "monjaro-10",
    name: "Monjaro 10 mg",
    dose: "Dose alta",
    description: "Dose alta para tratamento avançado. Sempre com acompanhamento médico.",
    longDescription:
      "Monjaro 10 mg é uma dose alta de tirzepatida. Indicada na evolução do tratamento conforme prescrição. Caneta KwikPen com 4 aplicações semanais.",
    price: 1990,
    image: kitImg,
    badge: "Premium",
    inStock: true,
  },
  {
    id: "monjaro-12-5",
    name: "Monjaro 12,5 mg",
    dose: "Dose elevada",
    description: "Caneta de alta concentração para tratamentos avançados.",
    longDescription:
      "Monjaro 12,5 mg para tratamentos em estágio avançado. Sempre conforme prescrição médica. Caneta com 4 doses semanais.",
    price: 2290,
    image: penImg,
    inStock: true,
  },
  {
    id: "monjaro-15",
    name: "Monjaro 15 mg",
    dose: "Dose máxima",
    description: "Maior concentração disponível. Indicada apenas com prescrição.",
    longDescription:
      "Monjaro 15 mg é a maior concentração disponível de tirzepatida. Indicada exclusivamente com prescrição médica para casos específicos. Caneta com 4 doses.",
    price: 2590,
    oldPrice: 2790,
    image: boxImg,
    badge: "Maior dose",
    inStock: true,
  },
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);

export const formatBRL = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
