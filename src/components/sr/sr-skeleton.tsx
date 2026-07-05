/** Shared stage skeleton — mirrors the funnel rhythm, never a spinner. */
export function SrStageSkeleton() {
  return (
    <div className="cv-inner wide">
      <div className="skel" style={{ width: 220, height: 12 }} />
      <div className="skel" style={{ width: 340, height: 34, marginTop: 10 }} />
      <div className="skel" style={{ width: 520, height: 14, marginTop: 12 }} />
      <div
        className="skel"
        style={{ height: 64, marginTop: 24, borderRadius: 11 }}
      />
      {[0, 1, 2, 3].map((row) => (
        <div
          key={row}
          className="skel"
          style={{ height: 58, marginTop: 12, borderRadius: 12 }}
        />
      ))}
    </div>
  );
}
