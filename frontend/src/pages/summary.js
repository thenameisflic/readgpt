import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function About() {
  const [article, setArticle] = useState({ gpt: { important_points: [] } });

  const searchParams = useSearchParams();
  useEffect(() => {
    setArticle(JSON.parse(window.localStorage.getItem("article")));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Summary</h2>
        <p className="text-gray-700 mt-2">{article.gpt.summary}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Important Points</h2>
        <ul className="list-disc list-inside text-gray-700 mt-2">
          {article.gpt.important_points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Full Content</h2>
        <p className="text-gray-700 mt-2 whitespace-pre-wrap">
          {article.content}
        </p>
      </div>
    </div>
  );
}
