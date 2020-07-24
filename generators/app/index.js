const Generator = require("yeoman-generator");
// const nodeFs = require("fs");
module.exports = class extends Generator {
  // prompting() {
  //   this.spawnCommandSync("npm", ["init"]);
  // }

  _addTsConfig() {
    this.fs.copyTpl(
      this.templatePath("tsconfig.json"),
      this.destinationPath("tsconfig.json")
    );
  }

  _addWebpackConfig() {
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

  _addESLintConfig() {
    this.fs.copyTpl(
      this.templatePath(".eslint.js"),
      this.destinationPath(".eslint.js")
    );
  }

  _addScripts() {
    return this.fs.extendJSON(
      this.destinationPath("package.json"),
      this.fs.readJSON(this.templatePath("package.json"))
    );
  }

  _createIndexFile() {
    this.fs.copyTpl(
      this.templatePath("src/index.ts"),
      this.destinationPath("src/index.ts")
    );
  }
  writing() {
    this._addESLintConfig();
    this._addTsConfig();
    this._addWebpackConfig();
    this._createIndexFile();
    return this._addScripts();
  }
  _installBabel() {
    this.npmInstall(["@babel/core", "@babel/preset-typescript"], {
      "save-dev": true,
    });
  }
  _installWebpack() {
    this.npmInstall(
      ["webpack", "webpack-cli", "babel-loader", "webpack-merge"],
      {
        "save-dev": true,
      }
    );
  }
  _installTypescript() {
    this.npmInstall(["typescript"], { "save-dev": true });
  }

  _installEslint() {
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

  install() {
    this._installBabel();
    this._installTypescript();
    this._installEslint();
    this._installWebpack();
  }
};
