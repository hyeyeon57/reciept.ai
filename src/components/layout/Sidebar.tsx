import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReceipt,
  faHouse,
  faChartPie,
  faWallet,
  faUser,
  faFileInvoiceDollar,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import profileImg from "../../../img/img2.jpg";

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { icon: faHouse, label: "홈", path: "/" },
    { icon: faChartPie, label: "영수증 등록하기", path: "/upload" },
    { icon: faWallet, label: "상세 영수증 내역 보기", path: "/expenses" },
    { icon: faFileInvoiceDollar, label: "제출 서류 생성", path: "/documents" },
    { icon: faUser, label: "로그아웃", path: "/login" },
  ];

  return (
    <aside
      className="hidden lg:flex flex-col w-64 h-screen bg-slate-50 border-r border-slate-200 fixed left-0 top-0 z-50"
      id="sidebar"
    >
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
          <FontAwesomeIcon icon={faReceipt} />
        </div>
        <span className="font-bold text-xl text-slate-800">AI.Receipt</span>
      </div>
      <div className="flex items-center gap-3 px-4 py-2">
        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
          <img alt="User" className="w-full h-full object-cover" src={profileImg} />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800">장혜연</p>
          <p className="text-xs text-slate-500">Premium Plan</p>
        </div>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                isActive
                  ? "text-blue-600 bg-blue-50"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className="w-5 text-center" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

