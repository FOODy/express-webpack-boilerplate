import {registerGraphqlTypes} from '../../lib/graphql/graphql-schema-builder';
import gql from 'graphql-tag';

registerGraphqlTypes(
  gql`
    type ClickInfo {
      count: Int!
      text: String!
    }

    extend type Query {
      getClicks: ClickInfo!
    }

    extend type Mutation {
      addClick: ClickInfo!
    }

    extend type Subscription {
      numClicksChanged: ClickInfo!
    }
  `,
  {
    ClickInfo: {
      text: (value: { count: number }) => {
        if (!value.count) {
          return 'Keine Klicks';
        }

        return value.count === 1 ? 'Ein Klick' : value.count + ' Klicks';
      },
    },

    Query: {
      getClicks: getClick,
    },

    Mutation: {
      addClick: async (_source, _args, { pubsub }) => {
        const clickInfo = addClick();

        await pubsub.publish(NUM_CLICKS_CHANGE, {
          numClicksChanged: clickInfo,
        });

        return clickInfo;
      },
    },

    Subscription: {
      numClicksChanged: {
        subscribe: (_source, _args, { pubsub }) => pubsub.asyncIterator(NUM_CLICKS_CHANGE),
      },
    },
  },
);

const NUM_CLICKS_CHANGE = 'NUM_CLICKS_CHANGE';

let numClicks = 0;

function getClick(): ClickInfo {
  return {
    count: numClicks,
  };
}

function addClick(): ClickInfo {
  ++numClicks;

  return getClick();
}

interface ClickInfo {
  count: number;
}