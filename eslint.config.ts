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
    files: ["./**/*.ts", "./src/**/*.{ts,tsx,mts}"],
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      react: {
        version: "detect",
        defaultVersion: "16.8.0",
      },
    },
  },
  eslint.configs.recommended,
  pluginReact.configs.flat.all,
  pluginReact.configs.flat["jsx-runtime"],
  pluginReactHooks.configs.flat.recommended,
  tseslint.configs.recommended,
  prettierConfig,
]);
