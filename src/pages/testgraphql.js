import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, gql, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache()
});

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const SEARCH_QUERY = gql`
      query SearchQuery($keyword: String!) {
        searchKeyword(keyword: $keyword) {
          filename
          slug
          source
          pagetitle
          year
          sortableDate
          rawDateObject
          contexts {
            context
            matchIndex
          }
        }
      }
    `;

    const { data } = await client.query({
      query: SEARCH_QUERY,
      variables: { keyword: searchTerm }
    });

    setSearchResults(data.searchKeyword);
  }

  return (
    <ApolloProvider client={client}>
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
        <button type="submit">Search</button>
      </form>
      {searchResults.length > 0 && searchResults.map((result) => (
        <div key={result.slug}>
          <h2>{result.pagetitle}</h2>
          <p>Source: {result.source}</p>
          <p>Year: {result.year}</p>
          {result.contexts.length > 0 && result.contexts.map((context) => (
            <p key={context.matchIndex}>{context.context}</p>
          ))}
        </div>
      ))}
    </ApolloProvider>
  );
}
