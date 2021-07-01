export function assertNever(never: never): never {
  throw new Error("Unexpected value. Should have been never.");
}
