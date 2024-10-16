
export default function Layout({ children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>Admin Header</div>
      {children}
    </div>
  );
}
