import { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
});

const SEARCH_QUERY = gql`
  query SearchQuery($searchTerm: String!) {
    search(searchTerm: $searchTerm) {
      filename
      occurrences {
        page
        count
      }
    }
  }
`;

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const { data } = await client.query({
      query: SEARCH_QUERY,
      variables: { searchTerm },
    });
    setSearchResults(data.search);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      {searchResults &&
        searchResults.map((result) => (
          <div key={result.filename}>
            <h3>{result.filename}</h3>
            {result.occurrences.map((occurrence) => (
              <div key={occurrence.page}>
                <p>Page: {occurrence.page}</p>
                <p>Count: {occurrence.count}</p>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Search</h1>
        <Search />
      </div>
    </ApolloProvider>
  );
}

export default App;
