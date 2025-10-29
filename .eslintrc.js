module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "no-console": ["error", { allow: ["warn", "error"] }],
    "react/jsx-no-literals": [
      2,
      {
        noStrings: true,
        allowedStrings: ["allowed"],
        ignoreProps: true,
        noAttributeStrings: true,
      },
    ],
  },
};
