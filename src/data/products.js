// src/data/products.js

const productNames = [
  "Elite Matte Pomade", "Classic Shine Pomade", "Gentleman's Beard Oil", 
  "Signature Hair Tonic", "Premium Shaving Cream", "Carbon Fiber Comb",
  "Tea Tree Shampoo", "Nourishing Conditioner", "Sandalwood Cologne",
  "Clay Hair Wax", "Sea Salt Texture Spray", "Wooden Beard Brush",
  "Aftershave Balm", "Styling Powder", "Anti-Dandruff Serum",
  "Strong Hold Gel", "Silver Styling Scissors", "Professional Straight Razor",
  "Argan Oil Hair Mask", "Cooling Mint Shampoo", "Matte Paste",
  "Travel Grooming Kit", "Beard Wash & Conditioner", "Mustache Wax",
  "Volumizing Mousse", "Leather Strop", "Alum Block",
  "Barber's Talcum Powder", "Hair Thickening Spray", "Signature Eau de Parfum"
];

const categories = [
  "Pomade & Wax", "Pomade & Wax", "Beard Care", 
  "Hair Care", "Shaving", "Tools",
  "Hair Care", "Hair Care", "Fragrance",
  "Pomade & Wax", "Styling", "Tools",
  "Shaving", "Styling", "Hair Care",
  "Pomade & Wax", "Tools", "Tools",
  "Hair Care", "Hair Care", "Pomade & Wax",
  "Accessories", "Beard Care", "Beard Care",
  "Styling", "Tools", "Shaving",
  "Accessories", "Styling", "Fragrance"
];

const reliableImageUrls = [
  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop", // Barbershop 1
  "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop", // Barber 2
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop", // Barber 3
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop", // Portrait 1
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop", // Portrait 2
];

const products = Array.from({ length: 30 }).map((_, index) => {
  const basePrice = 85000 + (index % 10) * 25000;
  const stock = 15 + (index % 20);
  
  return {
    id: index + 1,
    title: productNames[index],
    category: categories[index],
    price: basePrice,
    stock: stock,
    image: (index % 3 === 0) ? reliableImageUrls[(index/3) % reliableImageUrls.length] : `https://picsum.photos/seed/product${index}/800/800`,
    description: `Produk premium ${productNames[index]} diformulasikan khusus untuk perawatan dan gaya maskulin. Dibuat dengan bahan berkualitas tinggi untuk hasil profesional. Sangat cocok untuk digunakan setiap hari oleh para pria modern.`
  };
});

export default products;