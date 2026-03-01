import { Link } from "wouter";
import { domains, getStats } from "@/data/standards";

const LOGO_WAHAH = "https://d2xsxph8kpxj0f.cloudfront.net/310519663105235158/JM8CgdD9UBMvgLbHukHikS/شعارالواحة_dff1df94.png";

export default function Overview() {
  const stats = getStats();

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      {/* Header */}
      <header className="bg-teal-900 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <img src={LOGO_WAHAH} alt="مدارس واحة جدة" className="h-9 object-contain brightness-0 invert" />
            <div className="flex items-center gap-2 text-sm">
              <Link href="/">
                <button className="text-teal-200 hover:text-white">الرئيسية</button>
              </Link>
              <span className="text-teal-600">›</span>
              <span className="text-white font-bold">نظرة عامة على الوثيقة</span>
            </div>
          </div>
          <span className="text-teal-300 text-xs hidden md:block">بوابة الجودة المدرسية — مدارس واحة جدة الأهلية</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-3">
            وثيقة معايير التقويم والاعتماد المدرسي
          </h1>
          <p className="text-slate-500 text-lg">الهيئة الوطنية للتقويم والاعتماد التعليمي — 2026</p>
        </div>

        {/* About */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-8">
          <h2 className="text-xl font-bold text-teal-700 mb-4 flex items-center gap-2">
            <span>🎯</span> ما هذه الوثيقة؟
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            تُمثِّل وثيقة معايير التقويم والاعتماد المدرسي الإطارَ المرجعي الذي تعتمده الهيئة الوطنية للتقويم والاعتماد التعليمي في المملكة العربية السعودية لتقييم مدارس التعليم العام. تهدف الوثيقة إلى ضمان جودة التعليم ورفع مستواه من خلال مجموعة من المعايير والمؤشرات الشاملة التي تغطي جوانب العمل المدرسي كافة.
          </p>
          <p className="text-slate-700 leading-relaxed">
            تُعدُّ هذه الوثيقة أداةً للتطوير المستمر لا مجرد أداة للرقابة، إذ تُمكِّن المدارس من إجراء تقويم ذاتي شامل وبناء خطط تحسين مبنية على الأدلة والبيانات.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { value: stats.totalDomains, label: "مجالات رئيسية", icon: "🗂️", color: "text-teal-600", bg: "bg-teal-50" },
            { value: stats.totalStandards, label: "معياراً", icon: "📋", color: "text-blue-600", bg: "bg-blue-50" },
            { value: stats.totalIndicators, label: "مؤشر أداء", icon: "🎯", color: "text-purple-600", bg: "bg-purple-50" },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.bg} rounded-2xl p-6 text-center border border-slate-100`}>
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className={`text-4xl font-extrabold ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Domains Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span>🗂️</span> هيكل الوثيقة
          </h2>
          <div className="space-y-4">
            {domains.map((domain) => {
              const indicatorCount = domain.standards.reduce((sum, s) => sum + s.indicators.length, 0);
              return (
                <div key={domain.id} className={`${domain.bgColor} rounded-xl p-5 border border-slate-100`}>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-3xl">{domain.icon}</span>
                    <div className="flex-1">
                      <div className={`text-xs font-bold ${domain.color} mb-0.5`}>المجال {domain.number}</div>
                      <h3 className={`text-lg font-bold ${domain.color}`}>{domain.title}</h3>
                    </div>
                    <div className="flex gap-2">
                      <span className="bg-white text-slate-600 text-xs px-3 py-1 rounded-full border border-slate-200">
                        {domain.standards.length} معايير
                      </span>
                      <span className="bg-white text-slate-600 text-xs px-3 py-1 rounded-full border border-slate-200">
                        {indicatorCount} مؤشراً
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-3">{domain.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {domain.standards.map((s) => (
                      <span key={s.id} className={`bg-white ${domain.color} text-xs px-3 py-1 rounded-full border border-current font-medium`}>
                        {s.title}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Assessment Tools */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span>🔧</span> أدوات التقويم المستخدمة
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: "📝", name: "استبانة المعلمين", desc: "جمع آراء وتقييمات المعلمين" },
              { icon: "👨‍👩‍👧", name: "استبانة الأسرة", desc: "قياس رضا أولياء الأمور" },
              { icon: "👁️", name: "ملاحظة الصف", desc: "مراقبة الممارسات التدريسية" },
              { icon: "🏫", name: "ملاحظة البيئة", desc: "تقييم البيئة المدرسية" },
              { icon: "🎙️", name: "المقابلات", desc: "حوارات معمقة مع المعنيين" },
              { icon: "📂", name: "تحليل الوثائق", desc: "مراجعة السجلات والخطط" },
              { icon: "📊", name: "الاختبارات الوطنية", desc: "نتائج التقييم الوطني" },
              { icon: "🏅", name: "نتائج الرخصة المهنية", desc: "مستوى تأهيل المعلمين" },
            ].map((tool) => (
              <div key={tool.name} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="text-2xl mb-2">{tool.icon}</div>
                <div className="font-semibold text-slate-700 text-sm mb-1">{tool.name}</div>
                <div className="text-xs text-slate-500">{tool.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/domains">
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200">
              ابدأ استكشاف المجالات ←
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
