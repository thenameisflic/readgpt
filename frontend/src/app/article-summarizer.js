import { Field, Label } from "@headlessui/react";
import { Input, InputGroup } from "@/components/input";
import { Button } from "@/components/button";
import { LinkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import SuggestedArticles from "./suggested-articles";

export default function ArticleSummarizer() {
  const [articleUrl, setArticleUrl] = useState(null);

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
        <SuggestedArticles />
      </div>
      <div className="flex-1"></div>
    </main>
  );
}
