import antfu from "@antfu/eslint-config";

export default antfu({
  typescript: true,
  stylistic: {
    indent: 2,
    quotes: "double",
    semi: true,
  },
  rules: {
    "antfu/top-level-function": "off",
    "ts/explicit-function-return-type": "off",
  },
  formatters: {
    html: true,
    css: true,
    markdown: true,
  },
  ignores: ["**/dist/**/*"],
});
