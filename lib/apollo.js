import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import fetch from "isomorphic-unfetch";
import Head from "next/head";
import { InMemoryCache } from "apollo-cache-inmemory";

export function withApollo(PageComponent) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState);

    return (
      // ApolloClient connects the server to the front-end of our code (UI)
      <ApolloProvider client={client}>
        {/*PageComponent is a  pass through for the page that needs to pass through */}
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  // gets your data ready to work with SSR
  // ctx is the response and headers etc
  WithApollo.getInitialProps = async ctx => {
    // pulling AppTree out of ctx
    const { AppTree } = ctx;
    // initialize apolloclient
    // initApolloClient is the broken out function at the button of the file
    // V this is for server side stufgf V
    const apolloClient = (ctx.apolloClient = initApolloClient());
    let pageProps = {};
    // if getInitialprops exists
    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx);
    }
    // if window does not exist which means we're on the server
    if (typeof window === "undefined") {
      // if there has been no redirect with in our page route
      // or if the repsonse has finished entirely
      if (ctx.res && ctx.res.finished) {
        return pageProps;
      }
      try {
        // allows us to mount our app and get all the data from the tree
        // before the application is rendered
        const { getDataFromTree } = await import("@apollo/react-ssr");
        await getDataFromTree(
          <AppTree
            pageProps={{
              ...pageProps,
              apolloClient
            }}
          />
        );
      } catch (e) {
        console.error(e);
      }
      // nextJS related and not super important
      Head.rewind();
    }
    // extract the apollo state
    const apolloState = apolloClient.cache.extract();
    return {
      ...pageProps,
      apolloState
    };
  };

  return WithApollo;
}

// function to initialize apollo client
const initApolloClient = (initialState = {}) => {
  const ssrMode = typeof window === "undefined";
  const cache = new InMemoryCache().restore(initialState);

  const client = new ApolloClient({
    ssrMode,
    uri: "http://localhost:3000/api/graphql",
    fetch,
    cache
  });
  return client;
};
