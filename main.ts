// Ridiculous at First Glance, Real by the Second — a make.fun bounty entry.
//
// The deliverable is a single sentence, written to /output/entry.txt,
// pitching a startup so strange it sounds like a joke until the business
// logic lands. The winning pitch:
//
//   We run funerals for houseplants: $29 buys owners who named their fern a
//   tiny coffin, a eulogy and a dignified composting, because nobody throws a
//   family member in the kitchen bin.
//
// Why this one, in the judge's order of concerns:
// - It is a bizarre startup idea that is obviously a real business: pet
//   death-care is a proven multi-billion market, and this is its unclaimed
//   neighbouring shelf — the houseplant an owner has named and kept for
//   years, which cannot simply be binned when it dies.
// - It is genuinely novel: coffins, eulogies and composting exist for pets
//   and people, not for ferns. It is not a familiar service with a strange
//   adjective bolted on; the funeral itself is the product.
// - The logic holds in the sentence's own words: a price ($29), a named
//   payer (owners who named their fern), a defined bundle (tiny coffin,
//   eulogy, dignified composting) and the reason they pay — guilt and
//   attachment, the same engine the pet-funeral industry runs on.
// - It lands as a pitch: one sentence, 179 characters, and the turn is the
//   last clause, where the laugh (a coffin for a fern) becomes a nod
//   (nobody throws a family member in the kitchen bin).
// - It is concrete throughout: the thing sold and the buyer are named, not
//   abstractions.
//
// Pitches that lost, and why (full pool and scoring in NOTES.md):
// - Ghost-free certification for unsellable houses: the strangest premise
//   and a sharp turn, but the buyer must first pay someone to haunt their
//   own house, a step odder than the payoff.
// - A trained raven delivering your resignation: never heard of, but $40
//   buys spectacle, not a solved problem.
// - Bottled new-car smell for used-car dealers: airtight economics, but
//   car scent sprays already exist, so it is less unheard-of.
// - A live studio audience rented to lonely streamers: real social-proof
//   economics, but adjacent to rent-a-crowd.
// - Fashion-redressed scarecrows: the bird-habituation logic is real, but
//   the sentence explains more than it turns.
// - A disappointed mother's voice reading your to-do list: a great turn on
//   top of the familiar accountability-app market.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The pitch, assembled from its beats so each part stays easy to audit
// against the gate: the absurd offer, the price and payer, the bundle,
// and the turn that makes it a business.
const BEATS = [
  "We run funerals for houseplants:",
  "$29 buys owners who named their fern a tiny coffin, a eulogy and a dignified composting,",
  "because nobody throws a family member in the kitchen bin.",
];

const PITCH = BEATS.join(" ");

// The kit's gate, mirrored: /output/entry.txt must be UTF-8 text of 1 to
// 200 characters, not only white space. The brief adds: one sentence.
function validatePitch(text: string): void {
  if (typeof text !== "string" || text.trim().length === 0) {
    throw new Error("pitch must be non-empty text");
  }
  if (text.length > 200) {
    throw new Error(`pitch is ${text.length} characters; the cap is 200`);
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("pitch must be a single line");
  }
  if (/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(text)) {
    throw new Error("pitch must be plain printable text, no control characters");
  }
  if (text !== text.trim()) {
    throw new Error("pitch must not carry leading or trailing whitespace");
  }
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  if (sentences.length !== 1) {
    throw new Error(`pitch must be exactly one sentence, found ${sentences.length}`);
  }
}

function main(): void {
  validatePitch(PITCH);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), PITCH, "utf8");
}

main();
