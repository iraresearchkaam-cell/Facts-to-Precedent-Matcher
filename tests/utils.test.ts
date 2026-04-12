import test from "node:test";
import assert from "node:assert/strict";

import { cn } from "../src/lib/utils";

test("cn merges class names and resolves tailwind conflicts", () => {
  const result = cn("px-2", "text-sm", false, undefined, "px-4", ["font-bold"]);

  assert.equal(result, "text-sm px-4 font-bold");
});
