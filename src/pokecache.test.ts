import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { Cache } from "./pokecache.js";

describe("Cache", () => {
  let cache: Cache;

  beforeEach(() => {
    cache = new Cache(1000);
  });

  afterEach(() => {
    cache.stopReapLoop();
  });

  describe("add", () => {
    test("stores a value under its key", () => {
      cache.add("pikachu", { name: "Pikachu" });

      expect(cache.get("pikachu")).toEqual({ name: "Pikachu" });
    });

    test("replaces a value when the key already exists", () => {
      cache.add("count", 1);
      cache.add("count", 2);

      expect(cache.get("count")).toBe(2);
    });
  });

  describe("get", () => {
    test("returns the value stored under a key", () => {
      cache.add("count", 42);

      expect(cache.get("count")).toBe(42);
    });

    test("returns undefined when the key is not in the cache", () => {
      expect(cache.get("missing")).toBeUndefined();
    });
  });

  describe("reap loop", () => {
    test("removes expired values", async () => {
      cache.stopReapLoop();
      const interval = 20;
      cache = new Cache(interval);
      cache.add("stale", "value");

      await expect.poll(() => cache.get("stale"), {
        interval: 5,
        timeout: 500,
      }).toBeUndefined();
    });

    test("stopReapLoop keeps values after they expire", async () => {
      cache.stopReapLoop();
      const interval = 20;
      cache = new Cache(interval);
      cache.add("retained", "value");
      cache.stopReapLoop();
      const startedAt = Date.now();

      await expect.poll(
        () =>
          Date.now() - startedAt > interval * 2 &&
          cache.get("retained") === "value",
        { interval: 5, timeout: 500 },
      ).toBe(true);
    });
  });
});
