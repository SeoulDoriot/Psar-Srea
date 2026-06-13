import { Reveal } from "../hooks/useReveal.js";

const quickLinks = ["Home", "Market", "Farm Zone Map", "For Farmers", "About Us"];
const resources = ["Privacy Policy", "Terms & Conditions", "Blog", "Farmer Guide"];

const socials = [
  { key: "telegram", label: "Telegram", path: "M9.8 15.6l-.4 4.2c.5 0 .8-.2 1.1-.5l2.6-2.5 5.4 4c1 .5 1.7.3 1.9-.9l3.5-16.4c.3-1.3-.5-1.9-1.4-1.5L1.7 9.9C.4 10.4.4 11.2 1.5 11.5l5.1 1.6L18.6 5.6c.6-.4 1.1-.2.7.2L9.8 15.6z" },
  { key: "facebook", label: "Facebook", path: "M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0022 12z" },
  { key: "instagram", label: "Instagram", path: "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.1.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.1-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.1-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.1 1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.2A6.6 6.6 0 1018.6 12 6.6 6.6 0 0012 5.4zm0 10.9A4.3 4.3 0 1116.3 12 4.3 4.3 0 0112 16.3zm6.8-11.2a1.5 1.5 0 11-1.5-1.5 1.5 1.5 0 011.5 1.5z" },
  { key: "linkedin", label: "LinkedIn", path: "M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.3 18.3v-7H6v7h2.3zM7.1 9.9a1.3 1.3 0 10 0-2.6 1.3 1.3 0 000 2.6zM18.3 18.3v-3.8c0-2-1.1-3-2.5-3a2.2 2.2 0 00-2 1.1v-1H11.5c0 .7 0 7 0 7h2.3v-3.9c0-.2 0-.4.1-.6a1.2 1.2 0 011.2-.8c.8 0 1.2.6 1.2 1.6v3.7h2z" },
];

const crops = ["🍅", "🌶️", "🥬", "🥕", "🌽", "🥭"];

export default function FooterSection() {
  return (
    <footer className="footer-section page-section" id="contact">
      <div className="footer-layout">
        <Reveal className="footer-brand-card">
          <a className="brand-mark" href="#top" aria-label="Phsar Srae home">
            <span className="brand-icon" aria-hidden="true">
              <span />
            </span>
            <span>
              <strong>ផ្សារស្រែ</strong>
              <em>Phsar Srae</em>
              <small>The Field Market</small>
            </span>
          </a>

          <h2>Get in Touch</h2>
          <p>
            Connecting Cambodian farmers directly to buyers with fair prices,
            trusted supply, and better market access.
          </p>
          <a className="button button-primary footer-join" href="#for-farmers">
            Join Phsar Srae
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <div className="footer-landscape" aria-hidden="true">
            <svg viewBox="0 0 600 160" preserveAspectRatio="none">
              <path d="M0 90 Q150 40 320 78 T600 64 V160 H0 Z" fill="#9ecb7a" opacity="0.5" />
              <path d="M0 120 Q180 80 360 110 T600 100 V160 H0 Z" fill="#5c9b61" opacity="0.55" />
              <circle cx="500" cy="44" r="26" fill="#ffd98a" opacity="0.7" />
              <path d="M70 130l10-26 10 26z M96 130l8-20 8 20z" fill="#2f6842" opacity="0.55" />
            </svg>
          </div>
        </Reveal>

        <div className="footer-side">
          <Reveal className="footer-links-card" delay={80}>
            <div>
              <h3>Quick Links</h3>
              {quickLinks.map((item) => (
                <a href="#top" key={item}>{item}</a>
              ))}
            </div>
            <div>
              <h3>Contact</h3>
              <a href="tel:+85512345678">+855 12 345 678</a>
              <a href="mailto:hello@phsarsrae.com">hello@phsarsrae.com</a>
              <span>Phnom Penh, Cambodia</span>
            </div>
            <div>
              <h3>Resources</h3>
              {resources.map((item) => (
                <a href="#top" key={item}>{item}</a>
              ))}
            </div>
          </Reveal>

          <Reveal className="footer-social-card" delay={160}>
            <div className="footer-crops footer-crops-left" aria-hidden="true">
              {crops.slice(0, 3).map((c, i) => (
                <span key={i}>{c}</span>
              ))}
            </div>
            <div className="footer-social-icons">
              {socials.map((s) => (
                <a href="#top" key={s.key} aria-label={s.label} className="social-btn">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
            <div className="footer-crops footer-crops-right" aria-hidden="true">
              {crops.slice(3).map((c, i) => (
                <span key={i}>{c}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <p className="footer-bottom">© Copyright Phsar Srae. All rights reserved. 2026</p>
    </footer>
  );
}
