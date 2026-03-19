import "@/styles/personal-finance-dashboard-2.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";
import ProfileCardPanel from "@/components/Index/ProfileCardPanel";
import Sidebar from "@/components/layout/Sidebar";
import SpendingDonutChart from "@/components/Index/SpendingDonutChart";
import TransactionsPanel from "@/components/Index/TransactionsPanel";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 영수증 등록 후 홈으로 왔을 때, 마운트된 뒤에 갱신 이벤트를 보내서 최근기록/도넛/한도가 반영되게 함
  useEffect(() => {
    const state = location.state as { fromUpload?: boolean } | undefined;
    if (location.pathname === "/" && state?.fromUpload) {
      const t = setTimeout(() => {
        window.dispatchEvent(new Event("receipts-updated"));
      }, 50);
      navigate(".", { replace: true, state: {} });
      return () => clearTimeout(t);
    }
  }, [location.pathname, location.state, navigate]);

  return (
    <div className="bg-white text-slate-800 min-h-screen flex flex-col lg:flex-row overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        <main className="flex-1 relative overflow-y-auto pb-8">
          <Navigation />
          <Header />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <ProfileCardPanel />
              <TransactionsPanel />
            </div>
          </div>
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 lg:pb-10">
            <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">
              이번달 지출 분석
            </h3>
            <div className="bg-white rounded-3xl p-4 md:p-6 lg:shadow-sm lg:border lg:border-slate-100">
              <SpendingDonutChart />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
