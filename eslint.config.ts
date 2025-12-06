import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import prettierConfig from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { ignores: ["dist/", "node_modules/"] },
  {
    files: [
      "./**/*.ts",
      "./src/**/*.{ts,tsx,mts}",
      "./tsconfig.esm.json",
      "./tsconfig.cjs.json",
      "./prettier.config.ts",
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  pluginReact.configs.flat.all,
  pluginReactHooks.configs.flat.recommended,
  prettierConfig,
]);
