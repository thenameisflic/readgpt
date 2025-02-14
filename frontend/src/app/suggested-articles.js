import { useEffect, useState } from "react";
import axios from "axios";
import {
  MotionTableRow,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/table";
import Spinner from "@/components/spinner";

export default function SuggestedArticles({ onClick }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchRandomArticles = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await axios.get("https://en.wikipedia.org/w/api.php", {
          params: {
            action: "query",
            list: "random",
            rnnamespace: 0,
            rnlimit: 5,
            format: "json",
            origin: "*", // Required for CORS
          },
        });

        const randomArticles = response.data.query.random.map((article) => {
          const title =
            article.title.length > 40
              ? `${article.title.slice(0, 40)}...`
              : article.title;
          return {
            title,
            url: `https://en.wikipedia.org/wiki/${encodeURIComponent(article.title.replace(/ /g, "_"))}`,
          };
        });

        setArticles(randomArticles);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomArticles();
  }, []);

  if (loading && !error) {
    return (
      <>
        <div className="flex items-center">
          <div className="flex-1">
            Looking for suggested articles in Wikipedia...
          </div>
          <Spinner className="mr-3 -ml-1" />{" "}
        </div>
        <div style={{ height: 285 }}></div> {/* Skeleton to avoid jitter */}
      </>
    );
  }

  if (!loading && error) {
    return <div>We couldn't find any suggested articles for you. Sorry!</div>;
  }

  return (
    <>
      <div>Wikipedia articles you might find interesting:</div>
      <Table className="[--gutter:--spacing(6)] sm:[--gutter:--spacing(8)] overflow-y-hidden">
        <TableBody className="overflow-y-hidden">
          {articles.map((article, index) => (
            <MotionTableRow
              onClick={() => onClick(article)}
              className="px-4"
              index={index}
              key={article.url}
            >
              <TableCell className="font-medium tracking-wide">
                {article.title}
              </TableCell>
            </MotionTableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
