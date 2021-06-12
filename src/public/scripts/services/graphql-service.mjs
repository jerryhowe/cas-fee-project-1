export class GraphqlService {
  // eslint-disable-next-line class-methods-use-this
  ajax(query, headers) {
    const fetchHeaders = new Headers({
      'content-type': 'application/json',
      ...(headers || {}),
    })

    return fetch('/graphql', {
      method: 'POST',
      headers: fetchHeaders,
      body: JSON.stringify({ query }),
    })
      .then((x) => x.json())
      .then((x) => {
        if (x) {
          return x.data
        }
        return x
      })
      .catch((err) => console.log(err))
  }
}

export const graphqlService = new GraphqlService()
