export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="">
        <main className="">{children}</main>
      </body>
    </html>
  );
}
