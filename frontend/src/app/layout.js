import { Alegreya, Alegreya_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/app/header";

const alegreyaSans = Alegreya_Sans({
  variable: "--font-alegreya-sans",
  subsets: ["latin"],
  weight: "500",
});

const alegreyaSerif = Alegreya({
  variable: "--font-alegreya-serif",
  subsets: ["latin"],
  weight: "700",
});

export const metadata = {
  title: "ReadGPT",
  description:
    "Summarize and chat with any article using AI — paste a link, get insights, and interact seamlessly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="flex h-screen w-full">
      <body
        className={`${alegreyaSans.variable} ${alegreyaSerif.variable} antialiased flex h-screen flex-col w-full`}
      >
        <Header />
        {children}
        <footer className="w-full py-4 flex justify-center font-sans text-center">
          Copyright &copy; 2025 ReadGPT by Feliciano Lima - All rights reserved
        </footer>
      </body>
    </html>
  );
}
