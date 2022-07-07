import Mutation from './mutation';
import Query from './query';
import Note from './note';
import User from './users';
import GraphQLDateTime from 'graphql-iso-date';

export default {
    Query,
    Mutation,
    Note,
    User,
    DateTime: GraphQLDateTime
};
