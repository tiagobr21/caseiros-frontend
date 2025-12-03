export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="bg-gray-100 flex items-center justify-center min-h-screen">
        {children}
      </body>
    </html>
  );
}
