
export default function Layout({ children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>Client Header</div>
      {children}
    </div>
  );
}
