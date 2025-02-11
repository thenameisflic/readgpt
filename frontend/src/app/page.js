"use client";

import Image from "next/image";
import { useState } from "react";
import Main from "@/app/main";
import Header from "@/app/header";
import ArticleSummarizer from "@/app/article-summarizer";

export default function Home() {
  const [response, setResponse] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/`);
      const result = await response.json();
      setResponse(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Header />
      <ArticleSummarizer />
      <footer className="w-full py-4 flex justify-center font-sans text-center">
        Copyright &copy; 2025 ReadGPT by Feliciano Lima - All rights reserved
      </footer>
    </>
  );
}
