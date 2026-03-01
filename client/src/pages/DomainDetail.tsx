import { Link, useParams } from "wouter";
import { useState } from "react";
import { domains } from "@/data/standards";

const LOGO_WAHAH = "https://d2xsxph8kpxj0f.cloudfront.net/310519663105235158/JM8CgdD9UBMvgLbHukHikS/شعارالواحة_dff1df94.png";

export default function DomainDetail() {
  const { domainId } = useParams<{ domainId: string }>();
  const domain = domains.find((d) => d.id === domainId);
  const [activeStandard, setActiveStandard] = useState<string | null>(null);

  if (!domain) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-slate-700 mb-4">المجال غير موجود</h2>
          <Link href="/domains">
            <button className="bg-teal-600 text-white px-6 py-3 rounded-xl font-bold">العودة للمجالات</button>
          </Link>
        </div>
      </div>
    );
  }

  const totalIndicators = domain.standards.reduce((sum, s) => sum + s.indicators.length, 0);

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
              <Link href="/domains">
                <button className="text-teal-200 hover:text-white">المجالات</button>
              </Link>
              <span className="text-teal-600">›</span>
              <span className="text-white font-bold">{domain.title}</span>
            </div>
          </div>
          <span className="text-teal-300 text-xs hidden md:block">بوابة الجودة المدرسية — مدارس واحة جدة الأهلية</span>
        </div>
      </header>

      {/* Domain Hero */}
      <div className={`${domain.bgColor} border-b border-slate-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-5 mb-4">
            <div className="text-6xl">{domain.icon}</div>
            <div>
              <div className={`text-sm font-bold ${domain.color} mb-1`}>المجال {domain.number}</div>
              <h1 className={`text-3xl md:text-4xl font-extrabold ${domain.color}`}>{domain.title}</h1>
            </div>
          </div>
          <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mb-6">{domain.description}</p>
          <div className="flex gap-4 flex-wrap">
            <div className="bg-white rounded-xl px-5 py-3 shadow-sm flex items-center gap-2">
              <span className="text-2xl">📋</span>
              <div>
                <div className={`text-2xl font-bold ${domain.color}`}>{domain.standards.length}</div>
                <div className="text-xs text-slate-500">معايير</div>
              </div>
            </div>
            <div className="bg-white rounded-xl px-5 py-3 shadow-sm flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              <div>
                <div className={`text-2xl font-bold ${domain.color}`}>{totalIndicators}</div>
                <div className="text-xs text-slate-500">مؤشراً</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Standards Tabs */}
        <div className="flex gap-3 mb-8 flex-wrap">
          <button
            onClick={() => setActiveStandard(null)}
            className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${
              activeStandard === null
                ? `bg-teal-600 text-white shadow`
                : "bg-white text-slate-600 border border-slate-200 hover:border-teal-300"
            }`}
          >
            جميع المعايير
          </button>
          {domain.standards.map((standard) => (
            <button
              key={standard.id}
              onClick={() => setActiveStandard(standard.id)}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${
                activeStandard === standard.id
                  ? `${domain.color} bg-white border-2 border-current shadow`
                  : "bg-white text-slate-600 border border-slate-200 hover:border-teal-300"
              }`}
            >
              المعيار {standard.number}: {standard.title}
            </button>
          ))}
        </div>

        {/* Standards */}
        <div className="space-y-8">
          {domain.standards
            .filter((s) => activeStandard === null || s.id === activeStandard)
            .map((standard) => (
              <div key={standard.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                {/* Standard Header */}
                <div className={`${domain.bgColor} px-6 py-5 border-b border-slate-100`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${domain.color} bg-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm`}>
                      {standard.number}
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-0.5">المعيار {standard.number}</div>
                      <h2 className={`text-xl font-bold ${domain.color}`}>{standard.title}</h2>
                    </div>
                    <div className="mr-auto">
                      <span className="bg-white text-slate-600 text-xs px-3 py-1 rounded-full border border-slate-200 font-medium">
                        {standard.indicators.length} مؤشرات
                      </span>
                    </div>
                  </div>
                </div>

                {/* Indicators */}
                <div className="divide-y divide-slate-50">
                  {standard.indicators.map((indicator, idx) => (
                    <IndicatorCard
                      key={indicator.id}
                      indicator={indicator}
                      index={idx + 1}
                      domainColor={domain.color}
                      domainBg={domain.bgColor}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}

function IndicatorCard({
  indicator,
  index,
  domainColor,
  domainBg,
}: {
  indicator: any;
  index: number;
  domainColor: string;
  domainBg: string;
}) {
  const [expanded, setExpanded] = useState(false);

  const toolLabels: Record<string, string> = {
    teacherSurvey: "استبانة المعلمين",
    familySurvey: "استبانة الأسرة",
    classObservation: "ملاحظة الصف",
    environmentObservation: "ملاحظة البيئة",
    interviews: "المقابلات",
    documentAnalysis: "تحليل الوثائق",
    nationalTests: "الاختبارات الوطنية",
    licenseResults: "نتائج الرخصة المهنية",
  };

  const activeTools = Object.entries(indicator.tools)
    .filter(([, v]) => v)
    .map(([k]) => toolLabels[k] || k);

  return (
    <div className="px-6 py-5">
      <div
        className="flex items-start gap-4 cursor-pointer group"
        onClick={() => setExpanded(!expanded)}
      >
        <div className={`w-8 h-8 flex-shrink-0 ${domainBg} ${domainColor} rounded-full flex items-center justify-center text-sm font-bold border-2 border-current`}>
          {index}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2">
            <p className="text-slate-800 font-semibold leading-relaxed flex-1">{indicator.text}</p>
            {indicator.notes && (
              <span className="flex-shrink-0 bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full border border-amber-200 font-medium whitespace-nowrap">
                {indicator.notes}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {activeTools.map((tool) => (
              <span key={tool} className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full">
                {tool}
              </span>
            ))}
          </div>
        </div>
        <div className={`flex-shrink-0 text-slate-400 group-hover:${domainColor} transition-all duration-200 text-xl`}>
          {expanded ? "▲" : "▼"}
        </div>
      </div>

      {/* Illuminations */}
      {expanded && (
        <div className={`mt-4 mr-12 ${domainBg} rounded-xl p-5 border border-slate-100`}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🔍</span>
            <h4 className={`font-bold ${domainColor}`}>عمق المعنى — ماذا يعني هذا المؤشر؟</h4>
          </div>
          <ul className="space-y-3">
            {indicator.illuminations.map((ill: string, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <span className={`flex-shrink-0 w-6 h-6 ${domainColor} bg-white rounded-full flex items-center justify-center text-xs font-bold border border-current mt-0.5`}>
                  {i + 1}
                </span>
                <p className="text-slate-700 text-sm leading-relaxed">{ill}</p>
              </li>
            ))}
          </ul>
          {activeTools.length > 0 && (
            <div className="mt-5 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">🔧</span>
                <h4 className={`font-bold ${domainColor} text-sm`}>أدوات التقويم المستخدمة</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeTools.map((tool) => (
                  <span key={tool} className={`${domainBg} ${domainColor} text-xs px-3 py-1.5 rounded-full font-medium border border-current`}>
                    ✓ {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
