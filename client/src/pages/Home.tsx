import { Link } from "wouter";
import { domains, getStats } from "@/data/standards";

const LOGO_WAHAH = "https://d2xsxph8kpxj0f.cloudfront.net/310519663105235158/JM8CgdD9UBMvgLbHukHikS/شعارالواحة_6d6a2dd9.png";
const LOGO_MOE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663105235158/JM8CgdD9UBMvgLbHukHikS/شعارالوزارة_6a3d758e.png";
const LOGO_ETEC = "https://d2xsxph8kpxj0f.cloudfront.net/310519663105235158/JM8CgdD9UBMvgLbHukHikS/شعارالهيئة_927b0c81.png";
const SEAL_ACCREDITED = "https://d2xsxph8kpxj0f.cloudfront.net/310519663105235158/JM8CgdD9UBMvgLbHukHikS/ختمتميزالرقميللاعتمادالكامل_28ea9522.png";

export default function Home() {
  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50" dir="rtl">

      {/* Top Bar — الشعارات الثلاثة */}
      <div className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 flex-wrap">
          <img src={LOGO_WAHAH} alt="مدارس واحة جدة الأهلية" className="h-14 object-contain" />
          <div className="text-center hidden sm:block">
            <p className="text-xs text-slate-400 font-medium">مدارس واحة جدة الأهلية</p>
            <p className="text-xs text-teal-600 font-bold">طلابنا اليوم.. قادة الغد</p>
          </div>
          <div className="flex items-center gap-6">
            <img src={LOGO_ETEC} alt="هيئة تقويم التعليم والتدريب" className="h-12 object-contain" />
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-gradient-to-l from-teal-700 to-teal-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
              دليلك للتميز والاعتماد المدرسي
            </h1>
            <p className="text-teal-200 text-sm mt-1">
              مساهمة من مدارس واحة جدة الأهلية لنقل أثر التميز
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://wj.edu.sa/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white text-xs px-4 py-2 rounded-full border border-white/20 font-medium transition-colors duration-200"
            >
              🌐 wj.edu.sa
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-center md:text-right">
              {/* تنويه رسمي */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-right">
                <p className="text-amber-800 text-sm leading-relaxed">
                  <span className="font-bold text-amber-900">تنويه: </span>
                  هذه اجتهادات تم بناؤها على الوثيقة الرسمية لمعايير التقويم والاعتماد المدرسي
                  الصادرة عن هيئة تقويم التعليم والتدريب، وهي مساهمة من
                  <span className="font-bold"> مدارس واحة جدة الأهلية </span>
                  لنقل أثر التميز.
                </p>
              </div>

              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6 leading-tight">
                معايير التقويم والاعتماد
                <span className="text-teal-600 block mt-1">في متناول يدك</span>
              </h2>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                مرجع شامل يضم المجالات الأربعة و{stats.totalStandards} معياراً و{stats.totalIndicators} مؤشراً،
                مع خرائط الطريق التفصيلية وأدوات التقويم والوثائق المطلوبة لكل مؤشر.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/domains">
                  <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5">
                    استعرض المجالات ←
                  </button>
                </Link>
                <Link href="/overview">
                  <button className="bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-xl font-bold text-lg shadow border border-slate-200 hover:border-teal-300 transition-all duration-200">
                    نظرة عامة على الوثيقة
                  </button>
                </Link>
              </div>
            </div>
            {/* ختم الاعتماد */}
            <div className="flex-shrink-0">
              <img
                src={SEAL_ACCREDITED}
                alt="ختم تميز — معتمد"
                className="w-44 h-44 md:w-60 md:h-60 object-contain drop-shadow-xl"
              />
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
          <p className="text-slate-500">اختر المجال للاطلاع على معاييره ومؤشراته وخرائط الطريق</p>
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
      <footer className="bg-teal-900 text-teal-100 py-10" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* الشعارات في الفوتر */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-8 pb-8 border-b border-teal-700">
            <img src={LOGO_WAHAH} alt="مدارس واحة جدة الأهلية" className="h-14 object-contain brightness-0 invert opacity-80" />
            <img src={LOGO_ETEC} alt="هيئة تقويم التعليم والتدريب" className="h-10 object-contain brightness-0 invert opacity-80" />
          </div>
          {/* معلومات الإعداد */}
          <div className="text-center space-y-2">
            <p className="text-white font-bold text-lg">دليلك للتميز والاعتماد المدرسي</p>
            <p className="text-teal-300 text-sm">
              مستند إلى الوثيقة الرسمية لمعايير التقويم والاعتماد المدرسي
              الصادرة عن هيئة تقويم التعليم والتدريب
            </p>
            <div className="mt-4 pt-4 border-t border-teal-700 space-y-1">
              <p className="text-teal-200 text-sm font-semibold">إعداد</p>
              <p className="text-white font-bold text-base">د. سليمان تويج</p>
              <p className="text-teal-300 text-sm">مسؤول الجودة والتميز بالمدارس</p>
              <a
                href="https://wj.edu.sa/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-teal-400 hover:text-white text-sm mt-2 transition-colors duration-200"
              >
                🌐 wj.edu.sa
              </a>
              <p className="text-teal-400 text-xs mt-3">
                © جميع حقوق الملكية محفوظة — مدارس واحة جدة الأهلية {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
