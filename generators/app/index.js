const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  installBabel() {
    this.npmInstall(["@babel/core", "@babel/preset-typescript"], {
      "save-dev": true,
    });
  }
  installWebpack() {
    this.npmInstall(
      ["webpack", "webpack-cli", "babel-loader", "webpack-merge"],
      {
        "save-dev": true,
      }
    );
  }
  installTypescript() {
    this.npmInstall(["typescript"], { "save-dev": true });
  }

  installEslint() {
    this.npmInstall(
      [
        "@typescript-eslint/eslint-plugin",
        "@typescript-eslint/parser",
        "eslint",
        "eslint-config-prettier",
        "eslint-plugin-prettier",
        "prettier",
      ],
      { "save-dev": true }
    );
  }

  addTsConfig() {
    this.fs.copyTpl(
      this.templatePath("tsconfig.json"),
      this.destinationPath("tsconfig.json")
    );
  }

  addWebpackConfig() {
    const webpackFiles = [
      "webpack.common.js",
      "webpack.prod.js",
      "webpack.dev.js",
    ];
    for (const fileName of webpackFiles) {
      this.fs.copyTpl(
        this.templatePath(fileName),
        this.destinationPath(fileName)
      );
    }
  }

  addESLintConfig() {
    this.fs.copyTpl(
      this.templatePath(".eslint.js"),
      this.destinationPath(".eslint.js")
    );
  }

  addScripts() {
    const scripts = {
      scripts: {
        build: "webpack --config webpack.prod.js",
        watch: "webpack --config webpack.dev.js --watch",
      },
    };
    this.fs.extendJSON(this.destinationPath("package.json"), scripts);
  }
};
