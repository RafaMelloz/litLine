import { HeaderMenu } from "@/components/headerMenu";
import "./globals.css";
import { AuthProvider } from "@/services/authProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LitLine",
  description: "Generated by create next app",
};


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
