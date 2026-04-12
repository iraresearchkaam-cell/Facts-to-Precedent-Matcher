import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { renderMarkdown } from "../src/lib/memo-markdown";

const renderMarkup = (markdown: string) =>
  renderToStaticMarkup(<>{renderMarkdown(markdown)}</>);

test("renderMarkdown renders headings, paragraphs, lists, and spacing", () => {
  const html = renderMarkup([
    "# Title",
    "## Section",
    "### Subsection",
    "**Important**",
    "- Item one",
    "",
    "A plain paragraph.",
  ].join("\n"));

  assert.match(html, /<h1[^>]*>Title<\/h1>/);
  assert.match(html, /<h2[^>]*>Section<\/h2>/);
  assert.match(html, /<h3[^>]*>Subsection<\/h3>/);
  assert.match(html, /<p[^>]*>Important<\/p>/);
  assert.match(html, /<li[^>]*>Item one<\/li>/);
  assert.match(html, /<div class="h-2"><\/div>/);
  assert.match(html, /<p[^>]*>A plain paragraph\.<\/p>/);
});

test("renderMarkdown renders markdown tables with headers and body rows", () => {
  const html = renderMarkup([
    "| Name | Result |",
    "| --- | --- |",
    "| Alpha | Win |",
    "| Beta | Loss |",
  ].join("\n"));

  assert.match(html, /<table[^>]*>/);
  assert.match(html, /<th[^>]*>Name<\/th>/);
  assert.match(html, /<th[^>]*>Result<\/th>/);
  assert.match(html, /<td[^>]*>Alpha<\/td>/);
  assert.match(html, /<td[^>]*>Win<\/td>/);
  assert.match(html, /<td[^>]*>Beta<\/td>/);
  assert.match(html, /<td[^>]*>Loss<\/td>/);
});

test("renderMarkdown renders table-like content without a separator as plain table rows", () => {
  const html = renderMarkup([
    "| Name | Result |",
    "| Alpha | Win |",
  ].join("\n"));

  assert.match(html, /<table[^>]*>/);
  assert.doesNotMatch(html, /<thead>/);
  assert.match(html, /<td[^>]*>Name<\/td>/);
  assert.match(html, /<td[^>]*>Result<\/td>/);
  assert.match(html, /<td[^>]*>Alpha<\/td>/);
  assert.match(html, /<td[^>]*>Win<\/td>/);
});
