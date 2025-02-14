import { Field, Label } from "@headlessui/react";
import { Input, InputGroup } from "@/components/input";
import { Button } from "@/components/button";
import { LinkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import SuggestedArticles from "./suggested-articles";
import axios from "axios";
import { useRouter } from "next/navigation";
import Spinner from "@/components/spinner";

export default function ArticleSummarizer() {
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState("");
  const [articleUrl, setArticleUrl] = useState(null);
  const router = useRouter();

  const generateSummary = async (url) => {
    let hasFinished = false;
    setLoading(true);

    setTimeout(() => {
      if (!hasFinished)
        setWarning(
          "Hang tight! We're still working on summarizing your article...",
        );
    }, 3000);

    setTimeout(() => {
      if (!hasFinished)
        setWarning(
          "This is taking a bit longer than usual, but we're almost there...",
        );
    }, 6000);

    setWarning("Loading your article summary...");
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/summarize",
        {
          url,
        },
        { timeout: 10000 },
      );
      hasFinished = true;
      window.localStorage.setItem("article", JSON.stringify(response.data));
      router.push("/summary");
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        setWarning(
          "We're sorry, but the summary process took too long. Please try again.",
        );
      } else {
        setWarning(
          "Oops! Something went wrong while generating your summary. Please try again later.",
        );
        console.error(error);
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    generateSummary(articleUrl);
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
              {!loading && <div>Go</div>}
              {loading && <Spinner />}
            </Button>
          </InputGroup>
        </Field>
      </form>

      <div className="font-sans mt-4">
        {!loading && (
          <SuggestedArticles
            onClick={(article) => generateSummary(article.url)}
          />
        )}
        {loading && warning && (
          <>
            <div>{warning}</div>
            <div style={{ height: 285 }}></div>
          </>
        )}
      </div>
      <div className="flex-1"></div>
    </main>
  );
}
