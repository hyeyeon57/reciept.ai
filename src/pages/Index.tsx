import "@/styles/personal-finance-dashboard-2.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";
import ProfileCardPanel from "@/components/Index/ProfileCardPanel";
import Sidebar from "@/components/layout/Sidebar";
import SpendingDonutChart from "@/components/Index/SpendingDonutChart";
import TransactionsPanel from "@/components/Index/TransactionsPanel";

const Index = () => {
  return (
    <div className="bg-white text-slate-800 h-full min-h-screen flex flex-col lg:flex-row overflow-x-hidden">
      <Sidebar />
      <main className="flex-1 lg:ml-64 h-full min-h-screen relative overflow-y-auto pb-20 lg:pb-0">
        <Navigation />
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <ProfileCardPanel />
            <TransactionsPanel />
          </div>
        </div>
        <Footer />
        <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">
          이번달 지출 분석
        </h3>
        <SpendingDonutChart />
      </main>
    </div>
  );
};

export default Index;
