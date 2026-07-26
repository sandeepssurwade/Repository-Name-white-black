import { Category, Product, ProductColor, Review } from "@/lib/types";

const palette: Record<string, ProductColor> = {
  jet: { name: "Jet Black", hex: "#0b0b0c" },
  bone: { name: "Bone White", hex: "#f6f4ef" },
  gold: { name: "Antique Gold", hex: "#b98f4e" },
  silver: { name: "Brushed Silver", hex: "#c7c9c6" },
  clay: { name: "Smoked Clay", hex: "#8a6a52" },
  moss: { name: "Deep Moss", hex: "#4a5340" },
  wine: { name: "Oxblood", hex: "#5c1f24" },
  stone: { name: "Wet Stone", hex: "#5c584f" },
};

const gradients: [string, string][] = [
  ["#141414", "#3a2f22"],
  ["#101012", "#2b2e33"],
  ["#161212", "#4a1f24"],
  ["#121412", "#2c3226"],
  ["#0f0f10", "#3d3226"],
  ["#131313", "#2a2a2c"],
];

function reviewSet(seed: number): Review[] {
  const bank = [
    { author: "A. Mehta", title: "Craftsmanship is unmatched", body: "The finishing on this piece is genuinely on par with houses twice the price. Wears in beautifully." },
    { author: "R. Shah", title: "Fits the brand's promise", body: "Understated, precise, and built to last. Exactly the restrained luxury I was after." },
    { author: "K. Verma", title: "Worth the wait", body: "Took a moment to arrive but the materials and stitching justify every day." },
    { author: "S. Iyer", title: "A daily staple now", body: "Went in expecting a statement piece, ended up with something I reach for constantly." },
    { author: "N. Kapoor", title: "Exceptional detail", body: "Small details, the hardware, the edge finishing, show real attention." },
  ];
  return [0, 1, 2].map((i) => {
    const b = bank[(seed + i) % bank.length];
    return {
      id: `r-${seed}-${i}`,
      author: b.author,
      rating: 4 + ((seed + i) % 2),
      title: b.title,
      body: b.body,
      date: `2026-0${1 + ((seed + i) % 6)}-1${(seed + i) % 9}`,
    };
  });
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

interface Seed {
  name: string;
  line: string;
  price: number;
  compareAtPrice?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  colorKeys: (keyof typeof palette)[];
  materials: string[];
  description: string;
  story: string;
}

const shoeSeeds: Seed[] = [
  { name: "Monolith Derby", line: "The Atelier Line", price: 42500, isBestSeller: true, colorKeys: ["jet", "clay"], materials: ["Full-grain calfskin", "Leather sole", "Gold-toned eyelets"], description: "A sculptural derby cut from a single hide, finished with a hand-burnished toe.", story: "Named for its uninterrupted silhouette — one panel, one line, no seams to break the form." },
  { name: "Obsidian Chelsea", line: "The Atelier Line", price: 39800, colorKeys: ["jet", "wine"], materials: ["Waxed leather", "Elastic gusset", "Stacked leather heel"], description: "A Chelsea boot built for the city, with a reinforced ankle and a matte-black hardware finish.", story: "Inspired by volcanic glass — dark, smooth, and precisely edged." },
  { name: "Ivory Court Low", line: "The Signature Series", price: 28500, isNew: true, colorKeys: ["bone", "gold"], materials: ["Nappa leather", "Cupsole construction", "Cotton laces"], description: "A minimalist court sneaker rendered in bone-white nappa with gold foil detailing.", story: "A quiet reinterpretation of the tennis shoe, stripped of branding and noise." },
  { name: "Ashen Runner", line: "The Motion Line", price: 31200, colorKeys: ["stone", "jet"], materials: ["Engineered knit", "Responsive foam midsole", "Rubber lug outsole"], description: "A performance-luxury runner with a compression-knit upper and a low-profile silhouette.", story: "Built for movement without sacrificing the house's restrained aesthetic." },
  { name: "Gilded Loafer", line: "The Atelier Line", price: 36700, colorKeys: ["clay", "gold"], materials: ["Suede", "Horsebit hardware", "Leather sole"], description: "A penny loafer reimagined with a brushed gold bit and a soft suede upper.", story: "A tribute to the original horsebit loafer, softened for everyday wear." },
  { name: "Nightfall Chukka", line: "The Atelier Line", price: 33400, colorKeys: ["jet", "moss"], materials: ["Suede", "Crepe sole", "Brass eyelets"], description: "A two-eyelet chukka in deep suede, finished with a natural crepe sole.", story: "Made for the hour between daylight and dark." },
  { name: "Bone Trainer 02", line: "The Signature Series", price: 27600, isBestSeller: true, colorKeys: ["bone", "silver"], materials: ["Perforated leather", "EVA midsole", "Rubber outsole"], description: "The house's most-worn silhouette, in a fresh bone-and-silver colorway.", story: "The second act of our debut trainer — same bones, sharper edges." },
  { name: "Umber Wingtip", line: "The Atelier Line", price: 44900, colorKeys: ["clay", "wine"], materials: ["Brogued calfskin", "Goodyear welt", "Leather sole"], description: "A formal wingtip with full broguing and a traditional Goodyear welt.", story: "Handmade in small batches by artisans trained in classic English shoemaking." },
  { name: "Slate High-Top", line: "The Motion Line", price: 34100, isNew: true, colorKeys: ["stone", "silver"], materials: ["Technical canvas", "Leather overlays", "Cupsole"], description: "A high-top silhouette in technical canvas with reinforced leather overlays.", story: "Street proportions, atelier finishing." },
  { name: "Gold Line Sandal", line: "The Resort Edit", price: 21200, colorKeys: ["gold", "bone"], materials: ["Vegetable-tanned leather", "Woven straps", "Cork footbed"], description: "A minimal strap sandal with a hand-woven gold-leather upper.", story: "Designed on the coast, for the coast." },
  { name: "Shadow Espadrille", line: "The Resort Edit", price: 18700, colorKeys: ["jet", "stone"], materials: ["Canvas", "Jute sole", "Leather trim"], description: "A refined take on the espadrille with a matte-black canvas upper.", story: "Effortless, but never careless." },
  { name: "Pearl Mule", line: "The Signature Series", price: 24300, colorKeys: ["bone", "silver"], materials: ["Nappa leather", "Backless construction", "Leather sole"], description: "A backless mule in pearlescent nappa, finished with a silver heel cap.", story: "For the walk from the car to the door and every room after." },
  { name: "Copper Boot", line: "The Atelier Line", price: 47600, colorKeys: ["clay", "jet"], materials: ["Oiled leather", "Commando sole", "Speed hooks"], description: "A rugged lace-up boot in oiled copper-toned leather with a commando sole.", story: "Built for terrain, tailored for the boardroom." },
  { name: "Onyx Sneaker", line: "The Signature Series", price: 29900, isBestSeller: true, colorKeys: ["jet", "gold"], materials: ["Smooth leather", "Gold eyelets", "Cupsole"], description: "The house's signature minimalist sneaker, entirely in black with gold hardware.", story: "The shoe that started the line. Unchanged in silhouette since day one." },
  { name: "Frost Trainer", line: "The Motion Line", price: 30800, colorKeys: ["silver", "bone"], materials: ["Mesh knit", "TPU cage", "Foam midsole"], description: "A cool-toned trainer with a breathable mesh upper and a sculpted TPU cage.", story: "Named for the pale silver light of early winter mornings." },
  { name: "Moss Desert Boot", line: "The Resort Edit", price: 22400, colorKeys: ["moss", "clay"], materials: ["Suede", "Crepe sole", "Two-eyelet lacing"], description: "A classic desert boot in a deep moss suede.", story: "One boot, worn everywhere, for sixty years and counting." },
  { name: "Wine Monk Strap", line: "The Atelier Line", price: 38900, colorKeys: ["wine", "jet"], materials: ["Polished calfskin", "Double monk hardware", "Leather sole"], description: "A double monk strap shoe in a deep oxblood polish.", story: "For rooms that require a shoe with a little more say." },
  { name: "Bone Slip-On", line: "The Signature Series", price: 19800, colorKeys: ["bone", "clay"], materials: ["Canvas", "Elastic gore", "Rubber sole"], description: "An easy slip-on with elastic side gores and a canvas upper.", story: "The shoe you don't think about, which is exactly the point." },
  { name: "Graphite Sneaker Hi", line: "The Motion Line", price: 32600, isNew: true, colorKeys: ["stone", "jet"], materials: ["Technical nylon", "Leather cap toe", "Lugged sole"], description: "A high-top technical sneaker with a reinforced leather toe cap.", story: "Built from the same lug pattern used on our outdoor line." },
  { name: "Ivory Brogue", line: "The Atelier Line", price: 41300, colorKeys: ["bone", "gold"], materials: ["Calfskin", "Full broguing", "Leather sole"], description: "A rare ivory-toned brogue with gold-foil detailing along the welt.", story: "A formal shoe designed to photograph as well as it walks." },
  { name: "Basalt Combat Boot", line: "The Motion Line", price: 36200, colorKeys: ["jet", "stone"], materials: ["Full-grain leather", "Lug outsole", "Speed-hook lacing"], description: "A combat-inspired boot with a deep lug sole and reinforced toe.", story: "Named for volcanic rock — dense, dark, and unyielding." },
  { name: "Clay Espadrille Wedge", line: "The Resort Edit", price: 20100, colorKeys: ["clay", "gold"], materials: ["Suede", "Jute wedge", "Leather lining"], description: "An elevated espadrille wedge in warm clay suede.", story: "Height without noise." },
];

const watchSeeds: Seed[] = [
  { name: "Meridian Automatic", line: "The Timepiece Edit", price: 128000, isBestSeller: true, colorKeys: ["jet", "gold"], materials: ["316L steel case", "Sapphire crystal", "Calfskin strap"], description: "A 39mm automatic with a sunburst black dial and gold-toned indices.", story: "Named for the line that splits a map — and a day — in two." },
  { name: "Ivory Dress Watch", line: "The Timepiece Edit", price: 96000, colorKeys: ["bone", "silver"], materials: ["Steel case", "Mineral crystal", "Leather strap"], description: "A slim dress watch with an ivory dial and applied silver hour markers.", story: "Designed to disappear under a cuff until you need it." },
  { name: "Slate Chronograph", line: "The Motion Line", price: 154000, isNew: true, colorKeys: ["stone", "jet"], materials: ["Titanium case", "Sapphire crystal", "Rubber strap"], description: "A three-register chronograph in brushed titanium.", story: "Built for the timing of things that matter for seconds, not hours." },
  { name: "Gold Line Bracelet Watch", line: "The Timepiece Edit", price: 172000, colorKeys: ["gold", "jet"], materials: ["Gold-plated steel", "Sapphire crystal", "Integrated bracelet"], description: "An integrated-bracelet watch with a gold-plated case and black dial.", story: "One continuous line from lug to clasp." },
  { name: "Field Compass Watch", line: "The Motion Line", price: 88000, colorKeys: ["moss", "stone"], materials: ["Steel case", "Nylon strap", "Luminous hands"], description: "A field-inspired watch with a moss dial and luminous markers.", story: "For places without signal." },
  { name: "Onyx Minimalist", line: "The Signature Series", price: 64000, colorKeys: ["jet", "bone"], materials: ["Steel case", "Mineral crystal", "Leather strap"], description: "A hand-only minimalist watch with no numerals, only a single gold marker at twelve.", story: "The house's answer to the question: how little can a watch say?" },
  { name: "Wine Leather Dress", line: "The Timepiece Edit", price: 112000, colorKeys: ["wine", "gold"], materials: ["Steel case", "Sapphire crystal", "Oxblood strap"], description: "A dress watch paired with an oxblood leather strap.", story: "For evenings that ask for a little more color." },
  { name: "Silver Diver 200", line: "The Motion Line", price: 138000, colorKeys: ["silver", "jet"], materials: ["Steel case", "Unidirectional bezel", "200m water resistance"], description: "A dive-rated watch with a silver bezel and black dial.", story: "Tested to depths most owners will never see, and worn everywhere else." },
];

const clothesSeeds: Seed[] = [
  { name: "Wool Overcoat", line: "The Outerwear Edit", price: 68000, isBestSeller: true, colorKeys: ["jet", "stone"], materials: ["Merino wool", "Horn buttons", "Silk lining"], description: "A single-breasted overcoat cut from heavyweight merino.", story: "The one coat built to outlast every trend cycle it's worn through." },
  { name: "Bone Cashmere Sweater", line: "The Knitwear Edit", price: 34500, colorKeys: ["bone", "stone"], materials: ["Grade-A cashmere", "Ribbed hem", "Crew neck"], description: "A crew-neck sweater in undyed bone cashmere.", story: "Woven at a small mill that has made the house's knitwear for a decade." },
  { name: "Tailored Wool Trouser", line: "The Suiting Edit", price: 24800, colorKeys: ["jet", "clay"], materials: ["Wool twill", "Half-lined", "Side-adjusters"], description: "A tapered wool trouser with a clean, unbroken leg line.", story: "Designed to pair with the Monolith Derby, but built to stand alone." },
  { name: "Silk Evening Shirt", line: "The Evening Edit", price: 22100, isNew: true, colorKeys: ["wine", "jet"], materials: ["Mulberry silk", "Mother-of-pearl buttons"], description: "A silk shirt in a deep oxblood with a soft, fluid drape.", story: "Made for rooms with low light and high stakes." },
  { name: "Structured Blazer", line: "The Suiting Edit", price: 52000, colorKeys: ["stone", "jet"], materials: ["Wool-mohair blend", "Half-canvas construction"], description: "A sharply structured blazer with a soft shoulder and clean lapel.", story: "Cut from the same house pattern used in our first collection." },
  { name: "Moss Field Jacket", line: "The Outerwear Edit", price: 31600, colorKeys: ["moss", "clay"], materials: ["Waxed cotton", "Corduroy collar", "Brass hardware"], description: "A field jacket in waxed cotton with a corduroy collar.", story: "Built to weather, and to be worn better for it." },
  { name: "Ivory Linen Shirt", line: "The Resort Edit", price: 16400, colorKeys: ["bone", "silver"], materials: ["European linen", "Mother-of-pearl buttons"], description: "A relaxed linen shirt in undyed ivory.", story: "The shirt for the flight, the arrival, and the week after." },
  { name: "Charcoal Roll Neck", line: "The Knitwear Edit", price: 27300, colorKeys: ["stone", "jet"], materials: ["Merino wool", "Fine gauge knit"], description: "A fine-gauge roll neck in deep charcoal.", story: "One layer, worn under everything from October to March." },
];

const walletSeeds: Seed[] = [
  { name: "Bifold Card Case", line: "The Leather Goods Edit", price: 8600, isBestSeller: true, colorKeys: ["jet", "gold"], materials: ["Full-grain calfskin", "Gold-foil edge", "Six card slots"], description: "A slim bifold wallet with a hand-painted gold edge.", story: "Made from the offcuts of our shoe leather — nothing wasted." },
  { name: "Ivory Cardholder", line: "The Leather Goods Edit", price: 6200, colorKeys: ["bone", "clay"], materials: ["Nappa leather", "Three card slots"], description: "A minimal cardholder in soft ivory nappa.", story: "Fits in a palm, disappears in a pocket." },
  { name: "Travel Passport Case", line: "The Journey Edit", price: 11400, isNew: true, colorKeys: ["clay", "gold"], materials: ["Vegetable-tanned leather", "Elastic closure"], description: "A passport case that develops a patina with every trip.", story: "Designed with a jet-setting client who wanted their case to age like a good boot." },
  { name: "Zip Long Wallet", line: "The Leather Goods Edit", price: 13800, colorKeys: ["wine", "jet"], materials: ["Calfskin", "Brass zipper", "Eight card slots"], description: "A zip-around long wallet in deep oxblood.", story: "For the person who carries more than a card and a note." },
  { name: "Money Clip", line: "The Leather Goods Edit", price: 5400, colorKeys: ["jet", "silver"], materials: ["Leather-wrapped steel clip"], description: "A leather-wrapped money clip with a brushed steel spring.", story: "The smallest object in the house, still hand-finished." },
  { name: "Coin Pouch", line: "The Leather Goods Edit", price: 4200, colorKeys: ["stone", "gold"], materials: ["Suede", "Brass frame clasp"], description: "A frame-clasp coin pouch in soft grey suede.", story: "A small, quiet luxury for loose change." },
];

const perfumeSeeds: Seed[] = [
  { name: "Noir de Cuir", line: "The Fragrance House", price: 18900, isBestSeller: true, colorKeys: ["jet", "gold"], materials: ["Leather accord", "Black pepper", "Vetiver"], description: "A dark leather fragrance built around the same tannery notes as our boots.", story: "Bottled from the scent of a finished workshop floor." },
  { name: "Ivory Musc", line: "The Fragrance House", price: 16400, colorKeys: ["bone", "silver"], materials: ["White musk", "Iris", "Cedarwood"], description: "A soft, skin-close musk with an iris heart.", story: "The scent worn by the house's founder on opening day." },
  { name: "Clay & Amber", line: "The Fragrance House", price: 19600, isNew: true, colorKeys: ["clay", "gold"], materials: ["Amber", "Sandalwood", "Tobacco leaf"], description: "A warm amber fragrance with a tobacco-leaf dry-down.", story: "Inspired by the leather-and-wood scent of the atelier storeroom." },
  { name: "Moss & Rain", line: "The Fragrance House", price: 15200, colorKeys: ["moss", "stone"], materials: ["Oakmoss", "Petrichor accord", "Bergamot"], description: "A green, mineral fragrance built around an oakmoss base.", story: "For the first ten minutes after rain in the workshop courtyard." },
  { name: "Oxblood Oud", line: "The Fragrance House", price: 24800, colorKeys: ["wine", "jet"], materials: ["Oud", "Rose", "Dark chocolate accord"], description: "A rich oud fragrance with a rose heart and a chocolate dry-down.", story: "Our most concentrated scent, worn sparingly by design." },
  { name: "Silver Vetiver", line: "The Fragrance House", price: 17200, colorKeys: ["silver", "bone"], materials: ["Vetiver", "Grapefruit", "White tea"], description: "A crisp vetiver fragrance with a citrus opening.", story: "The lightest scent in the house, built for daylight." },
];

const beltSeeds: Seed[] = [
  { name: "Signature Buckle Belt", line: "The Leather Goods Edit", price: 9800, isBestSeller: true, colorKeys: ["jet", "gold"], materials: ["Full-grain leather", "Solid brass buckle"], description: "A 35mm belt with the house's signature brushed-gold buckle.", story: "One buckle design, unchanged since the house's first collection." },
  { name: "Reversible Dress Belt", line: "The Suiting Edit", price: 8600, colorKeys: ["jet", "wine"], materials: ["Calfskin", "Reversible construction", "Nickel buckle"], description: "A reversible belt that switches from black to oxblood.", story: "One belt for two shoes, without a second thought." },
  { name: "Woven Resort Belt", line: "The Resort Edit", price: 6400, colorKeys: ["bone", "clay"], materials: ["Woven leather", "Matte buckle"], description: "A hand-woven leather belt for warm-weather tailoring.", story: "Woven by the same artisans who make our resort sandals." },
  { name: "Suede Casual Belt", line: "The Leather Goods Edit", price: 7200, colorKeys: ["stone", "silver"], materials: ["Suede", "Brushed steel buckle"], description: "A soft suede belt with a low-profile steel buckle.", story: "The everyday belt, worn until it's the only one left in the drawer." },
];

function build(seeds: Seed[], category: Category, seedOffset: number): Product[] {
  return seeds.map((s, i) => {
    const idx = seedOffset + i;
    const colors = s.colorKeys.map((k) => palette[k]);
    return {
      id: `${category}-${idx}`,
      slug: slugify(`${s.name}`),
      category,
      name: s.name,
      line: s.line,
      price: s.price,
      compareAtPrice: s.compareAtPrice,
      isNew: s.isNew,
      isBestSeller: s.isBestSeller,
      rating: 4.5 + ((idx % 3) * 0.1),
      reviewCount: 18 + ((idx * 7) % 140),
      colors,
      sizes: category === "shoes" ? ["6", "7", "8", "9", "10", "11", "12"] : category === "clothes" ? ["XS", "S", "M", "L", "XL"] : ["One Size"],
      description: s.description,
      story: s.story,
      materials: s.materials,
      sku: `WB-${category.slice(0, 2).toUpperCase()}-${(1000 + idx)}`,
      gradient: gradients[idx % gradients.length],
      reviews: reviewSet(idx),
    };
  });
}

export const products: Product[] = [
  ...build(shoeSeeds, "shoes", 0),
  ...build(watchSeeds, "watches", 100),
  ...build(clothesSeeds, "clothes", 200),
  ...build(walletSeeds, "wallets", 300),
  ...build(perfumeSeeds, "perfumes", 400),
  ...build(beltSeeds, "belts", 500),
];

export function getByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function getBySlug(category: Category, slug: string): Product | undefined {
  return products.find((p) => p.category === category && p.slug === slug);
}

export function getRelated(product: Product, count = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, count);
}

export const bestSellers = products.filter((p) => p.isBestSeller);
export const newArrivals = products.filter((p) => p.isNew);

export const categoryMeta: Record<Category, { label: string; tagline: string }> = {
  shoes: { label: "Shoes", tagline: "Luxury Crafted For Every Step" },
  watches: { label: "Watches", tagline: "Time, Held Precisely" },
  clothes: { label: "Clothes", tagline: "Tailored Restraint" },
  wallets: { label: "Wallets", tagline: "Small Objects, Exact Craft" },
  perfumes: { label: "Perfumes", tagline: "Scent as Signature" },
  belts: { label: "Belts", tagline: "The Finishing Line" },
};
