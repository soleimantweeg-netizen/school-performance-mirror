import { Link } from "wouter";
import { domains, getStats } from "@/data/standards";

export default function Home() {
  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center shadow">
              <span className="text-white text-2xl">🏫</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-teal-800 leading-tight">مرآة الأداء المدرسي</h1>
              <p className="text-xs text-slate-500">معايير التقويم والاعتماد المدرسي 2026</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
            <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full font-medium border border-teal-200">
              الهيئة الوطنية للتقويم والاعتماد التعليمي
            </span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-teal-200">
              <span>✨</span>
              <span>دليلك التفاعلي الشامل لمعايير الاعتماد المدرسي</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6 leading-tight">
              افهم معايير التقويم
              <span className="text-teal-600 block mt-1">بطريقة تفاعلية وعملية</span>
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              منصة متكاملة تشرح مجالات ومعايير ومؤشرات التقويم والاعتماد المدرسي بأسلوب مبسط وتفاعلي، مع الإضاءات التوجيهية وأدوات التقويم لكل مؤشر.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/domains">
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5">
                  ابدأ الاستكشاف ←
                </button>
              </Link>
              <Link href="/overview">
                <button className="bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-xl font-bold text-lg shadow border border-slate-200 hover:border-teal-300 transition-all duration-200">
                  نظرة عامة على الوثيقة
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-teal-100 rounded-full opacity-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full opacity-20 translate-x-1/3 translate-y-1/3 pointer-events-none" />
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
          {[
            { value: stats.totalDomains, label: "مجالات", icon: "🗂️", color: "text-teal-600" },
            { value: stats.totalStandards, label: "معياراً", icon: "📋", color: "text-blue-600" },
            { value: stats.totalIndicators, label: "مؤشراً", icon: "🎯", color: "text-purple-600" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 text-center hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className={`text-4xl font-extrabold ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Domains Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">المجالات الأربعة</h3>
          <p className="text-slate-500">اضغط على أي مجال للاستكشاف التفصيلي</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {domains.map((domain) => {
            const indicatorCount = domain.standards.reduce((sum, s) => sum + s.indicators.length, 0);
            return (
              <Link key={domain.id} href={`/domain/${domain.id}`}>
                <div className={`${domain.bgColor} border-2 border-transparent hover:border-current rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg group`}>
                  <div className="flex items-start gap-4">
                    <div className="text-5xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                      {domain.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold ${domain.color} bg-white px-2 py-0.5 rounded-full`}>
                          المجال {domain.number}
                        </span>
                      </div>
                      <h4 className={`text-xl font-bold ${domain.color} mb-2`}>{domain.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                        {domain.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <span>📋</span>
                          <span>{domain.standards.length} معايير</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <span>🎯</span>
                          <span>{indicatorCount} مؤشراً</span>
                        </span>
                      </div>
                    </div>
                    <div className={`${domain.color} text-2xl opacity-40 group-hover:opacity-100 transition-all duration-200`}>
                      ←
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-400 py-8 text-center text-sm">
        <p>مرآة الأداء المدرسي — مستند من وثيقة معايير التقويم والاعتماد المدرسي 2026</p>
        <p className="mt-1 text-slate-500">الهيئة الوطنية للتقويم والاعتماد التعليمي — المملكة العربية السعودية</p>
      </footer>
    </div>
  );
}
