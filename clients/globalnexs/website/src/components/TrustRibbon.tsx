const items = [
  "75+ students placed",
  "94% visa approval rate",
  "100+ partner universities",
  "★ 4.8 on Google Reviews",
  "UKNARIC-accredited filings",
  "UKVI compliant SOP review",
  "Royal Thachil Plaza · Angamaly",
];

export default function TrustRibbon() {
  // Duplicate for seamless infinite scroll
  const doubled = [...items, ...items];

  return (
    <section
      style={{
        borderTop: "1px solid var(--color-line)",
        borderBottom: "1px solid var(--color-line)",
        padding: "20px 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Edge fade masks */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 120,
          background: "linear-gradient(90deg, #ffffff 0%, transparent 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 120,
          background: "linear-gradient(-90deg, #ffffff 0%, transparent 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <div
        className="marquee-track"
        style={{
          display: "flex",
          gap: 48,
          whiteSpace: "nowrap",
          width: "max-content",
        }}
      >
        {doubled.map((it, i) => (
          <span
            key={i}
            style={{
              fontSize: 14,
              color: "var(--color-ink-mute)",
              display: "inline-flex",
              alignItems: "center",
              gap: 48,
              fontWeight: 500,
            }}
          >
            {it}
            <span style={{ color: "var(--color-brand)", opacity: 0.4 }} aria-hidden>◆</span>
          </span>
        ))}
      </div>
    </section>
  );
}
