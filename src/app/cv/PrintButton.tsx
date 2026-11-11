"use client";

export function PrintButton() {
  return (
    <button onClick={() => window.print()} className="no-print mb-8 rounded-full bg-[var(--forest)] px-6 py-3 text-[var(--forest-fg)]">
      Print or save as PDF
    </button>
  );
}
