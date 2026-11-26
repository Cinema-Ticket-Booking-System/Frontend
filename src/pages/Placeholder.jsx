export default function Placeholder({ title, owner }) {
  return (
    <div className="p-8 border border-dashed border-slate-800 rounded-xl bg-[#111622] text-center">
      <h2 className="text-xl font-bold text-slate-200 mb-2">{title}</h2>
      <p className="text-xs font-mono text-amber-500">Assigned Owner: {owner}</p>
      <p className="text-xs text-slate-500 mt-2">Route ready for implementation</p>
    </div>
  );
}