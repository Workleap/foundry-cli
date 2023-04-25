import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/bin.ts"],
    clean: true,
    format: ["esm"]
});
