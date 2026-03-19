import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBreadSlice,
  faChevronDown,
  faTrash,
  faMugHot,
  faStore,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import {
  getMonthlySummary,
  removeReceipt,
  type StoredReceipt,
} from "../../lib/receiptStore";
import { useLocation } from "react-router-dom";

const getCategoryIcon = (category: StoredReceipt["category"]) => {
  if (category === "카페") return { icon: faMugHot, className: "bg-amber-100 text-amber-600" };
  if (category === "편의점") return { icon: faStore, className: "bg-purple-100 text-purple-600" };
  return { icon: faUtensils, className: "bg-green-100 text-green-600" };
};

const TransactionsPanel = () => {
  const [receipts, setReceipts] = useState<StoredReceipt[]>([]);
  const [showAll, setShowAll] = useState(false);
  const VISIBLE_DEFAULT = 6;
  const location = useLocation();

  const refresh = () => {
    const { receipts: monthly } = getMonthlySummary();
    setReceipts(monthly.slice().sort((a, b) => (a.date < b.date ? 1 : -1)));
  };

  useEffect(() => {
    refresh();
  }, [location.pathname]);

  useEffect(() => {
    const handler = () => refresh();
    window.addEventListener("receipts-updated", handler);
    return () => window.removeEventListener("receipts-updated", handler);
  }, []);

  const hasData = receipts.length > 0;
  const showCount = showAll ? receipts.length : Math.min(VISIBLE_DEFAULT, receipts.length);
  const visibleReceipts = receipts.slice(0, showCount);
  const hasMore = receipts.length > VISIBLE_DEFAULT;

  return (
    <>
      <div className="lg:col-span-7" id="section-2">
        <div className="bg-white rounded-3xl p-4 md:p-6 lg:shadow-sm lg:border lg:border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800">최근 기록보기</h2>
            </div>
          </div>
          {!hasData && (
            <p className="text-xs text-slate-400">
              아직 이번 달에 등록된 영수증이 없습니다.
            </p>
          )}
          {hasData && (
            <div className="space-y-4 overflow-x-auto">
              {visibleReceipts.map((r) => {
                const { icon, className } = getCategoryIcon(r.category);

                return (
                  <div
                    key={r.id}
                    className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-2xl transition-colors group min-w-[300px]"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`category-icon ${className} group-hover:scale-110 transition-transform`}
                      >
                        <FontAwesomeIcon icon={icon} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-sm md:text-base">
                          {r.merchantName}
                        </h3>
                        <p className="text-xs text-slate-400">
                          {r.date.replace(/-/g, ".")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-bold text-slate-800 text-sm md:text-base">
                          -{r.amount.toLocaleString()}원
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-label="영수증 삭제"
                        className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const ok = window.confirm("이 영수증 기록을 삭제할까요?");
                          if (!ok) return;
                          removeReceipt(r.id);
                          setShowAll(false);
                          refresh();
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {hasMore && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="w-full mt-6 py-3 text-sm text-slate-500 font-medium hover:text-blue-600 transition-colors flex items-center justify-center gap-2 bg-slate-100 rounded-xl"
            >
              {showAll ? "접기" : "더 보기"}{" "}
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`text-xs transition-transform ${showAll ? "rotate-180" : ""}`}
              />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default TransactionsPanel;
