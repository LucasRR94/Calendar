module.exports = {
  overrides: [
    {
      files: ".eslintrc.js",
      options: {
        parser: "babel-eslint",
      },
    },
  ],
  extends: ["eslint-config-prettier"],
};
