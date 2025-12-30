// @ts-check
const tseslint = require("typescript-eslint");
const rootConfig = require("../../eslint.config.js");
const angular = require("angular-eslint");

module.exports = [
  ...rootConfig,
  {
    files: ["**/*.ts"],
    rules: {
      "no-prototype-builtins": "warn",
      "no-dupe-else-if": "warn",
      "no-self-assign": "warn",
      "no-constant-binary-expression": "warn",
      "no-unexpected-multiline": "warn",
      "no-extra-boolean-cast": "warn",
      "prefer-const": "warn",
      "no-var": "warn",
      "@typescript-eslint/array-type": "warn",
      "@typescript-eslint/no-wrapper-object-types": "warn",
      "@typescript-eslint/ban-tslint-comment": "warn",
      "@typescript-eslint/no-inferrable-types": "warn",
      "@typescript-eslint/no-array-constructor": "warn",
      "@typescript-eslint/consistent-generic-constructors": "warn",
      "@typescript-eslint/consistent-indexed-object-style": "warn",
      "@typescript-eslint/no-unused-expressions": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/no-empty-function": "warn",
      "@angular-eslint/no-empty-lifecycle-method": "warn",
      "@angular-eslint/no-output-on-prefix": "warn",
      "@typescript-eslint/prefer-for-of": "warn",
      "no-useless-escape": "warn",
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "sb",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "warn",
        {
          type: "element",
          prefix: "sb",
          style: "kebab-case",
        },
      ],
    },
  },
  {
      files: ["**/*.html"],
      rules: {
        "@angular-eslint/template/label-has-associated-control": "warn",
        "@angular-eslint/template/click-events-have-key-events": "warn",
        "@angular-eslint/template/interactive-supports-focus": "warn",
        "@angular-eslint/template/alt-text": "warn",
        "@angular-eslint/template/eqeqeq": "warn",
      },
    }
];
