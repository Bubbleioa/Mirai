module.exports = {
  siteMetadata: {
      title: `Mirai`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: ["gatsby-plugin-react-helmet", `gatsby-plugin-transition-link`, "gatsby-plugin-mdx", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  }]
};