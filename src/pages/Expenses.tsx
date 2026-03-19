import { useEffect, useMemo, useState } from "react";
import {
  getMonthlySummary,
  removeReceipt,
  type StoredReceipt,
} from "../lib/receiptStore";

type Category = "전체" | StoredReceipt["category"];

const Expenses = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("전체");

  const [receipts, setReceipts] = useState<StoredReceipt[]>([]);

  const refresh = () => {
    const { receipts: monthly } = getMonthlySummary();
    setReceipts(monthly.slice().sort((a, b) => (a.date < b.date ? 1 : -1)));
  };

  useEffect(() => {
    refresh();
  }, []);

  const filtered = useMemo(() => {
    const list =
      selectedCategory === "전체"
        ? receipts
        : receipts.filter((r) => r.category === selectedCategory);

    return list.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [receipts, selectedCategory]);

  const totalThisMonth = filtered.reduce((sum, r) => sum + r.amount, 0);

  const groupedByDate = useMemo(() => {
    const map = new Map<string, StoredReceipt[]>();
    filtered.forEach((r) => {
      const key = r.date;
      const prev = map.get(key) ?? [];
      map.set(key, [...prev, r]);
    });
    return Array.from(map.entries()).sort((a, b) => (a[0] < b[0] ? 1 : -1));
  }, [filtered]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <h1 className="text-xl font-bold text-slate-900 mb-2">상세 영수증 내역</h1>
      <p className="text-sm text-slate-500 mb-4">
        이번 달 기준으로 날짜별/건별 지출을 확인할 수 있습니다. (현재는 카테고리 필터만 지원)
      </p>
      <p className="text-xs text-slate-400 mb-3">
        이번 달 등록된 영수증: <span className="font-semibold">{receipts.length}</span>건
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {(["전체", "식당", "카페", "편의점"] as Category[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border ${
              selectedCategory === cat
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-slate-50 text-slate-600 border-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mb-4 text-sm text-slate-600">
        이번 달 지출 합계:{" "}
        <span className="font-semibold">{totalThisMonth.toLocaleString()}원</span>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500">
          이번 달에 표시할 영수증이 없습니다.
        </div>
      ) : (
        <div className="space-y-4">
          {groupedByDate.map(([date, list]) => (
            <div key={date} className="space-y-2">
              <p className="text-xs text-slate-400 mb-1">
                {date.replace(/-/g, ".")}
              </p>
              {list.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-2xl transition-colors"
                >
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">
                      {expense.merchantName}
                    </p>
                    <p className="text-xs text-slate-500">{expense.category}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-bold text-slate-900 text-sm">
                      -{expense.amount.toLocaleString()}원
                    </p>
                    <button
                      type="button"
                      aria-label="영수증 삭제"
                      className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs"
                      onClick={() => {
                        const ok = window.confirm("이 영수증 기록을 삭제할까요?");
                        if (!ok) return;
                        removeReceipt(expense.id);
                        refresh();
                      }}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Expenses;

