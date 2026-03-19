import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addReceipts, type ReceiptCategory } from "../lib/receiptStore";
import { toast } from "@/hooks/use-toast";

type Category = ReceiptCategory;

interface ReceiptForm {
  merchantName: string;
  date: string;
  amount: string;
  category: Category;
  tags: string[];
}

interface ReceiptDraft {
  id: number;
  image: string;
  form: ReceiptForm;
  status: "analyzing" | "ready" | "error";
}

const ReceiptUpload = () => {
  const [drafts, setDrafts] = useState<ReceiptDraft[]>([]);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const getLocalDateISO = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file, index) => {
      if (!file.type.startsWith("image/")) {
        return;
      }
      const id = Date.now() + index;
      const reader = new FileReader();
      reader.onload = () => {
        const image = reader.result as string;
        setDrafts((prev) => [
          ...prev,
          {
            id,
            image,
            status: "analyzing",
            form: {
              merchantName: "",
              date: "",
              amount: "",
              category: "식당",
              tags: [],
            },
          },
        ]);
        // 더미 AI 분석: 파일별로 약간 다른 값 채워주기
        setTimeout(() => {
          const restaurantNames = [
            "김밥천국 합정점",
            "한성분식 합정점",
            "롯데리아 합정점",
            "맥도날드 합정점",
          ];
          const cafeNames = [
            "스타벅스 합정점",
            "투썸플레이스 합정점",
            "이디야커피 합정점",
            "빽다방 합정점",
          ];
          const category: Category = index % 2 === 0 ? "식당" : "카페";
          const namePool = category === "식당" ? restaurantNames : cafeNames;
          const merchantName = namePool[index % namePool.length];

          setDrafts((prev) =>
            prev.map((d) =>
              d.id === id
                ? {
                    ...d,
                    status: "ready",
                    form: {
                      merchantName,
                      date: getLocalDateISO(),
                      amount: (8500 + index * 1000).toString(),
                      category,
                      tags: ["점심", "팀회식", "베이커리"].slice(0, (index % 3) + 1),
                    },
                  }
                : d,
            ),
          );
        }, 1200 + index * 300);
      };
      reader.readAsDataURL(file);
    });

    if (files.length > 1) {
      setMessage(`${files.length}개의 영수증을 한 번에 업로드했습니다.`);
    } else {
      setMessage("영수증을 업로드했습니다. 분석 결과를 확인해주세요.");
    }
  };

  const updateDraftForm = (
    id: number,
    field: keyof ReceiptForm,
    value: string | Category,
  ) => {
    setDrafts((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              form: { ...d.form, [field]: value },
            }
          : d,
      ),
    );
  };

  const updateTags = (id: number, tagsValue: string) => {
    const tags = tagsValue
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    setDrafts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, form: { ...d.form, tags } } : d)),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (drafts.length === 0) {
      setMessage("먼저 영수증 이미지를 업로드해주세요.");
      return;
    }
    const invalid = drafts.find(
      (d) => !d.form.merchantName || !d.form.date || !d.form.amount,
    );
    if (invalid) {
      setMessage("모든 영수증의 상호명, 날짜, 금액을 확인해주세요.");
      return;
    }

    // 로컬스토리지에 영수증 저장
    addReceipts(
      drafts.map((d) => ({
        id: d.id,
        merchantName: d.form.merchantName,
        date: d.form.date,
        amount: Number(d.form.amount),
        category: d.form.category,
        tags: d.form.tags,
        image: d.image,
      })),
    );

    setMessage(`${drafts.length}건의 영수증이 등록되었습니다.`);
    toast({
      title: "등록완료되었습니다.",
      description:
        drafts.length > 1
          ? `${drafts.length}건이 저장되었어요.`
          : "1건이 저장되었어요.",
    });
    // 홈으로 이동하고, state로 "방금 등록함" 전달 → 홈 마운트 후 갱신 보장
    setTimeout(() => {
      navigate("/", { state: { fromUpload: true, count: drafts.length } });
    }, 150);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <h1 className="text-xl font-bold text-slate-900 mb-2">영수증 등록</h1>
      <p className="text-sm text-slate-500 mb-6">
        영수증 사진을 여러 장 업로드하면 AI가 각 영수증별로 상호명, 날짜, 금액,
        카테고리, 태그를 인식합니다.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-2">
              영수증 사진 업로드
            </span>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/40 transition-colors">
              <span className="text-sm text-slate-500 mb-2">
                JPG, PNG 영수증 이미지를 여러 장 선택할 수 있습니다.
              </span>
              <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold">
                파일 선택
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </label>

          {drafts.length > 0 && (
            <div className="mt-4 space-y-3">
              <p className="text-xs text-slate-500">업로드한 영수증 ({drafts.length}장)</p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {drafts.map((d) => (
                  <div
                    key={d.id}
                    className="w-28 h-36 rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 relative flex-shrink-0"
                  >
                    <img
                      src={d.image}
                      alt="영수증 미리보기"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded-full bg-slate-900/80 text-[10px] text-white">
                      {d.status === "analyzing" ? "분석 중" : "완료"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {drafts.length === 0 && (
            <p className="text-xs text-slate-400">
              먼저 왼쪽에서 영수증 이미지를 업로드하면, 각 영수증별로 항목이 생성됩니다.
            </p>
          )}

          {drafts.map((d, idx) => (
            <div
              key={d.id}
              className="rounded-2xl border border-slate-200 p-3 space-y-3 bg-white"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">
                  영수증 #{idx + 1}
                </span>
                <span className="text-[11px] text-slate-400">
                  상태: {d.status === "analyzing" ? "AI 분석 중" : "수정 가능"}
                </span>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  상호명(식당명)
                </label>
                <input
                  type="text"
                  value={d.form.merchantName}
                  onChange={(e) =>
                    updateDraftForm(d.id, "merchantName", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="예: 김밥천국 강남점"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    날짜
                  </label>
                  <input
                    type="date"
                    value={d.form.date}
                    onChange={(e) => updateDraftForm(d.id, "date", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    금액(원)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={d.form.amount}
                    onChange={(e) => updateDraftForm(d.id, "amount", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="예: 8500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    카테고리
                  </label>
                  <select
                    value={d.form.category}
                    onChange={(e) =>
                      updateDraftForm(d.id, "category", e.target.value as Category)
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="식당">식당</option>
                    <option value="카페">카페</option>
                    <option value="편의점">편의점</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    태그(쉼표로 구분)
                  </label>
                  <input
                    type="text"
                    value={d.form.tags.join(", ")}
                    onChange={(e) => updateTags(d.id, e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="예: 점심, 팀회식"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 text-white py-2.5 text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
            disabled={drafts.some((d) => d.status === "analyzing")}
          >
            {drafts.some((d) => d.status === "analyzing")
              ? "AI 분석이 끝날 때까지 기다리는 중..."
              : "선택한 영수증 모두 등록하기"}
          </button>

          {message && <p className="text-sm text-blue-600">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ReceiptUpload;

