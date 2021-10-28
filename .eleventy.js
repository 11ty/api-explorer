const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: "dynamic",
    functionsDir: "./netlify/functions/",
    redirects: "netlify-toml-functions",
  });
};