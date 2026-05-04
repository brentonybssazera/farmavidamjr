import pen25 from "@/assets/mounjaro-pen-25-v2.jpg";
import pen75 from "@/assets/mounjaro-pen-75-v2.jpg";
import pen125 from "@/assets/mounjaro-pen-125-v2.jpg";
import box5 from "@/assets/mounjaro-box-5-v2.jpg";
import box10 from "@/assets/mounjaro-box-10-v2.jpg";
import box15 from "@/assets/mounjaro-box-15-v2.jpg";
import combo3 from "@/assets/mounjaro-combo-3.jpg";

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
    id: "monjaro-combo-3",
    name: "Combo 3 Mounjaro Tirzepatida",
    dose: "Oferta especial · 3 caixas",
    description: "Leve 3 caixas de Mounjaro com super desconto exclusivo. Frete grátis e entrega refrigerada.",
    longDescription:
      "Combo promocional com 3 caixas de Mounjaro Tirzepatida (escolha as doses no atendimento via WhatsApp após a compra). Originais VitaPharma Laboratories, com nota fiscal e cadeia de frio garantida. Oferta por tempo limitado.",
    price: 449.99,
    oldPrice: 5266.77,
    image: combo3,
    badge: "Oferta do dia",
    inStock: true,
  },
  {
    id: "monjaro-2-5",
    name: "Mounjaro 2,5 mg Tirzepatida",
    dose: "Dose inicial",
    description: "Caneta EasyDose Pen com 4 doses injetáveis semanais. Ideal para iniciar o tratamento.",
    longDescription:
      "Mounjaro 2,5 mg Tirzepatida com 4 doses injetáveis. Medicamento injetável utilizado no tratamento do diabetes tipo 2 e auxiliar no controle do peso. Princípio ativo: tirzepatida. Fabricante: VitaPharma Laboratories. VENDA LIMITADA A DUAS UNIDADES POR CLIENTE.",
    price: 199.98,
    oldPrice: 1754.96,
    image: pen25,
    badge: "Mais procurado",
    inStock: true,
  },
  {
    id: "monjaro-5",
    name: "Mounjaro 5 mg Tirzepatida",
    dose: "Manutenção inicial",
    description: "Dose terapêutica padrão após adaptação. Caneta com 4 doses injetáveis.",
    longDescription:
      "Mounjaro 5 mg Tirzepatida com 4 Doses Injetáveis. Primeira dose de manutenção, indicada após 4 semanas de uso da dose inicial de 2,5 mg. Caneta EasyDose Pen original VitaPharma Laboratories. Tratamento adjuvante para diabetes tipo 2.",
    price: 199.98,
    oldPrice: 2193.91,
    image: box5,
    inStock: true,
  },
  {
    id: "monjaro-7-5",
    name: "Mounjaro 7,5 mg Tirzepatida",
    dose: "Dose intermediária",
    description: "Dose intermediária — 4 doses injetáveis. Conforme prescrição médica.",
    longDescription:
      "Mounjaro 7,5 mg Tirzepatida com 4 Doses Injetáveis. Dose intermediária utilizada na evolução gradual do tratamento, conforme orientação médica. Caneta EasyDose Pen VitaPharma Laboratories.",
    price: 199.98,
    oldPrice: 2576.36,
    image: pen75,
    inStock: true,
  },
  {
    id: "monjaro-10",
    name: "Mounjaro 10 mg Tirzepatida",
    dose: "Dose alta",
    description: "Dose alta — 4 doses injetáveis. Sempre com acompanhamento médico.",
    longDescription:
      "Mounjaro 10 mg Tirzepatida com 4 Doses Injetáveis. Dose alta indicada na evolução do tratamento, conforme prescrição médica. Caneta EasyDose Pen original VitaPharma Laboratories.",
    price: 199.98,
    oldPrice: 2990.43,
    image: box10,
    badge: "Premium",
    inStock: true,
  },
  {
    id: "monjaro-12-5",
    name: "Mounjaro 12,5 mg Tirzepatida",
    dose: "Dose elevada",
    description: "Caneta de alta concentração — 4 doses para tratamentos avançados.",
    longDescription:
      "Mounjaro 12,5 mg Tirzepatida com 4 Doses Injetáveis. Para tratamentos em estágio avançado, sempre conforme prescrição médica. Caneta EasyDose Pen VitaPharma Laboratories.",
    price: 199.98,
    oldPrice: 3506.95,
    image: pen125,
    inStock: true,
  },
  {
    id: "monjaro-15",
    name: "Mounjaro 15 mg Tirzepatida",
    dose: "Dose máxima",
    description: "Maior concentração disponível — 4 doses. Indicada apenas com prescrição.",
    longDescription:
      "Mounjaro 15 mg Tirzepatida com 4 Doses Injetáveis. Maior concentração disponível, indicada exclusivamente com prescrição médica para casos específicos. Caneta EasyDose Pen VitaPharma Laboratories.",
    price: 199.98,
    oldPrice: 3950.00,
    image: box15,
    badge: "Maior dose",
    inStock: true,
  },
  {
    id: "monjaro-kit-iniciante",
    name: "Kit Iniciante Mounjaro 2,5 + 5 mg",
    dose: "Combo · 2 caixas",
    description: "Combo ideal para iniciar e evoluir o tratamento. 2,5 mg + 5 mg com frete grátis.",
    longDescription:
      "Kit Iniciante com Mounjaro 2,5 mg (4 doses) + Mounjaro 5 mg (4 doses). Ideal para começar o tratamento e fazer a transição para a dose de manutenção. Originais VitaPharma Laboratories, com nota fiscal.",
    price: 199.98,
    oldPrice: 3948.87,
    image: pen25,
    badge: "Combo",
    inStock: true,
  },
  {
    id: "monjaro-kit-evolucao",
    name: "Kit Evolução Mounjaro 7,5 + 10 mg",
    dose: "Combo · 2 caixas",
    description: "Para quem já está em fase intermediária e quer evoluir com economia.",
    longDescription:
      "Kit Evolução com Mounjaro 7,5 mg (4 doses) + Mounjaro 10 mg (4 doses). Indicado para evolução do tratamento conforme prescrição médica. Caneta EasyDose Pen VitaPharma Laboratories original.",
    price: 199.98,
    oldPrice: 5566.79,
    image: box10,
    inStock: true,
  },
  {
    id: "monjaro-kit-avancado",
    name: "Kit Avançado Mounjaro 12,5 + 15 mg",
    dose: "Combo · 2 caixas",
    description: "Combo das doses mais altas para tratamentos avançados.",
    longDescription:
      "Kit Avançado com Mounjaro 12,5 mg (4 doses) + Mounjaro 15 mg (4 doses). Para tratamentos em estágio avançado conforme prescrição médica. Originais VitaPharma Laboratories.",
    price: 199.98,
    oldPrice: 7456.95,
    image: pen125,
    badge: "Top vendas",
    inStock: true,
  },
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);

export const formatBRL = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
