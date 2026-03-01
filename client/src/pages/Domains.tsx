import { Link } from "wouter";
import { domains } from "@/data/standards";

export default function Domains() {
  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link href="/">
            <button className="text-slate-500 hover:text-teal-600 transition-colors flex items-center gap-1 text-sm">
              → الرئيسية
            </button>
          </Link>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🗂️</span>
            <h1 className="text-lg font-bold text-slate-800">المجالات الأربعة</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-slate-800 mb-2">مجالات التقويم والاعتماد المدرسي</h2>
          <p className="text-slate-500 text-lg">تشمل وثيقة معايير التقويم والاعتماد المدرسي أربعة مجالات رئيسية تغطي جوانب العمل المدرسي كافة.</p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {domains.map((domain) => {
            const indicatorCount = domain.standards.reduce((sum, s) => sum + s.indicators.length, 0);
            return (
              <div key={domain.id} className={`${domain.bgColor} rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow`}>
                {/* Domain Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-5xl">{domain.icon}</div>
                    <div>
                      <div className={`text-xs font-bold ${domain.color} mb-1`}>المجال {domain.number}</div>
                      <h3 className={`text-2xl font-extrabold ${domain.color}`}>{domain.title}</h3>
                    </div>
                    <div className="mr-auto flex gap-3">
                      <div className="text-center bg-white rounded-xl px-4 py-2 shadow-sm">
                        <div className={`text-2xl font-bold ${domain.color}`}>{domain.standards.length}</div>
                        <div className="text-xs text-slate-500">معايير</div>
                      </div>
                      <div className="text-center bg-white rounded-xl px-4 py-2 shadow-sm">
                        <div className={`text-2xl font-bold ${domain.color}`}>{indicatorCount}</div>
                        <div className="text-xs text-slate-500">مؤشراً</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{domain.description}</p>
                </div>

                {/* Standards list */}
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                    {domain.standards.map((standard) => (
                      <div key={standard.id} className="bg-white rounded-xl p-4 border border-slate-100 hover:border-teal-200 transition-colors">
                        <div className={`text-xs font-bold ${domain.color} mb-1`}>المعيار {standard.number}</div>
                        <div className="font-semibold text-slate-700 text-sm mb-2">{standard.title}</div>
                        <div className="text-xs text-slate-400">{standard.indicators.length} مؤشرات</div>
                      </div>
                    ))}
                  </div>
                  <Link href={`/domain/${domain.id}`}>
                    <button className={`w-full ${domain.color} bg-white hover:bg-opacity-80 border-2 border-current rounded-xl py-3 font-bold transition-all duration-200 hover:shadow-md`}>
                      استكشاف تفاصيل المجال ←
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
