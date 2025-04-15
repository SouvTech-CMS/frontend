import js from "@eslint/js"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"
import tseslint from "typescript-eslint"

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [
      "react-app",
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-console": "warn",
      semi: ["warn", "never"],
      "object-curly-spacing": ["warn", "always"],
      quotes: ["warn", "double"],
      "import/order": [
        1,
        {
          groups: [
            "external",
            "builtin",
            "internal",
            "sibling",
            "parent",
            "index",
          ],
        },
      ],
      "no-multiple-empty-lines": [
        "warn",
        {
          max: 1,
          maxBOF: 1,
          maxEOF: 1,
        },
      ],
      "no-restricted-imports": [
        "warn",
        {
          patterns: [".*"],
        },
      ],
    },
    overrides: [
      {
        files: ["**/*.ts?(x)"],
      },
    ],
  },
)
