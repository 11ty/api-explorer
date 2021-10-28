const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: "dynamic",
    functionsDir: "./netlify/functions/",
    redirects: "netlify-toml-functions",
  });

  eleventyConfig.addShortcode("opengraphHtml", function(targetUrl, htmlOptions = {}) {
    let url = `https://v1.opengraph.11ty.dev/${encodeURIComponent(targetUrl)}/`;

    let options = {
      formats: ["webp", "jpeg"], // careful, AVIF here is a little slow!
      widths: [375, 650], // left the 1200 size off for now
      urlFormat: function({width, format}) {
        let size = "auto";
        if(width <= 400) {
          size = "small";
        } else if(width <= 700) {
          size = "medium";
        }
        
        return `${url}${size}/${format}/`;
      }
    };
    
    let stats = Image.statsByDimensionsSync(url, 1200, 630, options);
    return Image.generateHTML(stats, Object.assign({
      alt: `OpenGraph image for ${targetUrl}`,
      loading: "lazy",
      decoding: "async",
      sizes: "100vw",
    }, htmlOptions), {
      whitespaceMode: "block",
    });
  });
};