import React, {useEffect, useState} from 'react';
import {Queries} from '../common/generated/graphql-queries.generated';
import ApolloClient from 'apollo-client';
import {BatchHttpLink} from 'apollo-link-batch-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {GetAllPostsQuery} from '../common/generated/graphql-client-types.generated';
import {CacheRedirects} from '../common/generated/graphql-cache-redirects.generated';

function App() {
  const [posts, setPosts] = useState<GetAllPostsQuery['getPosts']>([]);

  useEffect(() => {
    // This is only an example. The ApolloClient should not be instantiated here.
    const client = new ApolloClient({
      link: new BatchHttpLink({
        uri: '/api/graphql',
      }),
      cache: new InMemoryCache({
        cacheRedirects: CacheRedirects, // use the auto-generated CacheRedirects
      }),
    });

    Queries
      .GetAllPosts(client, { variables: {} })
      .then((response) => setPosts(response.data.getPosts));
  }, []);

  return (
    <div>
      Hello World!

      {posts.map((post) => (
        <div>
          <h3>{post.title}</h3>
          <p>
            {post.text}
          </p>
        </div>
      ))}
    </div>
  );
}

export default React.memo(App);