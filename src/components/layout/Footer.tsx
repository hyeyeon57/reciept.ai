import type { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-8 px-8 mt-auto hidden lg:block">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
        <p id="idjuar">© 2024 AI.Receipt Inc. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a className="hover:text-blue-600" href="#">
            이용약관
          </a>
          <a className="hover:text-blue-600" href="#">
            개인정보처리방침
          </a>
          <a className="hover:text-blue-600" href="#">
            고객센터
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
