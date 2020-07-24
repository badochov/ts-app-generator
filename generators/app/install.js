
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