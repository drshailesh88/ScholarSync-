export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark" style={{ colorScheme: "dark" }}>
      {children}
    </div>
  );
}
