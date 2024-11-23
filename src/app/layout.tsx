import { HeaderMenu } from "@/components/headerMenu";
import "./globals.css";
import { AuthProvider } from "@/services/authProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="br">
      <body className="dark">
        <AuthProvider>
          <HeaderMenu />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
