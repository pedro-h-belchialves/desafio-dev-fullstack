import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Simulação Energética",
    template: "%s | Simulação Energética",
  },
  description:
    "Plataforma para simulação de compensação energética e gerenciamento de leads.",
  icons: {
    icon: "/logo_one.png",
    shortcut: "/logo_one.png",
    apple: "/logo_one.png",
  },
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "Simulação Energética",
    description:
      "Realize simulações energéticas e gerencie leads de forma profissional.",
    type: "website",
    locale: "pt_BR",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`
          ${poppins.variable}
          font-sans
          antialiased
          bg-color-background-from
          text-color-foreground
        `}
      >
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
