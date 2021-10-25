const path = require("path")

const axios = require("axios")

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  const integerList = (start, length) =>
    Array.from({ length: length }, (v, k) => k + start)

  const rickMortyURL = `https://rickandmortyapi.com/api/character/${integerList(
    1,
    671
  )}`

  const rickMorty = await axios.get(rickMortyURL).catch(function (error) {
    if (error.response) {
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else if (error.request) {
      console.log(error.request)
    } else {
      console.log("Error", error.message)
    }
    console.log(error.config)
  })
  const query = await axios.get(rickMortyURL).catch(function (error) {
    if (error.response) {
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else if (error.request) {
      console.log(error.request)
    } else {
      console.log("Error", error.message)
    }
    console.log(error.config)
  })
  rickMorty.data.forEach(character => {
    const nodeContent = JSON.stringify(character)
    const nodeMeta = {
      id: character.id.toString(),
      parent: null,
      children: [],
      internal: {
        type: `Characters`,
        content: nodeContent,
        contentDigest: createContentDigest(character),
      },
    }
    const node = Object.assign({}, character, nodeMeta)
    createNode(node)
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const { data } = await graphql(`
    {
      allCharacters {
        nodes {
          id
          name
        }
      }
    }
  `)
  const characterTemplate = path.resolve("./src/templates/character.js")
  const characters = data.allCharacters.nodes
  characters.forEach(ch => {
    createPage({
      path: `/character/${ch.name}${ch.id}`,
      component: characterTemplate,
      context: {
        id: `${ch.id}`,
      },
    })
  })
}
