import { beforeEach, describe, expect, test } from "vitest";
import { Cache } from "./pokecache.js";

describe("Cache", () => {
  let cache: Cache;

  beforeEach(() => {
    cache = new Cache();
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
});
