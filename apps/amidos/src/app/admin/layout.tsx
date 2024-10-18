export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>Admin header</div>
      {children}
      <div>Admin footer</div>
    </div>
  );
}
