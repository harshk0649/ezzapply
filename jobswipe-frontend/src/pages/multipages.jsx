import React from "react";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "$59.99",
    image: "https://via.placeholder.com/200x200?text=Headphones",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "$99.99",
    image: "https://via.placeholder.com/200x200?text=Smart+Watch",
    rating: 4.2,
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: "$29.99",
    image: "https://via.placeholder.com/200x200?text=Speaker",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Fitness Tracker",
    price: "$39.99",
    image: "https://via.placeholder.com/200x200?text=Fitness+Tracker",
    rating: 4.3,
  },
];

const DesignerPage = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#f1f3f6", minHeight: "100vh" }}>
      <header style={{ background: "#2874f0", color: "#fff", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontWeight: "bold", fontSize: "2rem", letterSpacing: "2px" }}>EzzApply</div>
        <input
          type="text"
          placeholder="Search for products, brands and more"
          style={{
            width: "40%",
            padding: "8px 16px",
            borderRadius: "4px",
            border: "none",
            fontSize: "1rem",
          }}
        />
        <nav>
          <a href="#" style={{ color: "#fff", margin: "0 16px", textDecoration: "none" }}>Login</a>
          <a href="#" style={{ color: "#fff", margin: "0 16px", textDecoration: "none" }}>Cart</a>
        </nav>
      </header>
      <main style={{ maxWidth: "1200px", margin: "32px auto", padding: "0 16px" }}>
        <h2 style={{ marginBottom: "24px", color: "#212121" }}>Top Deals</h2>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          {products.map((product) => (
            <div key={product.id} style={{
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              width: "250px",
              padding: "16px",
              textAlign: "center",
              transition: "transform 0.2s",
            }}>
              <img src={product.image} alt={product.name} style={{ width: "100%", height: "180px", objectFit: "contain", marginBottom: "12px" }} />
              <h3 style={{ fontSize: "1.1rem", color: "#212121", margin: "8px 0" }}>{product.name}</h3>
              <div style={{ color: "#388e3c", fontWeight: "bold", marginBottom: "8px" }}>{product.price}</div>
              <div style={{ color: "#ffb400", marginBottom: "12px" }}>
                {"★".repeat(Math.floor(product.rating))}{"☆".repeat(5 - Math.floor(product.rating))}
                <span style={{ color: "#757575", marginLeft: "6px", fontSize: "0.9rem" }}>{product.rating}</span>
              </div>
              <button style={{
                background: "#ff9f00",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "8px 16px",
                cursor: "pointer",
                fontWeight: "bold",
              }}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>
      <footer style={{ background: "#232f3e", color: "#fff", textAlign: "center", padding: "16px 0", marginTop: "40px" }}>
        &copy; {new Date().getFullYear()} EzzApply. Inspired by Flipkart & Amazon.
      </footer>
    </div>
  );
};

export default DesignerPage;