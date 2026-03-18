import type { FC } from "react";

const Header: FC = () => {
  return (
    <header
      className="hidden lg:flex items-center justify-between px-8 py-5 bg-white border-b border-slate-100 sticky top-0 z-30"
      id="desktop-header"
    >
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-800">
          나의 소비 현황
        </h1>
        <p className="text-slate-500 text-xs md:text-sm">
          오늘도 알뜰한 하루 보내세요!
        </p>
      </div>
    </header>
  );
};

export default Header;
