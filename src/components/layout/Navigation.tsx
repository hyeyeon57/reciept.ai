import { NavLink } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="lg:hidden sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <NavLink to="/" className="font-bold text-blue-600 text-lg">
          AI.Receipt
        </NavLink>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="text-slate-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <FontAwesomeIcon icon={faBars} className="text-xl" />
        </button>
      </div>
    </header>
  );
}

