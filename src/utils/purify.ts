import DOMPurify from "dompurify";

export default function sanitize(
  html: string | HTMLElement | DocumentFragment,
  config?: DOMPurify.Config
): string {
  if (!config) return DOMPurify.sanitize(html).toString();
  return DOMPurify.sanitize(html, config).toString();
}
