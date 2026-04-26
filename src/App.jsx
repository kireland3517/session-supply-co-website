import { useEffect, useMemo, useState } from "react";
import { BuilderComponent, builder } from "@builder.io/react";
import { registerBuilderComponents } from "./builder/registerComponents.jsx";

const apiKey = import.meta.env.VITE_BUILDER_API_KEY || "";
if (apiKey) {
  builder.init(apiKey);
  registerBuilderComponents();
}

const cartKey = "ssc-cart";

function getCartCount() {
  const value = Number.parseInt(localStorage.getItem(cartKey) || "0", 10);
  return Number.isFinite(value) && value >= 0 ? value : 0;
}

function setCartCount(next) {
  localStorage.setItem(cartKey, String(Math.max(0, next)));
}

function Toast({ message }) {
  return <div className={`toast ${message ? "show" : ""}`}>{message}</div>;
}

function SiteNav({ cartCount }) {
  return (
    <nav className="nav">
      <a href="/" className="brand">
        Session Supply Co.
      </a>
      <div className="nav-right">
        <a href="/">Home</a>
        <a href="/shop">Shop</a>
        <a href="/product">Product</a>
        <span className="cart">Cart {cartCount}</span>
      </div>
    </nav>
  );
}

function HomePage({ onAdd }) {
  return (
    <main className="page">
      <section className="hero">
        <span>Structured tools for facilitators</span>
        <h1>Run better sessions. Every time.</h1>
        <p>Ready-to-use session plans and downloadable facilitator resources.</p>
        <div className="row">
          <a className="btn" href="/shop">
            Browse shop
          </a>
          <button className="btn secondary" onClick={() => onAdd("Starter resource")}>
            Add sample item
          </button>
        </div>
      </section>
    </main>
  );
}

function ShopPage({ onAdd }) {
  const products = [
    { title: "Boundaries That Work", price: 18 },
    { title: "Crisis Communication Cheat Sheet", price: 12 },
    { title: "Overwhelm Reset", price: 14 },
  ];
  return (
    <main className="page">
      <h1 className="title">Shop</h1>
      <div className="grid">
        {products.map((p) => (
          <article className="card" key={p.title}>
            <h3>{p.title}</h3>
            <p>${p.price}</p>
            <button className="btn" onClick={() => onAdd(p.title)}>
              Add to cart
            </button>
          </article>
        ))}
      </div>
    </main>
  );
}

function ProductPage({ onAdd }) {
  return (
    <main className="page">
      <h1 className="title">Session Plan Starter Pack</h1>
      <p className="lead">12 ready-to-use peer support session plans with worksheets.</p>
      <button className="btn" onClick={() => onAdd("Session Plan Starter Pack")}>
        Add to cart
      </button>
    </main>
  );
}

function fallbackForPath(pathname, onAdd) {
  if (pathname === "/shop") return <ShopPage onAdd={onAdd} />;
  if (pathname === "/product") return <ProductPage onAdd={onAdd} />;
  return <HomePage onAdd={onAdd} />;
}

export default function App() {
  const pathname = useMemo(() => window.location.pathname, []);
  const [builderContent, setBuilderContent] = useState(null);
  const [loadingBuilder, setLoadingBuilder] = useState(Boolean(apiKey));
  const [cartCount, setCartState] = useState(0);
  const [toast, setToast] = useState("");

  useEffect(() => {
    setCartState(getCartCount());
  }, []);

  useEffect(() => {
    let active = true;
    async function loadBuilder() {
      if (!apiKey) {
        setLoadingBuilder(false);
        return;
      }
      try {
        const content = await builder
          .get("page", { userAttributes: { urlPath: pathname } })
          .promise();
        if (active) setBuilderContent(content || null);
      } catch {
        if (active) setBuilderContent(null);
      } finally {
        if (active) setLoadingBuilder(false);
      }
    }
    loadBuilder();
    return () => {
      active = false;
    };
  }, [pathname]);

  function handleAddToCart(label) {
    const next = getCartCount() + 1;
    setCartCount(next);
    setCartState(next);
    setToast(`${label} added to cart`);
    window.clearTimeout(window.__sscToastTimer);
    window.__sscToastTimer = window.setTimeout(() => setToast(""), 2400);
  }

  return (
    <>
      <SiteNav cartCount={cartCount} />
      {loadingBuilder ? <main className="page">Loading...</main> : null}
      {!loadingBuilder && builderContent ? (
        <main className="page">
          <BuilderComponent model="page" content={builderContent} />
        </main>
      ) : null}
      {!loadingBuilder && !builderContent ? fallbackForPath(pathname, handleAddToCart) : null}
      <Toast message={toast} />
    </>
  );
}
