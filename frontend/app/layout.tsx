import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "../components/ThemeContext";
import Layout from "../components/__organisms/Layout/Layout";

const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata = {
  title: "Invoice App",
  description: "Next.js Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#FAFAFA] min-h-screen`}>
        <ThemeProvider>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
