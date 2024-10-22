export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>
        <div className="bg-slate-200 "></div>
      </div>
      {children}
      <div>Admin footer</div>
    </div>
  );
}
