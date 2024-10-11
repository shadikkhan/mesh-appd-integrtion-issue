import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

/**
 * Construct a GraphQL schema and define the necessary resolvers.
 *
 * type Query {
 *   hello: String
 * }
 */
import axios from 'axios';

export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'abc',
        fields: {
            hello: {
                type: GraphQLString,
                resolve: () => 'world',
            },
            greet: {
                type: GraphQLString,
                resolve: async () => {
                    try {
                        const response = await axios.get('http://jsonplaceholder.typicode.com/todos/1');
                        const data: any = await response.data;
                        return JSON.stringify(data); // Assuming the API response has a "message" field
                        // return "data.title"; // Assuming the API response has a "message" field
                    } catch (error) {
                        console.error('Error fetching data:', error);
                        throw new Error('Failed to fetch data from the API');
                    }
                },
            },
        },
    }),
});