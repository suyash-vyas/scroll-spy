import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import prettierConfig from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { ignores: ["dist/", "node_modules/"] },
  {
    files: ["./src/**/*.{ts,tsx,mts}"],
    languageOptions: { globals: globals.browser },
  },
  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  pluginReact.configs.flat.recommended,
  pluginReactHooks.configs.flat.recommended,
  pluginJsxA11y.configs.flat.recommended,
  prettierConfig,
]);
