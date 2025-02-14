"use client";

import { useEffect, useState } from "react";
import Header from "@/app/header";
import ArticleSummarizer from "@/app/article-summarizer";
import { useSearchParams } from "next/navigation";
import Summary from "@/app/summary";

export default function Home() {
  const searchParams = useSearchParams();
  const [article, setArticle] = useState(null);

  // Read the query parameter `a`
  const articleUrl = searchParams.get("a");

  useEffect(() => {
    if (articleUrl) {
      // Decode the article URL
      const decodedUrl = decodeURIComponent(articleUrl);

      // Fetch or retrieve the article data
      const storedArticle = window.localStorage.getItem("article");
      if (storedArticle) {
        setArticle(JSON.parse(storedArticle));
      }
    }
  }, [articleUrl]);

  return <>{articleUrl ? <Summary /> : <ArticleSummarizer />}</>;
}
