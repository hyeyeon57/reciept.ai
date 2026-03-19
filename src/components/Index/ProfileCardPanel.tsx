import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import mascotImg from "../../../img/img1.png";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getMonthlySummary } from "../../lib/receiptStore";

const ProfileCardPanel = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const [summary, setSummary] = useState(() => getMonthlySummary());

  useEffect(() => {
    const refresh = () => setSummary(getMonthlySummary());
    refresh();

    window.addEventListener("receipts-updated", refresh);
    return () => window.removeEventListener("receipts-updated", refresh);
  }, [location.pathname]);

  const { spent, remaining, budget } = summary;
  const progress =
    budget > 0 ? Math.min(100, Math.round((spent / budget) * 100)) : 0;

  const statusMessage =
    spent >= budget
      ? "이번 달 금액 20만원을 다 사용했어요."
      : `이번 달 ${spent.toLocaleString()}원 사용했어요.`;

  return (
    <>
      <div className="lg:col-span-5 flex flex-col items-center" id="section-1">
        <div className="flex flex-col items-center mb-8">
          <div className="speech-bubble mb-4">{remaining.toLocaleString()}원 남았어요!</div>
          <img
            alt="귀여운 3D 캐릭터 마스코트"
            className="w-48 h-48 object-contain"
            src={mascotImg}
          />
        </div>
        <div className="bg-blue-50 rounded-2xl border border-blue-100 text-center p-6 w-full max-w-sm mb-4">
          <p className="text-xs text-blue-600 mb-1">이번 달 식대 한도</p>
          <p className="text-2xl font-bold text-blue-700">
            {remaining.toLocaleString()}원
          </p>
          <p className="text-xs text-blue-400 mt-1">
            / {budget.toLocaleString()}원
          </p>
          <div className="mt-4">
            <div className="h-2 w-full bg-blue-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-blue-700 font-medium">{statusMessage}</p>
          </div>
        </div>
        <button
          className="w-full max-w-sm bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 border border-blue-100"
          onClick={() => navigate("/upload")}
        >
          <span className="text-base md:text-lg">영수증 등록하기</span>
          <FontAwesomeIcon icon={faPlus} className="text-xl" />
        </button>
        <div className="w-full max-w-sm mt-8"></div>
      </div>
    </>
  );
};

export default ProfileCardPanel;
