import { NavLink } from "react-router-dom";
import {
  faBars,
  faChartPie,
  faFileInvoiceDollar,
  faHouse,
  faUser,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { to: "/", label: "홈", icon: faHouse },
    { to: "/upload", label: "영수증 등록하기", icon: faChartPie },
    { to: "/expenses", label: "상세 영수증 내역 보기", icon: faWallet },
    { to: "/documents", label: "제출 서류 생성", icon: faFileInvoiceDollar },
    { to: "/login", label: "로그아웃", icon: faUser },
  ];

  return (
    <div className="lg:hidden relative">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <NavLink to="/" className="font-bold text-blue-600 text-lg">
            AI.Receipt
          </NavLink>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="text-slate-800"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label="Toggle mobile menu"
          >
            <FontAwesomeIcon icon={faBars} className="text-xl" />
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full z-50 bg-white border-b border-slate-100 shadow-sm">
          <nav className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors",
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-500 hover:bg-slate-100",
                  ].join(" ")
                }
              >
                <FontAwesomeIcon icon={item.icon} className="w-5 text-center" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

