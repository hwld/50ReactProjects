"use-strict";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    target: "esnext",
  },
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
exports.createPages = require("./gatsby-node/index").createPages;
