import { useState } from "react";

type Step = "email" | "code" | "pin";

const Login = () => {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.endsWith("@di9.co.kr")) {
      setError("회사 이메일(@di9.co.kr)만 사용할 수 있습니다.");
      return;
    }
    setError("");
    // 실제 서비스에서는 여기서 인증 메일 발송
    setStep("code");
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || code.length < 4) {
      setError("이메일로 받은 인증 코드를 입력해주세요.");
      return;
    }
    setError("");
    setStep("pin");
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pin)) {
      setError("숫자 6자리 비밀번호를 입력해주세요.");
      return;
    }
    setError("");
    localStorage.setItem(
      "ai-receipt-auth",
      JSON.stringify({ email, pin, loggedInAt: new Date().toISOString() }),
    );
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">AI.Receipt</h1>
          <p className="text-sm text-slate-500">
            직원 식대 영수증 관리를 위한 전용 로그인입니다.
          </p>
        </div>

        {step === "email" && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                회사 이메일
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="name@di9.co.kr"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 text-white py-2.5 text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              인증 메일 보내기
            </button>
          </form>
        )}

        {step === "code" && (
          <form onSubmit={handleCodeSubmit} className="space-y-4">
            <p className="text-sm text-slate-600">
              <span className="font-medium">{email}</span> 로 전송된 인증 코드를
              입력해주세요.
            </p>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                인증 코드
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="이메일로 받은 코드를 입력"
                required
              />
              <p className="mt-1 text-xs text-slate-400">코드 유효 시간: 5분</p>
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 text-white py-2.5 text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              다음
            </button>
          </form>
        )}

        {step === "pin" && (
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <p className="text-sm text-slate-600">
              앞으로 사용할 6자리 숫자 비밀번호를 설정하세요.
            </p>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                6자리 비밀번호
              </label>
              <input
                type="password"
                inputMode="numeric"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm tracking-[0.5em] text-center font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 text-white py-2.5 text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              로그인 완료
            </button>
          </form>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}

        <p className="text-[11px] text-slate-400">
          실제 서비스에서는 이메일 인증 코드 발송 및 보안 정책(5회 실패 시
          잠금, 세션 유지 등)이 서버에서 처리됩니다. 현재 버전은 데모 UI
          입니다.
        </p>
      </div>
    </div>
  );
};

export default Login;

