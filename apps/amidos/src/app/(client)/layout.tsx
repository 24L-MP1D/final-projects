export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>Client header</div>
      {children}
      <div>Client footer</div>
    </div>
  );
}
