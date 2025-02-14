"use client";

import { useEffect, useState, Suspense } from "react";
import ArticleSummarizer from "@/app/article-summarizer";
import { useSearchParams } from "next/navigation";
import Summary from "@/app/summary";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const [article, setArticle] = useState(null);

  const articleUrl = searchParams.get("a");

  useEffect(() => {
    if (articleUrl) {
      const decodedUrl = decodeURIComponent(articleUrl);

      const storedArticle = window.localStorage.getItem("article");
      if (storedArticle) {
        setArticle(JSON.parse(storedArticle));
      }
    }
  }, [articleUrl]);

  return <>{articleUrl ? <Summary /> : <ArticleSummarizer />}</>;
}
