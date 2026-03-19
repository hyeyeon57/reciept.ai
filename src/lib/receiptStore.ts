export type ReceiptCategory = "식당" | "카페" | "편의점";

export interface StoredReceipt {
  id: number;
  merchantName: string;
  date: string; // ISO YYYY-MM-DD
  amount: number;
  category: ReceiptCategory;
  tags?: string[];
  // PDF 생성을 위해 영수증 이미지 dataURL을 저장합니다(로컬스토리지 용량 주의).
  image?: string;
}

const STORAGE_KEY = "ai-receipt-receipts";
const BUDGET = 200000;

export function loadReceipts(): StoredReceipt[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredReceipt[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveReceipts(receipts: StoredReceipt[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(receipts));
}

export function addReceipts(newOnes: StoredReceipt[]) {
  const current = loadReceipts();
  saveReceipts([...current, ...newOnes]);
}

export function removeReceipt(id: number) {
  const current = loadReceipts();
  const next = current.filter((r) => r.id !== id);
  saveReceipts(next);
}

export function getMonthlySummary(targetDate = new Date()) {
  const all = loadReceipts();
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth(); // 0-based

  const monthly = all.filter((r) => {
    // YYYY-MM-DD 를 로컬 기준으로 파싱합니다. (new Date('YYYY-MM-DD') 는 UTC로 해석되는 경우가 있어
    // 월이 어긋날 수 있음)
    const parts = r.date.split("-");
    if (parts.length !== 3) return false;
    const [y, m, d] = parts.map((x) => Number(x));
    const dt = new Date(y, m - 1, d);
    return dt.getFullYear() === year && dt.getMonth() === month;
  });

  const spent = monthly.reduce((sum, r) => sum + r.amount, 0);
  const remaining = Math.max(0, BUDGET - spent);

  return { receipts: monthly, spent, remaining, budget: BUDGET };
}

