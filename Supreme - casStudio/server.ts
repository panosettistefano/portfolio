import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock Products Data
  const products = [
    // Sweatshirts
    {
      id: "sw1",
      name: "Box Logo Hooded Sweatshirt",
      price: "168",
      image: "https://picsum.photos/seed/supreme-sw1/800/800",
      sizes: ["S", "M", "L", "XL"],
      soldOut: false,
      category: "Sweatshirts",
      description: "Heavyweight cotton crossgrain fleece with rib gussets and embroidered logo on chest."
    },
    {
      id: "sw2",
      name: "Micro Logo Hooded Sweatshirt",
      price: "158",
      image: "https://picsum.photos/seed/supreme-sw2/800/800",
      sizes: ["S", "M", "L", "XL"],
      soldOut: false,
      category: "Sweatshirts",
      description: "Cotton fleece with embroidered logo on chest."
    },
    {
      id: "sw3",
      name: "Gradient Zip Up Hooded Sweatshirt",
      price: "178",
      image: "https://picsum.photos/seed/supreme-sw3/800/800",
      sizes: ["S", "M", "L", "XL"],
      soldOut: false,
      category: "Sweatshirts",
      description: "Cotton fleece with full zip closure and printed logo on back."
    },
    // Shirts
    {
      id: "sh1",
      name: "Loose Fit Oxford Shirt",
      price: "128",
      image: "https://picsum.photos/seed/supreme-sh1/800/800",
      sizes: ["S", "M", "L", "XL"],
      soldOut: false,
      category: "Shirts",
      description: "All cotton oxford with button down collar and single chest pocket. Embroidered logo on pocket."
    },
    {
      id: "sh2",
      name: "Denim Shirt",
      price: "138",
      image: "https://picsum.photos/seed/supreme-sh2/800/800",
      sizes: ["S", "M", "L", "XL"],
      soldOut: false,
      category: "Shirts",
      description: "8 oz. cotton denim with utility pockets and embroidered logo."
    },
    {
      id: "sh3",
      name: "Plaid Flannel Shirt",
      price: "118",
      image: "https://picsum.photos/seed/supreme-sh3/800/800",
      sizes: ["S", "M", "L", "XL"],
      soldOut: false,
      category: "Shirts",
      description: "Heavyweight cotton flannel with button down collar."
    },
    // Pants
    {
      id: "pa1",
      name: "Baggy Jean",
      price: "158",
      image: "https://picsum.photos/seed/supreme-pa1/800/800",
      sizes: ["30", "32", "34", "36"],
      soldOut: true,
      category: "Pants",
      description: "All cotton 13 oz. denim with baggy fit. Classic 5-pocket style with embroidered logo on change pocket."
    },
    {
      id: "pa2",
      name: "Chino Pant",
      price: "148",
      image: "https://picsum.photos/seed/supreme-pa2/800/800",
      sizes: ["30", "32", "34", "36"],
      soldOut: false,
      category: "Pants",
      description: "Heavyweight cotton twill with relaxed fit."
    },
    {
      id: "pa3",
      name: "Cargo Pant",
      price: "168",
      image: "https://picsum.photos/seed/supreme-pa3/800/800",
      sizes: ["30", "32", "34", "36"],
      soldOut: false,
      category: "Pants",
      description: "Cotton blend with multiple utility pockets and reinforced knees."
    },
    // Hats
    {
      id: "ha1",
      name: "Camp Cap",
      price: "48",
      image: "https://picsum.photos/seed/supreme-ha1/800/800",
      sizes: ["OS"],
      soldOut: false,
      category: "Hats",
      description: "All cotton twill Supreme camp cap with custom water resistant coating."
    },
    {
      id: "ha2",
      name: "Beanie",
      price: "38",
      image: "https://picsum.photos/seed/supreme-ha2/800/800",
      sizes: ["OS"],
      soldOut: false,
      category: "Hats",
      description: "Acrylic cuffed beanie with embroidered logo."
    },
    {
      id: "ha3",
      name: "6-Panel Cap",
      price: "44",
      image: "https://picsum.photos/seed/supreme-ha3/800/800",
      sizes: ["OS"],
      soldOut: false,
      category: "Hats",
      description: "Cotton twill 6-panel with adjustable strap back."
    },
    // Accessories
    {
      id: "ac1",
      name: "Hanes Tagless Tees (3 Pack)",
      price: "28",
      image: "https://picsum.photos/seed/supreme-ac1/800/800",
      sizes: ["S", "M", "L", "XL"],
      soldOut: false,
      category: "Accessories",
      description: "All cotton classic Hanes crewneck tee. Sold in pack of 3."
    },
    {
      id: "ac2",
      name: "Supreme/Zippo Lighter",
      price: "48",
      image: "https://picsum.photos/seed/supreme-ac2/800/800",
      sizes: ["OS"],
      soldOut: false,
      category: "Accessories",
      description: "Classic Zippo lighter with engraved logo."
    },
    {
      id: "ac3",
      name: "Supreme/Mophie Powerbank",
      price: "88",
      image: "https://picsum.photos/seed/supreme-ac3/800/800",
      sizes: ["OS"],
      soldOut: false,
      category: "Accessories",
      description: "Portable charger with fast charging capabilities."
    },
    // Tees
    {
      id: "te1",
      name: "Photo Tee",
      price: "48",
      image: "https://picsum.photos/seed/supreme-te1/800/800",
      sizes: ["S", "M", "L", "XL"],
      soldOut: false,
      category: "Tees",
      description: "All cotton classic Supreme t-shirt with printed graphic on front."
    },
    {
      id: "te2",
      name: "Small Box Tee",
      price: "58",
      image: "https://picsum.photos/seed/supreme-te2/800/800",
      sizes: ["S", "M", "L", "XL"],
      soldOut: false,
      category: "Tees",
      description: "All cotton jersey with embroidered logo patch on chest."
    },
    {
      id: "te3",
      name: "Script Logo Tee",
      price: "44",
      image: "https://picsum.photos/seed/supreme-te3/800/800",
      sizes: ["S", "M", "L", "XL"],
      soldOut: false,
      category: "Tees",
      description: "All cotton jersey with printed script logo."
    },
    // Jackets
    {
      id: "ja1",
      name: "GORE-TEX Taped Seam Shell Jacket",
      price: "398",
      image: "https://picsum.photos/seed/supreme-ja1/800/800",
      sizes: ["S", "M", "L", "XL"],
      soldOut: false,
      category: "Jackets",
      description: "Waterproof, breathable GORE-TEX nylon shell with taped seams and tricot backer."
    },
    {
      id: "ja2",
      name: "Leather Varsity Jacket",
      price: "698",
      image: "https://picsum.photos/seed/supreme-ja2/800/800",
      sizes: ["S", "M", "L", "XL"],
      soldOut: false,
      category: "Jackets",
      description: "Premium cowhide leather with wool blend lining and embroidered graphics."
    },
    {
      id: "ja3",
      name: "Denim Trucker Jacket",
      price: "248",
      image: "https://picsum.photos/seed/supreme-ja3/800/800",
      sizes: ["S", "M", "L", "XL"],
      soldOut: false,
      category: "Jackets",
      description: "14 oz. denim with classic trucker styling."
    }
  ];

  // API Routes
  app.get("/api/products", (req, res) => {
    const category = req.query.category;
    if (category) {
      return res.json(products.filter(p => p.category.toLowerCase() === (category as string).toLowerCase()));
    }
    res.json(products);
  });

  app.get("/api/products/:id", (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: "Product not found" });
  });

  app.post("/api/checkout", (req, res) => {
    const { productId, size } = req.body;
    // Simulate processing
    setTimeout(() => {
      if (Math.random() > 0.1) {
        res.json({ success: true, orderId: Math.random().toString(36).substr(2, 9).toUpperCase() });
      } else {
        res.status(400).json({ success: false, message: "SOLD OUT DURING CHECKOUT" });
      }
    }, 800);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Supreme Core running on http://localhost:${PORT}`);
  });
}

startServer();
