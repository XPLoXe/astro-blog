// src/utils/markdownToHtml.js
import showdown from "showdown";

export function markdownToHtml(markdown) {
  const converter = new showdown.Converter();
  return converter.makeHtml(markdown);
}
