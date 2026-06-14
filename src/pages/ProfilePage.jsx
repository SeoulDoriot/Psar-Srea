import { useMemo, useState } from "react";

const buyerOrders = [
  {
    id: "#PSR-2024-000245",
    crop: "ស្វាយកែវរមៀត",
    en: "Keo Romeat Mango",
    farmer: "Sok Chan Farm",
    quantity: "2 kg",
    status: "Completed",
    price: "1,000៛",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "#PSR-2024-000244",
    crop: "ប៉េងប៉ោះ",
    en: "Tomato",
    farmer: "Dara Farm",
    quantity: "1 kg",
    status: "Delivering",
    price: "900៛",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "#PSR-2024-000243",
    crop: "ចេកអំបូង",
    en: "Banana",
    farmer: "Lina Organic Farm",
    quantity: "3 kg",
    status: "Confirmed",
    price: "3,000៛",
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=500&q=80",
  },
];

const savedFarmers = [
  {
    name: "Sok Chan Farm",
    kh: "សុខ ចាន់",
    province: "Kampong Speu",
    crops: "Mango, Banana",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1595351298020-038700609878?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Lina Organic Farm",
    kh: "លីណា",
    province: "Kampong Cham",
    crops: "Banana, Longan",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1520052205864-92d242b3a76b?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Vireak Farm",
    kh: "វីរៈ",
    province: "Prey Veng",
    crops: "Vegetables",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=500&q=80",
  },
];

const savedCrops = [
  {
    kh: "ស្វាយ",
    en: "Mango",
    price: "500៛/kg",
    province: "Kampong Speu",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=500&q=80",
  },
  {
    kh: "ប៉េងប៉ោះ",
    en: "Tomato",
    price: "900៛/kg",
    province: "Takeo",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80",
  },
  {
    kh: "ចេក",
    en: "Banana",
    price: "1,000៛/kg",
    province: "Kampong Cham",
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=500&q=80",
  },
];

const cropListings = [
  {
    kh: "ប៉េងប៉ោះ",
    en: "Tomato",
    quantity: "120 kg",
    price: "900៛/kg",
    status: "Active",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80",
  },
  {
    kh: "ម្ទេស",
    en: "Chilli",
    quantity: "80 kg",
    price: "1,200៛/kg",
    status: "Active",
    image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=500&q=80",
  },
  {
    kh: "ត្រសក់",
    en: "Cucumber",
    quantity: "60 kg",
    price: "850៛/kg",
    status: "Low stock",
    image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=500&q=80",
  },
];

const buyerRequests = [
  { buyer: "Restaurant ABC", crop: "Tomato", quantity: "100 kg", price: "1,000៛/kg", status: "Pending" },
  { buyer: "Hotel Green", crop: "Cucumber", quantity: "200 kg", price: "850៛/kg", status: "Confirmed" },
  { buyer: "Fresh Mart", crop: "Chilli", quantity: "70 kg", price: "1,200៛/kg", status: "New" },
];

const tabs = ["Overview", "Orders", "Saved", "Settings"];
const menu = ["Overview", "Orders", "Saved Farmers", "Saved Crops", "Addresses", "Payment Methods", "Settings", "Help & Support"];

function Icon({ name }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true };
  const paths = {
    overview: <path d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-5v-6h-4v6H5a1 1 0 01-1-1v-9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />,
    orders: <path d="M7 4h10l1 17H6L7 4zM9 8h6M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
    saved: <path d="M12 20s-7-4.3-7-10a4 4 0 017-2.7A4 4 0 0119 10c0 5.7-7 10-7 10z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />,
    settings: <path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM19.4 15a8 8 0 00.1-1l2-1.5-2-3.5-2.4 1a8.3 8.3 0 00-1.7-1L15 6.4h-4L10.6 9a8.3 8.3 0 00-1.7 1l-2.4-1-2 3.5 2 1.5a8 8 0 000 2l-2 1.5 2 3.5 2.4-1a8.3 8.3 0 001.7 1l.4 2.6h4l.4-2.6a8.3 8.3 0 001.7-1l2.4 1 2-3.5-2.1-1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
    location: <path d="M12 21s7-5.3 7-11a7 7 0 10-14 0c0 5.7 7 11 7 11zM12 12.4a2.4 2.4 0 100-4.8 2.4 2.4 0 000 4.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />,
    phone: <path d="M6.6 4.5l2.1-.8 2.1 4-1.6 1.2c.9 1.8 2.1 3.1 3.9 4l1.2-1.6 4 2.1-.8 2.1c-.4 1.1-1.5 1.8-2.7 1.5C9.6 15.8 5.2 11.4 4 6.2c-.3-1.2.5-2.3 1.6-2.7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />,
    crop: <path d="M5 19c8 0 13-5 14-14C10 6 5 11 5 19zm0 0c3-5 7-8 12-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
    support: <path d="M4 13a8 8 0 0116 0v4a2 2 0 01-2 2h-2v-6h4M4 17a2 2 0 002 2h2v-6H4v4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />,
  };
  return <svg {...common}>{paths[name] || paths.overview}</svg>;
}

function StatusPill({ children, tone = "green" }) {
  return <span className={`profile-pill pill-${tone}`}>{children}</span>;
}

function EmptyState({ title, text }) {
  return (
    <div className="profile-empty">
      <Icon name="crop" />
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}

function SectionCard({ title, action, children, className = "" }) {
  return (
    <section className={`profile-section-card ${className}`}>
      <div className="profile-section-head">
        <h2>{title}</h2>
        {action ? <button type="button">{action}</button> : null}
      </div>
      {children}
    </section>
  );
}

function BuyerOverview() {
  return (
    <>
      <SectionCard title="Recent Orders" action="See all orders" className="orders-card">
        {buyerOrders.length ? (
          <div className="profile-order-list">
            {buyerOrders.map((order) => (
              <article className="profile-order-row" key={order.id}>
                <img src={order.image} alt={order.en} />
                <div>
                  <strong>{order.id}</strong>
                  <span>{order.crop}</span>
                  <small>{order.en} · {order.farmer} · {order.quantity}</small>
                </div>
                <StatusPill tone={order.status === "Delivering" ? "blue" : order.status === "Confirmed" ? "gold" : "green"}>{order.status}</StatusPill>
                <b>{order.price}</b>
                <button type="button">View Order</button>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState title="No recent orders" text="Fresh product orders will appear here after checkout." />
        )}
      </SectionCard>

      <SectionCard title="Saved Farmers" action="See all">
        {savedFarmers.length ? (
          <div className="saved-farmer-grid">
            {savedFarmers.map((farmer) => (
              <article className="saved-farmer-card" key={farmer.name}>
                <img src={farmer.image} alt={farmer.name} />
                <strong>{farmer.name}</strong>
                <span>{farmer.kh}</span>
                <small>{farmer.province} · {farmer.crops}</small>
                <div className="rating-row"><span>Star</span> {farmer.rating}</div>
                <button type="button">View Profile</button>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState title="No saved farmers" text="Save farms from Search or product details to find them quickly." />
        )}
      </SectionCard>

      <SectionCard title="Saved Crops" action="See all">
        {savedCrops.length ? (
          <div className="saved-crop-grid">
            {savedCrops.map((crop) => (
              <article className="saved-crop-card" key={crop.en}>
                <img src={crop.image} alt={crop.en} />
                <strong>{crop.kh}</strong>
                <span>{crop.en}</span>
                <small>{crop.price} · {crop.province}</small>
                <button type="button">Buy Again</button>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState title="No saved crops" text="Saved fresh crops and deals will be ready here." />
        )}
      </SectionCard>
    </>
  );
}

function FarmerOverview() {
  return (
    <>
      <SectionCard title="My Crop Listings" action="Add listing">
        {cropListings.length ? (
          <div className="listing-grid">
            {cropListings.map((listing) => (
              <article className="listing-card" key={listing.en}>
                <img src={listing.image} alt={listing.en} />
                <div>
                  <strong>{listing.kh}</strong>
                  <span>{listing.en}</span>
                  <small>Available: {listing.quantity}</small>
                </div>
                <b>{listing.price}</b>
                <StatusPill tone={listing.status === "Low stock" ? "gold" : "green"}>{listing.status}</StatusPill>
                <div className="listing-actions">
                  <button type="button">Edit</button>
                  <button type="button">Mark Sold</button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState title="No active listings" text="Add your fresh crops when they are ready for buyers." />
        )}
      </SectionCard>

      <SectionCard title="Buyer Requests" action="See all">
        <div className="request-list">
          {buyerRequests.map((request) => (
            <article className="request-row" key={`${request.buyer}-${request.crop}`}>
              <div className="request-avatar">{request.buyer.slice(0, 1)}</div>
              <div>
                <strong>{request.buyer}</strong>
                <span>{request.crop} · {request.quantity}</span>
              </div>
              <b>{request.price}</b>
              <StatusPill tone={request.status === "Pending" ? "gold" : "green"}>{request.status}</StatusPill>
              <button type="button">Confirm Order</button>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Telegram Support">
        <div className="support-card">
          <Icon name="support" />
          <div>
            <strong>Connected</strong>
            <p>Order alerts, buyer messages, and payment confirmations are sent to Telegram.</p>
          </div>
          <StatusPill>Active</StatusPill>
        </div>
      </SectionCard>

      <SectionCard title="Land for Contract Farming" action="See all">
        <div className="land-card">
          <div>
            <StatusPill tone="blue">1 land available</StatusPill>
            <strong>1.5 ha · Takeo</strong>
            <span>Water access: canal and well</span>
            <span>Suitable: tomato, chilli, cucumber</span>
            <small>Available from August 2026</small>
          </div>
          <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80" alt="Contract farming land" />
          <div className="land-actions">
            <button type="button">Add Land</button>
            <button type="button">Match Buyer</button>
          </div>
        </div>
      </SectionCard>
    </>
  );
}

function UtilityCards({ mode }) {
  return (
    <div className="profile-utility-grid">
      <SectionCard title="Delivery Addresses" action="See all">
        <div className="utility-line">
          <Icon name="location" />
          <div>
            <strong>Home Address</strong>
            <span>#12, St. 2004, Phnom Penh</span>
            <small>Phone: 012 345 678</small>
          </div>
          <StatusPill>Default</StatusPill>
        </div>
        <button type="button" className="profile-outline-btn">Add New Address</button>
      </SectionCard>

      <SectionCard title="Payment Methods" action="See all">
        <div className="utility-stack">
          <span>Cash on Delivery <StatusPill>Default</StatusPill></span>
          <span>ABA Bank ending 1234</span>
          <span>KHQR placeholder</span>
        </div>
        <button type="button" className="profile-outline-btn">Add Payment Method</button>
      </SectionCard>

      <SectionCard title="Notifications">
        <div className="notification-list">
          {["Order updates", "New deals", mode === "buyer" ? "Messages from farmers" : "Buyer requests"].map((item) => (
            <label key={item}>
              <span>{item}</span>
              <input type="checkbox" defaultChecked />
            </label>
          ))}
        </div>
        <button type="button" className="profile-outline-btn">Manage All</button>
      </SectionCard>

      <SectionCard title="Account Settings">
        <div className="settings-list">
          <button type="button">Language <span>ភាសាខ្មែរ</span></button>
          <button type="button">Phone Number <span>012 345 678</span></button>
          <button type="button">Privacy & Security <span>Open</span></button>
        </div>
        <button type="button" className="profile-outline-btn">Edit Profile</button>
      </SectionCard>
    </div>
  );
}

function MobilePreview({ mode }) {
  const isBuyer = mode === "buyer";
  return (
    <aside className="profile-phone-preview" aria-label={`${isBuyer ? "Buyer" : "Farmer"} mobile profile preview`}>
      <div className="phone-frame">
        <div className="phone-topbar">
          <span>Menu</span>
          <strong>My Profile</strong>
          <span>Bell</span>
        </div>
        <div className="phone-profile-card">
          <img
            src={isBuyer ? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" : "https://images.unsplash.com/photo-1595351298020-038700609878?auto=format&fit=crop&w=300&q=80"}
            alt=""
          />
          <div>
            <strong>{isBuyer ? "Sreyneang Chhorn" : "Dara Farm"}</strong>
            <StatusPill>{isBuyer ? "Verified Buyer" : "Verified Farmer"}</StatusPill>
            <span>{isBuyer ? "Phnom Penh, Cambodia" : "Takeo Province"}</span>
          </div>
        </div>
        <div className="phone-tabs">
          {tabs.map((tab) => <span key={tab} className={tab === "Overview" ? "active" : ""}>{tab}</span>)}
        </div>
        <div className="phone-list">
          {(isBuyer ? buyerOrders.slice(0, 2) : cropListings.slice(0, 2)).map((item) => (
            <article key={item.en || item.id}>
              <img src={item.image} alt="" />
              <div>
                <strong>{item.en}</strong>
                <span>{isBuyer ? item.quantity : `Available: ${item.quantity}`}</span>
                <b>{item.price}</b>
              </div>
              <StatusPill tone={isBuyer && item.status === "Delivering" ? "blue" : "green"}>{item.status}</StatusPill>
            </article>
          ))}
        </div>
        <div className="phone-bottom-nav">
          <span>Home</span>
          <span>Search</span>
          <span>Cart</span>
          <span className="active">Profile</span>
        </div>
      </div>
    </aside>
  );
}

export default function ProfilePage() {
  const [mode, setMode] = useState("buyer");
  const [tab, setTab] = useState("Overview");
  const isBuyer = mode === "buyer";
  const visibleTitle = useMemo(() => (isBuyer ? "Buyer Profile" : "Farmer Profile"), [isBuyer]);

  return (
    <main className="profile-page">
      <aside className="profile-sidebar" aria-label="Profile menu">
        <h1>My Profile</h1>
        <section className="profile-mode-card">
          <span>Choose account type</span>
          <div className="profile-mode-switch" role="group" aria-label="Choose profile mode">
            <button type="button" className={isBuyer ? "is-active" : ""} onClick={() => setMode("buyer")}>
              <Icon name="overview" /> Buyer
            </button>
            <button type="button" className={!isBuyer ? "is-active" : ""} onClick={() => setMode("farmer")}>
              <Icon name="crop" /> Farmer
            </button>
          </div>
        </section>
        <nav className="profile-menu">
          {menu.map((item, index) => (
            <button type="button" className={index === 0 ? "is-active" : ""} key={item}>
              <Icon name={index === 1 ? "orders" : index === 2 || index === 3 ? "saved" : index === 4 ? "location" : index === 6 ? "settings" : "overview"} />
              {item}
            </button>
          ))}
        </nav>
        <section className="profile-help-card">
          <Icon name="support" />
          <strong>Need help?</strong>
          <p>We're here to help you with orders, farms, and account questions.</p>
          <button type="button">Contact Support</button>
        </section>
      </aside>

      <section className="profile-main">
        <div className="profile-mobile-tabs" role="tablist" aria-label="Profile tabs">
          {tabs.map((item) => (
            <button type="button" className={tab === item ? "is-active" : ""} key={item} onClick={() => setTab(item)}>
              {item}
            </button>
          ))}
        </div>

        <section className={`profile-hero-card ${isBuyer ? "buyer-mode" : "farmer-mode"}`}>
          <div className="profile-identity">
            <img
              src={isBuyer ? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80" : "https://images.unsplash.com/photo-1595351298020-038700609878?auto=format&fit=crop&w=500&q=80"}
              alt={isBuyer ? "Sreyneang Chhorn" : "Dara Farm"}
            />
            <div>
              <div className="profile-title-row">
                <h2>{visibleTitle}</h2>
                <StatusPill>{isBuyer ? "Verified Buyer" : "Verified Farmer"}</StatusPill>
              </div>
              <h3>{isBuyer ? "Sreyneang Chhorn" : "Dara Farm"}</h3>
              <p>{isBuyer ? "ស្រីនាង ឈន · Phnom Penh, Cambodia" : "ដារ៉ា ហ្វាម · Takeo Province"}</p>
              <div className="profile-contact-row">
                <span><Icon name="phone" /> 012 345 678</span>
                <span><Icon name="location" /> {isBuyer ? "Phnom Penh" : "Takeo Province"}</span>
              </div>
              {!isBuyer ? <div className="main-crops">Main crops: Tomato, Chilli, Cucumber</div> : null}
            </div>
          </div>
          <div className="profile-account-type">
            <Icon name={isBuyer ? "overview" : "crop"} />
            <span>Account Type</span>
            <strong>{isBuyer ? "Buyer" : "Farmer"}</strong>
          </div>
        </section>

        <div className={`profile-content ${tab !== "Overview" ? "is-filtered" : ""}`}>
          {(tab === "Overview" || tab === "Orders" || tab === "Saved") && (isBuyer ? <BuyerOverview /> : <FarmerOverview />)}
          {(tab === "Overview" || tab === "Settings") && <UtilityCards mode={mode} />}
        </div>
      </section>

      <MobilePreview mode={mode} />
    </main>
  );
}
