const universities = [
  "University of Exeter",
  "Deakin University",
  "York University",
  "TU Munich",
  "University of Galway",
  "+ 96 more",
];

export default function TrustStrip() {
  return (
    <div className="bg-[#F8FAFC] border-y border-[#E2E8F0] py-7 px-6 md:px-[5%]">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <span className="text-[#94A3B8] text-xs font-bold uppercase tracking-widest whitespace-nowrap">
          Partner universities
        </span>
        <div className="flex flex-wrap items-center gap-3">
          {universities.map((u) => (
            <span
              key={u}
              className="bg-white border border-[#E2E8F0] text-[#475569] text-xs font-bold px-5 py-2 rounded-full"
            >
              {u}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
