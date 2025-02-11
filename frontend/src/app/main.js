import { Field, Label } from "@headlessui/react";
import { Input, InputGroup } from "@/components/input";
import { Button } from "@/components/button";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { LinkIcon } from "@heroicons/react/24/outline";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Main() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [articles, setArticles] = useState([]);

  const [articleUrl, setArticleUrl] = useState(null);

  useEffect(() => {
    const fetchRandomArticles = async () => {
      try {
        setLoading(true);
        setError(false);

        // Fetch 5 random articles
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

        // Extract the titles from the response
        const randomArticles = response.data.query.random.map((article) => ({
          title: article.title,
          url: `https://en.wikipedia.org/wiki/${encodeURIComponent(article.title.replace(/ /g, "_"))}`,
        }));

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

  const onSubmit = (e) => {
    e.preventDefault();
    window.location.href = articleUrl;
  };

  const onArticleUrlChange = (e) => {
    setArticleUrl(e.target.value);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex-1 flex flex-col">
      <div className="flex-1"></div>
      <form onSubmit={onSubmit}>
        <Field className="flex items-center flex-col">
          <Label className="font-sans text-3xl text-center">
            Paste a link to any article
          </Label>
          <div className="font-sans text-center">
            We’ll summarize it for you. You can also chat with the article to
            dive deeper.
          </div>
          <InputGroup className="mt-1 flex w-full">
            <LinkIcon />
            <Input
              name="search"
              placeholder="Drop a link, get the gist"
              aria-label="Search"
              inputClassName="rounded-tr-none rounded-br-none"
              onChange={onArticleUrlChange}
            />
            <Button type="submit" className="rounded-tl-none rounded-bl-none">
              Go
            </Button>
          </InputGroup>
        </Field>
      </form>

      <div className="font-sans mt-4">
        {loading && !error && (
          <>
            <div className="flex items-center">
              <div className="flex-1">
                Looking for suggested articles in Wikipedia...
              </div>
              <svg
                className="mr-3 -ml-1 size-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>{" "}
            </div>
            <div style={{ height: 285 }}></div> {/* Skeleton to avoid jitter */}
          </>
        )}
        {!loading && !error && "Wikipedia articles you might find interesting:"}
        {!loading &&
          error &&
          "We couldn't find any suggested articles for you. Sorry!"}
      </div>
      {!loading && !error && (
        <Table className="[--gutter:--spacing(6)] sm:[--gutter:--spacing(8)]">
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.url} href={article.url} className="px-4">
                <TableCell className="font-medium">{article.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <div className="flex-1"></div>
    </main>
  );
}
