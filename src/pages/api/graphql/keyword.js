import { ApolloServer, gql } from 'apollo-server-micro';
import mongoose from 'mongoose';
import escapeStringRegexp from 'escape-string-regexp';

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("database connected"));

const textSchema = new mongoose.Schema({
  _id: String,
  pagetitle: String,
  rawDateObject: String,
  slug: String,
  sortableDate: Number,
  source: String,
  year: Number,
  filename: String,
  pagecontent: String,
});

const Text = mongoose.model('newspeechtexts', textSchema);

const typeDefs = gql`
  type Context {
    context: String
    matchIndex: Int
  }

  type SearchResult {
    filename: String
    slug: String
    source: String
    pagetitle: String
    year: Int
    sortableDate: Int
    rawDateObject: String
    contexts: [Context]
  }

  type Query {
    searchKeyword(keyword: String): [SearchResult]
  }
`;

const resolvers = {
  Query: {
    searchKeyword: async (_, { keyword }) => {
      const regex = new RegExp(`${keyword}`, 'gi');
      const texts = await Text.find({ pagecontent: regex });

      const results = texts.map((text) => {
        const contextArray = [];
        const pageContent = text.pagecontent;
        let startIndex = 0;

        while (true) {
          const matchIndex = pageContent.substring(startIndex).search(regex);
          if (matchIndex === -1) break;

          const matchStartIndex = startIndex + matchIndex;
          const matchEndIndex = matchStartIndex + keyword.length;
          const contextStartIndex = Math.max(matchStartIndex - 250, 0);
          const contextEndIndex = Math.min(matchEndIndex + 250, pageContent.length);
          const context = pageContent.substring(contextStartIndex, contextEndIndex);

          contextArray.push({
            context: context,
            matchIndex: matchStartIndex,
          });

          startIndex = matchEndIndex;
        }

        return {
          filename: text.filename,
          slug: text.slug,
          source: text.source,
          pagetitle: text.pagetitle,
          year: text.year,
          sortableDate: text.sortableDate,
          rawDateObject: text.rawDateObject,
          contexts: contextArray,
        };
      });

      return results;
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

export default apolloServer.createHandler({ path: '/api/graphql' });

