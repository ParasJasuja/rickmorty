module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  plugins: [
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `RAMA`,
        fieldName: `rickandmortyapi`,
        url: `https://rickandmortyapi.com/graphql`,
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `yellow`,
        showSpinner: false,
      },
    },
    `gatsby-plugin-sass`,
  ],
}
