// One-Star Review of Something Essential — make.fun bounty
// Entry: the funniest deadpan one-star review, 160 characters or fewer,
// of an everyday essential. The sun: shows up every day for billions of
// years and still clocks off at 5pm in winter. One star, would not recommend.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const entry =
  "Sun: shows up every day for billions of years and still clocks off at 5pm in winter. One star, would not recommend.";

// The gate wants one single line of 1-160 characters, nothing else —
// fail loudly instead of writing a bad entry.
if (entry.includes("\n") || entry.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (entry.length < 1 || entry.length > 160) {
  throw new Error(`entry must be 1-160 characters, got ${entry.length}`);
}
if (entry.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// A one-star review has to carry its rating in the text itself.
if (!/star/i.test(entry)) {
  throw new Error("entry must mention its one-star rating");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry, "utf8");

// Self-check: read the entry back and confirm it is exactly the review.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== entry) {
  throw new Error(`entry mismatch: wrote ${JSON.stringify(entry)}, read back ${JSON.stringify(written)}`);
}
console.log(`Entry: ${written}`);
console.log(`Character count: ${written.length} (limit 160, single line)`);
