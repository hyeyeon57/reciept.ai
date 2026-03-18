import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ProfileCardPanel = () => (
  <>
    <div className="lg:col-span-5 flex flex-col items-center" id="section-1">
      <div className="flex flex-col items-center mb-8">
        <div className="speech-bubble mb-4">104,938원 남았어요!</div>
        <img
          alt="cute friendly 3D character mascot holding money or wallet, cheerful expression, blue and white color scheme, without background"
          className="w-48 h-48 object-contain"
          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b2de54cd4e-460ca25a0d3cced64204.png"
        />
      </div>
      <div className="bg-blue-50 rounded-2xl border border-blue-100 text-center p-6 w-full max-w-sm mb-8">
        <p className="text-xs text-blue-600 mb-1">남은 식비</p>
        <p className="text-2xl font-bold text-blue-700">104,938원</p>
        <p className="text-xs text-blue-400 mt-1">/ 200,000원</p>
      </div>
      <button className="w-full max-w-sm bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 border border-blue-100">
        <span className="text-base md:text-lg">영수증 등록하기</span>
        <FontAwesomeIcon icon={faPlus} className="text-xl" />
      </button>
      <div className="w-full max-w-sm mt-8"></div>
    </div>
  </>
);

export default ProfileCardPanel;
