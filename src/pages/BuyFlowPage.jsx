import { useEffect, useMemo, useState } from "react";

const freshProducts = [
  {
    id: "mango",
    kh: "ស្វាយកែវរមៀត",
    en: "Keo Romeat Mango",
    farmer: "Sok Chan Farm",
    province: "Kampong Speu",
    price: 500,
    unit: "kg",
    available: "80 kg today",
    badge: "Grade A",
    rating: "4.8 (32)",
    fairPrice: "Fair price range: 450៛ - 650៛/kg",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "tomato",
    kh: "ប៉េងប៉ោះ",
    en: "Tomato",
    farmer: "Dara Farm",
    province: "Takeo",
    price: 900,
    unit: "kg",
    available: "45 kg today",
    badge: "Fresh",
    rating: "4.7 (28)",
    fairPrice: "Fair price range: 800៛ - 1,100៛/kg",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "coconut",
    kh: "ដូងខ្ចី",
    en: "Young Coconut",
    farmer: "Kandal Fresh Farm",
    province: "Kandal",
    price: 1200,
    unit: "each",
    available: "140 each today",
    badge: "Ready Now",
    rating: "4.9 (21)",
    fairPrice: "Fair price range: 1,000៛ - 1,400៛/each",
    image: "https://images.unsplash.com/photo-1580984969071-a8da5656c2fb?auto=format&fit=crop&w=900&q=80",
  },
];

const sideFlows = [
  {
    type: "wholesale",
    title: "Wholesale Flow",
    subtitle: "Large quantity orders for businesses",
    kh: "ស្រូវផ្ការំដួល",
    en: "Jasmine Rice Paddy",
    supplier: "Battambang Rice Co-op",
    province: "Battambang",
    quantity: "12,000 kg",
    price: "1,000 - 1,300៛/kg",
    cta: "Make Offer",
    altCta: "Request Supply",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=700&q=80",
  },
  {
    type: "season",
    title: "Season / Pre-order Flow",
    subtitle: "Reserve future harvests",
    kh: "មៀន",
    en: "Longan",
    supplier: "Pailin Mango Group",
    province: "Pailin",
    quantity: "Harvest 2026-08",
    price: "400៛ - 600៛/kg target",
    cta: "Pre-order",
    image: "https://images.unsplash.com/photo-1615485500834-bc10199bc727?auto=format&fit=crop&w=700&q=80",
  },
  {
    type: "deal",
    title: "Deals Flow",
    subtitle: "Limited-time good price offers",
    kh: "ប៉េងប៉ោះ (Deal)",
    en: "Tomato",
    supplier: "Sreyleak Farm",
    province: "Takeo",
    quantity: "30 kg deal stock",
    price: "650៛/kg",
    oldPrice: "900៛/kg",
    cta: "Claim Deal",
    image: "https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=700&q=80",
  },
  {
    type: "farmer",
    title: "Farmer Profile Flow",
    subtitle: "View farmer information",
    kh: "សុខ ចាន់",
    en: "Sok Chan Farm",
    supplier: "Verified Farmer",
    province: "Kampong Speu",
    quantity: "Mango, Banana, Longan",
    price: "4.8 rating",
    cta: "View Profile",
    image: "https://images.unsplash.com/photo-1595351298020-038700609878?auto=format&fit=crop&w=700&q=80",
  },
];

const kgOptions = [1, 2, 3, 5, 6];
const eachOptions = [1, 3, 6];
const deliveryFee = 3000;

function formatRiel(value) {
  return `${value.toLocaleString()}៛`;
}

function quantityOptions(product) {
  return product.unit === "each" ? eachOptions : kgOptions;
}

function lineSubtotal(item) {
  return item.price * item.quantity;
}

function Icon({ name }) {
  const c = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true };
  const paths = {
    cart: <path d="M4 5h2l2 11h9.5L20 8H7M10 20a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
    bolt: <path d="M13 2L4 14h7l-1 8 10-13h-7l0-7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />,
    check: <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />,
    leaf: <path d="M5 19c8 0 13-5 14-14C10 6 5 11 5 19zm0 0c3-5 7-8 12-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
    truck: <path d="M3 7h11v8H3V7zm11 3h4l3 3v2h-7v-5zM7 19a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />,
  };
  return <svg {...c}>{paths[name] || paths.leaf}</svg>;
}

function StepRail({ step }) {
  const labels = ["Product Card", "Product Detail", "Add to Cart", "Cart", "Checkout", "Order Confirmed"];
  return (
    <div className="buy-step-rail" aria-label="Buy flow progress">
      {labels.map((label, index) => (
        <div className={index <= step ? "is-active" : ""} key={label}>
          <span>{index + 1}</span>
          <strong>{label}</strong>
        </div>
      ))}
    </div>
  );
}

function ProductSummary({ product }) {
  return (
    <div className="buy-product-meta">
      <h3>{product.kh}</h3>
      <p>{product.en}</p>
      <span>{product.farmer}</span>
      <span>{product.province}</span>
    </div>
  );
}

export default function BuyFlowPage() {
  const [selectedProduct, setSelectedProduct] = useState(freshProducts[0]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState("products");
  const [targetFlow, setTargetFlow] = useState("");
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalFlow, setModalFlow] = useState(null);
  const [errors, setErrors] = useState({});
  const [orderNumber, setOrderNumber] = useState("");
  const [checkout, setCheckout] = useState({
    name: "Sreyneang Chhorn",
    phone: "012 345 678",
    location: "Takeo Province, Doun Keo Village",
    note: "",
    payment: "Cash on delivery",
  });

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + lineSubtotal(item), 0), [cart]);
  const total = subtotal ? subtotal + deliveryFee : 0;
  const step = { products: 0, detail: 1, cart: 3, checkout: 4, confirmed: 5 }[view] || 0;
  const options = quantityOptions(selectedProduct);

  useEffect(() => {
    function syncBuyAnchor() {
      const anchor = window.location.hash.split("#/buy#")[1] || "fresh";
      if (anchor === "cart") {
        setView("cart");
        setTargetFlow("");
        return;
      }

      setView("products");
      setTargetFlow(anchor);

      if (anchor === "fresh") {
        window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 60);
        return;
      }

      window.setTimeout(() => {
        document.querySelector(`[data-flow="${anchor}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 80);
    }

    syncBuyAnchor();
    window.addEventListener("hashchange", syncBuyAnchor);
    return () => window.removeEventListener("hashchange", syncBuyAnchor);
  }, []);

  function openDetail(product) {
    setSelectedProduct(product);
    setSelectedQuantity(quantityOptions(product)[0]);
    setView("detail");
  }

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  }

  function addToCart(product = selectedProduct, quantity = selectedQuantity, nextView = "detail") {
    setLoading(true);
    window.setTimeout(() => {
      setCart((current) => {
        const existing = current.find((item) => item.id === product.id);
        if (existing) {
          return current.map((item) => (item.id === product.id ? { ...item, quantity } : item));
        }
        return [...current, { ...product, quantity }];
      });
      setLoading(false);
      showToast("Added to cart successfully!");
      setView(nextView);
    }, 420);
  }

  function updateCartQuantity(id, quantity) {
    setCart((current) => current.map((item) => (item.id === id ? { ...item, quantity } : item)));
  }

  function removeCartItem(id) {
    setCart((current) => current.filter((item) => item.id !== id));
  }

  function validateCheckout() {
    const nextErrors = {};
    if (!checkout.name.trim()) nextErrors.name = "Buyer name is required.";
    if (!checkout.phone.trim()) nextErrors.phone = "Phone number is required.";
    if (!checkout.location.trim()) nextErrors.location = "Delivery location is required.";
    if (!checkout.payment) nextErrors.payment = "Select a payment method.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function confirmOrder() {
    if (!validateCheckout()) return;
    setLoading(true);
    window.setTimeout(() => {
      setOrderNumber(`#PSR-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900000) + 100000)}`);
      setLoading(false);
      setView("confirmed");
    }, 520);
  }

  function claimDeal(flow) {
    const dealProduct = {
      id: "deal-tomato",
      kh: flow.kh,
      en: flow.en,
      farmer: flow.supplier,
      province: flow.province,
      price: 650,
      unit: "kg",
      available: flow.quantity,
      badge: "Deal price",
      rating: "4.7 (18)",
      fairPrice: "Deal price claimed from today's good price offer.",
      image: flow.image,
      quantity: 1,
    };
    setCart((current) => {
      const exists = current.some((item) => item.id === dealProduct.id);
      return exists ? current : [...current, dealProduct];
    });
    showToast("Deal claimed and added to cart with deal price.");
  }

  function handleSideFlow(flow, alternate = false) {
    if (flow.type === "deal") {
      claimDeal(flow);
      return;
    }
    setModalFlow({ ...flow, cta: alternate ? flow.altCta : flow.cta });
  }

  function continueShopping() {
    setCart([]);
    setView("products");
    setSelectedProduct(freshProducts[0]);
    setSelectedQuantity(1);
  }

  return (
    <main className="buy-page">
      <StepRail step={step} />

      <section className="buy-shell">
        <div className="buy-main-panel">
          {view === "products" ? (
            <>
              <div className="buy-section-head">
                <div>
                  <span>Fresh small quantity buying</span>
                  <h1>ទិញផ្លែឈើស្រស់ពីកសិករ</h1>
                  <p>Fresh products use Add to Cart and Buy Now. Wholesale and season crops use separate request flows.</p>
                </div>
              </div>
              <div className="fresh-product-grid">
                {freshProducts.map((product) => (
                  <article className="fresh-buy-card" key={product.id}>
                    <button type="button" className="fresh-image-button" onClick={() => openDetail(product)}>
                      <img src={product.image} alt={product.en} />
                      <span>{product.badge}</span>
                    </button>
                    <ProductSummary product={product} />
                    <div className="fresh-card-details">
                      <strong>{formatRiel(product.price)}/{product.unit}</strong>
                      <span>Available: {product.available}</span>
                      <small>Star {product.rating}</small>
                    </div>
                    <div className="fresh-card-actions">
                      <button type="button" onClick={() => openDetail(product)}>View Details</button>
                      <button type="button" onClick={() => addToCart(product, quantityOptions(product)[0], "cart")}>
                        <Icon name="cart" /> Add to Cart
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : null}

          {view === "detail" ? (
            <section className="product-detail-card">
              <button type="button" className="buy-back" onClick={() => setView("products")}>Back</button>
              <div className="detail-media">
                <img src={selectedProduct.image} alt={selectedProduct.en} />
                <span>{selectedProduct.badge}</span>
              </div>
              <div className="detail-copy">
                <ProductSummary product={selectedProduct} />
                <div className="detail-facts">
                  <span>Price per {selectedProduct.unit}</span>
                  <strong>{formatRiel(selectedProduct.price)}/{selectedProduct.unit}</strong>
                  <span>Available today</span>
                  <strong>{selectedProduct.available}</strong>
                  <span>Rating</span>
                  <strong>Star {selectedProduct.rating}</strong>
                </div>
                <p className="fair-note">{selectedProduct.fairPrice}</p>
                <div className="quality-row">
                  <span><Icon name="leaf" /> Grown naturally</span>
                  <span><Icon name="check" /> Verified farmer</span>
                  <span><Icon name="truck" /> Same day delivery</span>
                </div>
                <div className="quantity-block">
                  <strong>Select Quantity ({selectedProduct.unit})</strong>
                  <div className="quantity-options">
                    {options.map((option) => (
                      <button
                        type="button"
                        className={selectedQuantity === option ? "is-active" : ""}
                        key={option}
                        onClick={() => setSelectedQuantity(option)}
                      >
                        {option} {selectedProduct.unit}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="detail-total">
                  <span>Subtotal</span>
                  <strong>{formatRiel(selectedProduct.price * selectedQuantity)}</strong>
                </div>
                <div className="detail-actions">
                  <button type="button" className="buy-now-btn" onClick={() => addToCart(selectedProduct, selectedQuantity, "checkout")}>
                    <Icon name="bolt" /> Buy Now
                  </button>
                  <button
                    type="button"
                    className="add-cart-btn"
                    onClick={() => addToCart(selectedProduct, selectedQuantity, "cart")}
                  >
                    <Icon name="cart" /> Add to Cart
                  </button>
                </div>
              </div>
            </section>
          ) : null}

          {view === "cart" ? (
            <section className="cart-card">
              <div className="buy-section-head compact">
                <div>
                  <span>Your Cart</span>
                  <h1>រទេះទំនិញ</h1>
                </div>
                <button type="button" onClick={() => setView("products")}>Add more items</button>
              </div>
              {cart.length ? (
                <>
                  <div className="cart-list">
                    {cart.map((item) => (
                      <article className="cart-line" key={item.id}>
                        <img src={item.image} alt={item.en} />
                        <div>
                          <strong>{item.kh}</strong>
                          <span>{item.en}</span>
                          <small>{item.farmer}</small>
                        </div>
                        <select value={item.quantity} onChange={(event) => updateCartQuantity(item.id, Number(event.target.value))}>
                          {quantityOptions(item).map((option) => (
                            <option key={option} value={option}>{option} {item.unit}</option>
                          ))}
                        </select>
                        <b>{formatRiel(lineSubtotal(item))}</b>
                        <button type="button" onClick={() => removeCartItem(item.id)}>Remove</button>
                      </article>
                    ))}
                  </div>
                  <div className="cart-summary">
                    <span>Subtotal <strong>{formatRiel(subtotal)}</strong></span>
                    <span>Delivery fee <strong>{formatRiel(deliveryFee)}</strong></span>
                    <b>Total <strong>{formatRiel(total)}</strong></b>
                    <button type="button" onClick={() => setView("checkout")}>Checkout</button>
                  </div>
                </>
              ) : (
                <div className="empty-cart-state">
                  <Icon name="cart" />
                  <strong>Your cart is empty</strong>
                  <p>Add some fresh products from our farmers.</p>
                  <button type="button" onClick={() => setView("products")}>Start Shopping</button>
                </div>
              )}
            </section>
          ) : null}

          {view === "checkout" ? (
            <section className="checkout-card">
              <button type="button" className="buy-back" onClick={() => setView("cart")}>Back to cart</button>
              <div className="checkout-grid">
                <form className="checkout-form">
                  <h2>Checkout</h2>
                  <label>
                    Buyer Information
                    <input value={checkout.name} onChange={(event) => setCheckout({ ...checkout, name: event.target.value })} />
                    {errors.name ? <small>{errors.name}</small> : null}
                  </label>
                  <label>
                    Phone number
                    <input value={checkout.phone} onChange={(event) => setCheckout({ ...checkout, phone: event.target.value })} />
                    {errors.phone ? <small>{errors.phone}</small> : null}
                  </label>
                  <label>
                    Delivery location
                    <input value={checkout.location} onChange={(event) => setCheckout({ ...checkout, location: event.target.value })} />
                    {errors.location ? <small>{errors.location}</small> : null}
                  </label>
                  <label>
                    Delivery note
                    <textarea value={checkout.note} onChange={(event) => setCheckout({ ...checkout, note: event.target.value })} placeholder="Leave a note for the farmer..." />
                  </label>
                  <fieldset>
                    <legend>Payment method</legend>
                    {["Cash on delivery", "ABA / KHQR placeholder", "Telegram payment confirmation placeholder"].map((method) => (
                      <label key={method}>
                        <input
                          type="radio"
                          name="payment"
                          checked={checkout.payment === method}
                          onChange={() => setCheckout({ ...checkout, payment: method })}
                        />
                        {method}
                      </label>
                    ))}
                    {errors.payment ? <small>{errors.payment}</small> : null}
                  </fieldset>
                </form>
                <aside className="order-summary-card">
                  <h2>Order Summary</h2>
                  {cart.map((item) => (
                    <div className="summary-line" key={item.id}>
                      <img src={item.image} alt="" />
                      <div>
                        <strong>{item.kh}</strong>
                        <span>{item.en} · {item.quantity} {item.unit}</span>
                      </div>
                      <b>{formatRiel(lineSubtotal(item))}</b>
                    </div>
                  ))}
                  <div className="summary-totals">
                    <span>Items <strong>{formatRiel(subtotal)}</strong></span>
                    <span>Delivery Fee <strong>{formatRiel(deliveryFee)}</strong></span>
                    <b>Total <strong>{formatRiel(total)}</strong></b>
                  </div>
                  <button type="button" onClick={confirmOrder}>Confirm Order</button>
                </aside>
              </div>
            </section>
          ) : null}

          {view === "confirmed" ? (
            <section className="confirmed-card">
              <div className="success-mark"><Icon name="check" /></div>
              <h1>Order Confirmed!</h1>
              <p>អរគុណសម្រាប់ការបញ្ជាទិញពីផ្សារស្រែ។ We've sent the order details to your phone.</p>
              <div className="receipt-number">
                <span>Order Number</span>
                <strong>{orderNumber}</strong>
              </div>
              <div className="receipt-summary">
                {cart.map((item) => (
                  <div className="summary-line" key={item.id}>
                    <img src={item.image} alt="" />
                    <div>
                      <strong>{item.kh}</strong>
                      <span>{item.en} · {item.farmer} · {item.quantity} {item.unit}</span>
                    </div>
                    <b>{formatRiel(lineSubtotal(item))}</b>
                  </div>
                ))}
              </div>
              <div className="receipt-details">
                <span>Delivery To <strong>{checkout.location}</strong></span>
                <span>Payment Method <strong>{checkout.payment}</strong></span>
                <span>Total Paid <strong>{formatRiel(total)}</strong></span>
              </div>
              <div className="receipt-actions">
                <button type="button">Track Order</button>
                <button type="button" onClick={continueShopping}>Continue Shopping</button>
              </div>
            </section>
          ) : null}
        </div>

        <aside className="buy-side-panel">
          <section className="quick-cart-panel">
            <div className="buy-section-head compact">
              <div>
                <span>Fresh cart only</span>
                <h2>{cart.length ? `Cart (${cart.length})` : "Empty Cart"}</h2>
              </div>
            </div>
            {cart.length ? (
              <>
                {cart.map((item) => (
                  <div className="mini-cart-line" key={item.id}>
                    <img src={item.image} alt="" />
                    <div>
                      <strong>{item.en}</strong>
                      <span>{item.quantity} {item.unit}</span>
                    </div>
                    <b>{formatRiel(lineSubtotal(item))}</b>
                  </div>
                ))}
                <button type="button" onClick={() => setView("cart")}>Open Cart</button>
              </>
            ) : (
              <p>Wholesale, season, and farmer actions stay outside the small fresh cart.</p>
            )}
          </section>
        </aside>
      </section>

      <section className="alternate-flow-grid" aria-label="Other marketplace flows">
        {sideFlows.map((flow) => (
          <article
            className={`alternate-card alt-${flow.type} ${targetFlow === flow.type ? "is-targeted" : ""}`}
            data-flow={flow.type}
            key={flow.type}
          >
            <div>
              <span>{flow.title}</span>
              <small>{flow.subtitle}</small>
            </div>
            <img src={flow.image} alt={flow.en} />
            <h3>{flow.kh}</h3>
            <p>{flow.en}</p>
            <dl>
              <div><dt>Supplier</dt><dd>{flow.supplier}</dd></div>
              <div><dt>Province</dt><dd>{flow.province}</dd></div>
              <div><dt>Available</dt><dd>{flow.quantity}</dd></div>
              <div><dt>Price</dt><dd>{flow.oldPrice ? <><s>{flow.oldPrice}</s> {flow.price}</> : flow.price}</dd></div>
            </dl>
            <div className="alternate-actions">
              <button type="button" onClick={() => handleSideFlow(flow)}>{flow.cta}</button>
              {flow.altCta ? <button type="button" onClick={() => handleSideFlow(flow, true)}>{flow.altCta}</button> : null}
            </div>
          </article>
        ))}
      </section>

      <section className="buy-trust-row">
        {["Fresh & Quality", "Fair Price", "Safe Payment", "Fast Delivery", "Support Farmers", "Easy Returns"].map((item) => (
          <span key={item}><Icon name="leaf" /> {item}</span>
        ))}
      </section>

      {loading ? <div className="buy-loading" role="status">Loading...</div> : null}
      {toast ? <div className="buy-toast" role="status">{toast}</div> : null}

      {modalFlow ? (
        <div className="buy-modal-backdrop" role="presentation" onClick={() => setModalFlow(null)}>
          <section className="buy-modal" role="dialog" aria-modal="true" aria-label={modalFlow.cta} onClick={(event) => event.stopPropagation()}>
            <button type="button" className="buy-modal-close" aria-label="Close" onClick={() => setModalFlow(null)}>×</button>
            <img src={modalFlow.image} alt="" />
            <h2>{modalFlow.cta}</h2>
            <h3>{modalFlow.kh}</h3>
            <p>{modalFlow.en} · {modalFlow.supplier} · {modalFlow.province}</p>
            <div className="modal-flow-details">
              <span>Quantity <strong>{modalFlow.quantity}</strong></span>
              <span>Price <strong>{modalFlow.price}</strong></span>
            </div>
            {modalFlow.type === "farmer" ? (
              <p className="modal-note">Farmer profile opened. Buyers can view farm crops, province, rating, and contact details.</p>
            ) : (
              <form className="modal-request-form">
                <label>
                  Request quantity
                  <input placeholder={modalFlow.type === "wholesale" ? "Example: 1,000 kg" : "Example: 200 kg"} />
                </label>
                <label>
                  Buyer note
                  <textarea placeholder="Add price, delivery, or timing details" />
                </label>
              </form>
            )}
            <button
              type="button"
              onClick={() => {
                showToast(`${modalFlow.cta} request sent.`);
                setModalFlow(null);
              }}
            >
              {modalFlow.type === "farmer" ? "Done" : `Send ${modalFlow.cta}`}
            </button>
          </section>
        </div>
      ) : null}
    </main>
  );
}
