import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBreadSlice,
  faChevronDown,
  faMugHot,
  faStore,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

const TransactionsPanel = () => (
  <>
    <div className="lg:col-span-7" id="section-2">
      <div className="bg-white rounded-3xl p-4 md:p-6 lg:shadow-sm lg:border lg:border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">최근 기록보기</h2>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            <button className="px-4 py-2 bg-slate-800 text-white text-xs rounded-full whitespace-nowrap">
              전체
            </button>
            <button className="px-4 py-2 bg-slate-100 text-slate-600 text-xs rounded-full whitespace-nowrap hover:bg-slate-200">
              식비
            </button>
            <button className="px-4 py-2 bg-slate-100 text-slate-600 text-xs rounded-full whitespace-nowrap hover:bg-slate-200">
              카페
            </button>
            <button className="px-4 py-2 bg-slate-100 text-slate-600 text-xs rounded-full whitespace-nowrap hover:bg-slate-200">
              베이커리
            </button>
            <button className="px-4 py-2 bg-slate-100 text-slate-600 text-xs rounded-full whitespace-nowrap hover:bg-slate-200">
              편의점
            </button>
          </div>
        </div>
        <p className="text-xs text-slate-400 mb-3">2월 27일</p>
        <div className="space-y-4 overflow-x-auto">
          <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group min-w-[300px]">
            <div className="flex items-center gap-4">
              <div className="category-icon bg-amber-100 text-amber-600 group-hover:scale-110 transition-transform">
                <FontAwesomeIcon icon={faMugHot} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm md:text-base">
                  카페
                </h3>
                <p className="text-xs text-slate-400">22:08</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-800 text-sm md:text-base">
                -4,000원
              </p>
              <p className="text-xs text-slate-400">104,938원</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group min-w-[300px]">
            <div className="flex items-center gap-4">
              <div className="category-icon bg-green-100 text-green-600 group-hover:scale-110 transition-transform">
                <FontAwesomeIcon icon={faUtensils} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm md:text-base">
                  식비
                </h3>
                <p className="text-xs text-slate-400">18:59</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-800 text-sm md:text-base">
                -20,000원
              </p>
              <p className="text-xs text-slate-400">108,938원</p>
            </div>
          </div>

          <p className="text-xs text-slate-400 mb-3 mt-6">2월 26일</p>

          <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group min-w-[300px]">
            <div className="flex items-center gap-4">
              <div className="category-icon bg-purple-100 text-purple-600 group-hover:scale-110 transition-transform">
                <FontAwesomeIcon icon={faStore} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm md:text-base">
                  편의점
                </h3>
                <p className="text-xs text-slate-400">18:56</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-800 text-sm md:text-base">
                -10,000원
              </p>
              <p className="text-xs text-slate-400">128,938원</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group min-w-[300px]">
            <div className="flex items-center gap-4">
              <div className="category-icon bg-purple-100 text-purple-600 group-hover:scale-110 transition-transform">
                <FontAwesomeIcon icon={faStore} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm md:text-base">
                  편의점
                </h3>
                <p className="text-xs text-slate-400">18:59</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-blue-500 text-sm md:text-base">
                +20,000원
              </p>
              <p className="text-xs text-slate-400">138,938원</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group min-w-[300px]">
            <div className="flex items-center gap-4">
              <div className="category-icon bg-purple-100 text-purple-600 group-hover:scale-110 transition-transform">
                <FontAwesomeIcon icon={faStore} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm md:text-base">
                  편의점
                </h3>
                <p className="text-xs text-slate-400">18:54</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-800 text-sm md:text-base">
                -20,000원
              </p>
              <p className="text-xs text-slate-400">118,938원</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group min-w-[300px]">
            <div className="flex items-center gap-4">
              <div className="category-icon bg-orange-100 text-orange-500 group-hover:scale-110 transition-transform">
                <FontAwesomeIcon icon={faBreadSlice} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm md:text-base">
                  베이커리
                </h3>
                <p className="text-xs text-slate-400">12:30</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-800 text-sm md:text-base">
                -8,900원
              </p>
              <p className="text-xs text-slate-400">138,938원</p>
            </div>
          </div>
        </div>
        <button className="w-full mt-6 py-3 text-sm text-slate-500 font-medium hover:text-blue-600 transition-colors flex items-center justify-center gap-2 bg-slate-100 rounded-xl">
          더 보기 <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
        </button>
      </div>
    </div>
  </>
);

export default TransactionsPanel;
