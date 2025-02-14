"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Summary() {
  const [article, setArticle] = useState({
    gpt: { important_points: [], follow_up_questions: [] },
  });

  const searchParams = useSearchParams();
  useEffect(() => {
    setArticle(JSON.parse(window.localStorage.getItem("article")));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto ">
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Summary</h2>
        <p className="mt-2">{article.gpt.summary}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Important Points</h2>
        <ul className="list-disc list-inside mt-2">
          {article.gpt.important_points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Suggested questions</h2>
        <ul className="list-disc list-inside mt-2">
          {article.gpt.follow_up_questions.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Full Article</h2>
        <div
          className="text-white mt-2 [&_p]:mt-2 [&_a]:text-gray-400 [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: article.content }}
        ></div>
      </div>
    </div>
  );
}
