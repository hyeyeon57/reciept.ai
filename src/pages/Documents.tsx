import { useMemo, useRef, useState } from "react";
import { getMonthlySummary, type StoredReceipt } from "../lib/receiptStore";

function formatDate(dateStr: string) {
  // YYYY-MM-DD -> YYYY.MM.DD
  return dateStr.replace(/-/g, ".");
}

const Documents = () => {
  const pdfRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [message, setMessage] = useState<string>("");

  const { receipts } = getMonthlySummary();

  const receiptsSorted = useMemo(() => {
    return receipts.slice().sort((a, b) => (a.date < b.date ? -1 : 1));
  }, [receipts]);

  const receiptsGroupedByDate = useMemo(() => {
    const map = new Map<string, StoredReceipt[]>();
    receiptsSorted.forEach((r) => {
      const prev = map.get(r.date) ?? [];
      map.set(r.date, [...prev, r]);
    });
    return Array.from(map.entries());
  }, [receiptsSorted]);

  const handleDownloadPdf = async () => {
    try {
      setMessage("");
      if (!receiptsSorted.length) {
        setMessage("이번 달에 영수증이 없습니다.");
        return;
      }

      const missingImagesCount = receiptsSorted.filter((r) => !r.image).length;
      if (missingImagesCount > 0) {
        setMessage(
          `영수증 ${missingImagesCount}건은 이미지가 없어 PDF에 이미지가 포함되지 않을 수 있어요. (새로 등록 필요)`,
        );
      }

      setIsGenerating(true);

      // html2canvas + jsPDF는 동적 import로 초기 번들 부담 줄이기
      const html2canvasMod = await import("html2canvas");
      const html2canvas = html2canvasMod.default;

      const { jsPDF } = await import("jspdf");
      const element = pdfRef.current;
      if (!element) return;

      // 이미지가 완전히 로딩된 뒤 캡처해야 누락이 줄어듭니다.
      const imgs = Array.from(element.querySelectorAll("img"));
      await Promise.all(
        imgs.map((img) => {
          if (img instanceof HTMLImageElement && img.complete) return Promise.resolve();
          return new Promise<void>((resolve) => {
            if (!(img instanceof HTMLImageElement)) return resolve();
            img.onload = () => resolve();
            img.onerror = () => resolve();
          });
        }),
      );

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      while (heightLeft > 0) {
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
        position -= pdfHeight;

        if (heightLeft > 0) pdf.addPage();
      }

      const now = new Date();
      const fileName = `AI.Receipt_${now.getFullYear()}-${String(
        now.getMonth() + 1,
      ).padStart(2, "0")}-receipt.pdf`;
      pdf.save(fileName);
      setMessage("PDF 다운로드가 완료되었습니다.");
    } catch (e) {
      console.error(e);
      setMessage("PDF 생성에 실패했습니다. 콘솔을 확인해주세요.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <h1 className="text-xl font-bold text-slate-900 mb-2">
        제출 서류 자동 생성
      </h1>
      <p className="text-sm text-slate-500 mb-6">
        이번 달 기준으로 영수증 PDF와 회사 서식에 맞는 엑셀 파일을 생성하는
        화면입니다.
      </p>

      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
          <h2 className="text-sm font-semibold text-slate-900 mb-1">
            영수증 PDF 생성
          </h2>
          <p className="text-xs text-slate-500 mb-3">
            이번 달 영수증을 날짜순으로 묶어 하나의 PDF로 다운로드합니다.
          </p>
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isGenerating}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 disabled:opacity-60"
          >
            {isGenerating ? "PDF 생성 중..." : "PDF 다운로드"}
          </button>

          {message && <p className="text-xs text-slate-600 mt-3">{message}</p>}
        </div>

        <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
          <h2 className="text-sm font-semibold text-slate-900 mb-1">
            엑셀 파일 생성
          </h2>
          <p className="text-xs text-slate-500 mb-3">
            회사 엑셀 템플릿에 맞춰 날짜 / 상호명 / 금액 / 카테고리를 자동 기입합니다.
          </p>
          <button className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800">
            엑셀 다운로드 (데모)
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4 bg-white">
          <h2 className="text-sm font-semibold text-slate-900 mb-1">
            제출 전 미리보기
          </h2>
          <p className="text-xs text-slate-500 mb-3">
            실제 서비스에서는 여기서 데이터를 테이블 형태로 확인하고, 필요 시
            수정한 뒤 제출할 수 있습니다.
          </p>
          <div className="h-32 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-xs text-slate-400">
            미리보기 영역 (데모)
          </div>
        </div>
      </div>

      {/* PDF 생성용(렌더링되지만 화면에서는 보이지 않도록 배치) */}
      <div
        className="absolute left-0 top-0 w-[760px] opacity-0 pointer-events-none"
        ref={pdfRef}
      >
        <div style={{ fontFamily: "Noto Sans KR, sans-serif" }}>
          <h2 className="text-base font-bold mb-2">AI.Receipt 제출용 영수증</h2>
          <p className="text-xs text-slate-600 mb-4">
            이번 달 영수증을 날짜순으로 묶어서 PDF로 생성했습니다.
          </p>

          <div className="space-y-4">
            {receiptsGroupedByDate.length === 0 ? (
              <p className="text-xs text-slate-500">이번 달에 영수증이 없습니다.</p>
            ) : (
              receiptsGroupedByDate.map(([date, list]) => (
                <div key={date} className="border border-slate-200 rounded-xl p-3">
                  <p className="text-sm font-semibold text-slate-800 mb-2">
                    {formatDate(date)}
                  </p>
                  <div className="space-y-2">
                    {list.map((r) => (
                      <div
                        key={r.id}
                        className="rounded-lg border border-slate-200 p-2 flex items-start justify-between gap-4"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-slate-900 truncate">
                            {r.merchantName}
                          </p>
                          <p className="text-[11px] text-slate-600">
                            카테고리: {r.category}
                          </p>
                          {r.tags?.length ? (
                            <p className="text-[11px] text-slate-600">
                              #{r.tags.join(" #")}
                            </p>
                          ) : null}
                        </div>
                        <div className="w-[150px] flex flex-col items-end gap-1">
                          {r.image ? (
                            <img
                              src={r.image}
                              alt="영수증 이미지"
                              className="w-[140px] h-[90px] object-cover rounded-md border border-slate-200 bg-white"
                            />
                          ) : (
                            <div className="w-[140px] h-[90px] rounded-md border border-slate-200 bg-slate-50 flex items-center justify-center text-[10px] text-slate-400">
                              이미지 없음
                            </div>
                          )}
                          <p className="text-xs font-bold text-slate-900 whitespace-nowrap">
                            {r.amount.toLocaleString()}원
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;

