import { useState, useCallback, useEffect } from "react";
import { Link, useParams } from "wouter";
import { domains } from "@/data/standards";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const LOGO_WAHAH =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663105235158/JM8CgdD9UBMvgLbHukHikS/شعارالواحة_6d6a2dd9.png";

// ألوان الخطوات في الخريطة الذهنية
const STEP_COLORS = [
  "#0d9488", "#0891b2", "#7c3aed", "#db2777",
  "#ea580c", "#65a30d", "#b45309", "#0f766e",
];

function buildMindMapNodes(indicator: any, domainColor: string): { nodes: Node[]; edges: Edge[] } {
  const steps: string[] = indicator.roadmap || [];
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // العقدة المركزية
  nodes.push({
    id: "center",
    type: "default",
    position: { x: 0, y: 0 },
    data: {
      label: (
        <div className="text-center px-2">
          <div className="text-xs font-bold text-teal-700 mb-1">{indicator.code}</div>
          <div className="text-xs text-slate-700 leading-snug font-semibold max-w-[180px]">
            {indicator.text.length > 80 ? indicator.text.slice(0, 80) + "…" : indicator.text}
          </div>
        </div>
      ),
    },
    style: {
      background: "#f0fdfa",
      border: "2.5px solid #0d9488",
      borderRadius: "16px",
      width: 220,
      minHeight: 80,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 4px 20px rgba(13,148,136,0.2)",
      fontSize: "12px",
      padding: "10px",
    },
  });

  const count = steps.length;
  const radius = count <= 4 ? 340 : 400;

  steps.forEach((step, i) => {
    const angle = (2 * Math.PI * i) / count - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const color = STEP_COLORS[i % STEP_COLORS.length];
    const nodeId = `step-${i}`;

    nodes.push({
      id: nodeId,
      type: "default",
      position: { x, y },
      data: {
        label: (
          <div className="text-center px-1">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-2"
              style={{ backgroundColor: color }}
            >
              {i + 1}
            </div>
            <div className="text-xs text-slate-700 leading-snug max-w-[140px]">{step}</div>
          </div>
        ),
      },
      style: {
        background: "#ffffff",
        border: `2px solid ${color}`,
        borderRadius: "12px",
        width: 160,
        minHeight: 90,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 2px 12px ${color}30`,
        fontSize: "11px",
        padding: "8px",
      },
    });

    edges.push({
      id: `e-center-${i}`,
      source: "center",
      target: nodeId,
      style: { stroke: color, strokeWidth: 2, opacity: 0.7 },
      animated: false,
    });
  });

  return { nodes, edges };
}

// مكون الخريطة الذهنية
function MindMap({ indicator, domainColor }: { indicator: any; domainColor: string }) {
  const { nodes: initNodes, edges: initEdges } = buildMindMapNodes(indicator, domainColor);
  const [nodes, setNodes] = useState<Node[]>(initNodes);
  const [edges, setEdges] = useState<Edge[]>(initEdges);

  useEffect(() => {
    const { nodes: n, edges: e } = buildMindMapNodes(indicator, domainColor);
    setNodes(n);
    setEdges(e);
  }, [indicator.id]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  return (
    <div style={{ height: 520, width: "100%", borderRadius: "16px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        minZoom={0.3}
        maxZoom={2}
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#e2e8f0" gap={20} />
        <Controls position="bottom-right" />
        <MiniMap
          nodeColor={(n) => {
            if (n.id === "center") return "#0d9488";
            const idx = parseInt(n.id.replace("step-", ""));
            return STEP_COLORS[idx % STEP_COLORS.length];
          }}
          style={{ borderRadius: "8px" }}
        />
      </ReactFlow>
    </div>
  );
}

// أسماء أدوات التقويم
const toolLabels: Record<string, string> = {
  teacherSurvey: "استبانة المعلمين",
  studentSurvey: "استبانة المتعلمين",
  familySurvey: "استبانة الأسرة",
  classObservation: "الملاحظة الصفية",
  environmentObservation: "ملاحظة بيئة التعلم",
  teacherInterview: "مقابلة المعلمين",
  teacherMeetingInterview: "مقابلة الموجه الطلابي",
  studentInterview: "مقابلة المتعلمين",
  counselorInterview: "مقابلة الموجه الطلابي",
  adminInterview: "مقابلة الإدارة المدرسية",
  documentAnalysis: "تحليل الوثائق",
  nationalTests: "الاختبارات الوطنية",
  licenseResults: "نتائج الرخصة المهنية",
};

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
  const [activeTab, setActiveTab] = useState<"mindmap" | "docs" | "tools">("mindmap");

  const activeTools = Object.entries(indicator.tools)
    .filter(([, v]) => v)
    .map(([k]) => toolLabels[k] || k);

  return (
    <div className="px-6 py-5 border-b border-slate-50 last:border-0">
      {/* رأس المؤشر */}
      <div
        className="flex items-start gap-4 cursor-pointer group"
        onClick={() => setExpanded(!expanded)}
      >
        <div
          className={`w-9 h-9 flex-shrink-0 ${domainBg} ${domainColor} rounded-full flex items-center justify-center text-sm font-bold border-2 border-current shadow-sm`}
        >
          {index}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 flex-wrap">
            <span className="text-xs text-slate-400 font-mono mt-1">{indicator.code}</span>
            <p className="text-slate-800 font-semibold leading-relaxed flex-1">{indicator.text}</p>
            {indicator.notes && (
              <span className="flex-shrink-0 bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full border border-amber-200 font-medium whitespace-nowrap">
                {indicator.notes}
              </span>
            )}
          </div>
          {/* أدوات مختصرة */}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {activeTools.slice(0, 4).map((tool) => (
              <span key={tool} className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full">
                {tool}
              </span>
            ))}
            {activeTools.length > 4 && (
              <span className="text-xs text-slate-400">+{activeTools.length - 4}</span>
            )}
          </div>
        </div>
        <div className={`flex-shrink-0 text-slate-300 group-hover:text-slate-500 transition-all duration-200 text-xl mt-1`}>
          {expanded ? "▲" : "▼"}
        </div>
      </div>

      {/* التفاصيل الموسعة */}
      {expanded && (
        <div className="mt-5 mr-13">
          {/* تبويبات */}
          <div className="flex gap-2 mb-4 border-b border-slate-100 pb-3">
            {[
              { key: "mindmap", label: "🗺️ خارطة الطريق", desc: "خريطة ذهنية تفاعلية" },
              { key: "docs", label: "📁 الوثائق المطلوبة" },
              { key: "tools", label: "🔧 أدوات التقويم" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab.key
                    ? `${domainColor} bg-white border-2 border-current shadow-sm`
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* خارطة الطريق — خريطة ذهنية */}
          {activeTab === "mindmap" && (
            <div>
              <p className="text-xs text-slate-400 mb-3">
                يمكنك تحريك الخريطة، التكبير والتصغير، والنقر على أي عقدة لرؤية تفاصيلها.
              </p>
              <MindMap indicator={indicator} domainColor={domainColor} />
            </div>
          )}

          {/* الوثائق المطلوبة */}
          {activeTab === "docs" && (
            <div className={`${domainBg} rounded-xl p-5 border border-slate-100`}>
              <h4 className={`font-bold ${domainColor} mb-4 flex items-center gap-2`}>
                <span>📁</span> الوثائق المطلوبة لإثبات تحقق المؤشر
              </h4>
              {indicator.documents && indicator.documents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {indicator.documents.map((doc: string, i: number) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg px-4 py-3 flex items-center gap-3 shadow-sm border border-slate-100"
                    >
                      <span className={`w-7 h-7 flex-shrink-0 ${domainColor} bg-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-current`}>
                        {i + 1}
                      </span>
                      <span className="text-slate-700 text-sm font-medium">{doc}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm">لا توجد وثائق محددة لهذا المؤشر.</p>
              )}
            </div>
          )}

          {/* أدوات التقويم */}
          {activeTab === "tools" && (
            <div className={`${domainBg} rounded-xl p-5 border border-slate-100`}>
              <h4 className={`font-bold ${domainColor} mb-4 flex items-center gap-2`}>
                <span>🔧</span> أدوات التقويم المستخدمة في هذا المؤشر
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(indicator.tools).map(([key, active]) => (
                  <div
                    key={key}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 border ${
                      active
                        ? "bg-white border-current shadow-sm"
                        : "bg-slate-50 border-slate-200 opacity-50"
                    }`}
                  >
                    <span className={`text-lg ${active ? "" : "grayscale"}`}>
                      {active ? "✅" : "⬜"}
                    </span>
                    <span className={`text-sm font-medium ${active ? "text-slate-800" : "text-slate-400"}`}>
                      {toolLabels[key] || key}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

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
            <button className="bg-teal-600 text-white px-6 py-3 rounded-xl font-bold">
              العودة للمجالات
            </button>
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
            <img
              src={LOGO_WAHAH}
              alt="مدارس واحة جدة"
              className="h-9 object-contain brightness-0 invert"
            />
            <div className="flex items-center gap-2 text-sm">
              <Link href="/">
                <button className="text-teal-200 hover:text-white transition-colors">الرئيسية</button>
              </Link>
              <span className="text-teal-600">›</span>
              <Link href="/domains">
                <button className="text-teal-200 hover:text-white transition-colors">المجالات</button>
              </Link>
              <span className="text-teal-600">›</span>
              <span className="text-white font-bold">{domain.title}</span>
            </div>
          </div>
          <span className="text-teal-300 text-xs hidden md:block">
            دليلك للتميز والاعتماد المدرسي — مدارس واحة جدة الأهلية
          </span>
        </div>
      </header>

      {/* Domain Hero */}
      <div className={`${domain.bgColor} border-b border-slate-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-5 mb-4">
            <div className="text-6xl">{domain.icon}</div>
            <div>
              <div className={`text-sm font-bold ${domain.color} mb-1`}>المجال {domain.number}</div>
              <h1 className={`text-3xl md:text-4xl font-extrabold ${domain.color}`}>
                {domain.title}
              </h1>
            </div>
          </div>
          <p className="text-slate-600 text-base leading-relaxed max-w-3xl mb-6">
            {domain.description}
          </p>
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
                ? "bg-teal-600 text-white shadow"
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
              {standard.title}
            </button>
          ))}
        </div>

        {/* Standards */}
        <div className="space-y-8">
          {domain.standards
            .filter((s) => activeStandard === null || s.id === activeStandard)
            .map((standard) => (
              <div
                key={standard.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
              >
                {/* Standard Header */}
                <div className={`${domain.bgColor} px-6 py-5 border-b border-slate-100`}>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 ${domain.color} bg-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm`}
                    >
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
                <div>
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

      {/* Footer */}
      <footer className="bg-teal-900 text-teal-300 py-6 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs space-y-1">
          <p className="text-white font-semibold">دليلك للتميز والاعتماد المدرسي</p>
          <p>
            هذه اجتهادات مبنية على الوثيقة الرسمية لمعايير التقويم والاعتماد المدرسي من هيئة تقويم
            التعليم والتدريب — مساهمة من مدارس واحة جدة الأهلية لنقل أثر التميز
          </p>
          <p>إعداد: د. سليمان تويج — مسؤول الجودة والتميز بالمدارس</p>
          <p className="text-teal-500">
            © جميع حقوق الملكية محفوظة — مدارس واحة جدة الأهلية {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
