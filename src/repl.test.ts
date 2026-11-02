import { cleanInput } from "./repl.js";
import { describe, expect, test } from "vitest";


describe.each([
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: " Sebulba!\n   Anakin,      Quadrinaros ",
    expected: ["sebulba", "anakin", "quadrinaros"],
  },
  {
    input: `GO placidly amid the noise and haste, and RemeMber what peace there may be in silence.

         As far as possible without surrender be on good      TERMS with all persons.    Speak   your truth quietly and clearly; and listen to others, even the dull and ignorant; they too have their story.`,
    expected: [
      "go",
      "placidly",
      "amid",
      "the",
      "noise",
      "and",
      "haste",
      "and",
      "remember",
      "what",
      "peace",
      "there",
      "may",
      "be",
      "in",
      "silence",
      "as",
      "far",
      "as",
      "possible",
      "without",
      "surrender",
      "be",
      "on",
      "good",
      "terms",
      "with",
      "all",
      "persons",
      "speak",
      "your",
      "truth",
      "quietly",
      "and",
      "clearly",
      "and",
      "listen",
      "to",
      "others",
      "even",
      "the",
      "dull",
      "and",
      "ignorant",
      "they",
      "too",
      "have",
      "their",
      "story",
    ],
  }
  // TODO: more test cases here
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    // TODO: call cleanInput with the input here
    const actual = cleanInput(input);
    // The `expect` and `toHaveLength` functions are from vitest
    // they will fail the test if the condition is not met
    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      // likewise, the `toBe` function will fail the test if the values are not equal
      expect(actual[i]).toBe(expected[i]);
    }
  });
});
