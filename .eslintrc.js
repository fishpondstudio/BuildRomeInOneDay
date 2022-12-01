module.exports = {
   env: {
      browser: true,
      es2021: true,
   },
   extends: ["plugin:react/recommended", "standard-with-typescript", "plugin:react/jsx-runtime", "prettier"],
   overrides: [],
   parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      project: ["./tsconfig.json"],
   },
   plugins: ["react"],
   rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-dynamic-delete": "off",
   },
};
