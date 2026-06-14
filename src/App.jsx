import { useEffect, useState } from "react";
import AnnouncementBar from "./components/AnnouncementBar.jsx";
import MarketNavbar from "./components/MarketNavbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import FreshLanding from "./pages/FreshLanding.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import BuyFlowPage from "./pages/BuyFlowPage.jsx";

// Hash convention:
//   route hashes start with "/"  →  "#/" (Welcome entry), "#/market" (marketplace)
//   a route may carry a section anchor as a 2nd hash: "#/market#upcoming"
//   plain anchors (no leading "/") are left to the browser for native scrolling.
function parseHash() {
  const raw = window.location.hash.replace(/^#/, "");
  if (!raw.startsWith("/")) return null; // plain in-page anchor → ignore in router
  const i = raw.indexOf("#");
  const path = (i >= 0 ? raw.slice(0, i) : raw) || "/";
  const anchor = i >= 0 ? raw.slice(i + 1) : "";
  const route = path.startsWith("/buy") ? "buy" : path.startsWith("/profile") ? "profile" : path.startsWith("/search") ? "search" : path.startsWith("/market") ? "market" : "welcome";
  return { route, anchor };
}

export default function App() {
  const [state, setState] = useState(() => parseHash() || { route: "welcome", anchor: "" });

  useEffect(() => {
    const onHash = () => {
      const next = parseHash();
      if (next) setState(next); // only react to route hashes; plain anchors scroll natively
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const { route, anchor } = state;

  useEffect(() => {
    if (anchor) {
      const t = setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 140);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [route, anchor]);

  return (
    <>
      <AnnouncementBar />
      <MarketNavbar route={route} />
      {route === "buy" ? <BuyFlowPage /> : route === "profile" ? <ProfilePage /> : route === "search" ? <SearchPage /> : route === "market" ? <HomePage /> : <FreshLanding />}
    </>
  );
}
