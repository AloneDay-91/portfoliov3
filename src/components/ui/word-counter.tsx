"use client";

import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const WordCounter = () => {
  const [value, setValue] = React.useState("");
  const words = value.match(/\S+/g)?.length || 0;
  const chars = value.length || 0;
  const charsWithoutSpaces = value.replace(/ /g, "").length || 0;
  const paragraphs =
    value.split("\n").filter((paragraph) => paragraph !== "").length || 0;

  return (
    <div
      id="word-counter"
      className="mx-auto mt-10  flex max-w-5xl flex-col items-center justify-center  "
    >
      <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardContent>
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-2xl font-bold">{words}</p>
            </div>
            <p className="text-xs text-muted-foreground">Mots</p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-0">
          <CardContent>
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-2xl font-bold">{chars}</p>
            </div>
            <p className="text-xs text-muted-foreground">Caractères</p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-0">
          <CardContent>
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-2xl font-bold">{charsWithoutSpaces}</p>
            </div>
            <p className="text-xs text-muted-foreground">
              Caractères sans espaces
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-0">
          <CardContent>
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-2xl font-bold">{paragraphs}</p>
            </div>
            <p className="text-xs text-muted-foreground">Paragraphes</p>
          </CardContent>
        </Card>
      </div>

      <Textarea
        className="mt-2 border resize-none"
        placeholder="Collez votre texte ici"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "auto";
          target.style.height = target.scrollHeight + "px";
        }}
        style={{ overflow: "hidden", height: "80px" }}
      />
    </div>
  );
};

export { WordCounter };
