const Mutation = require('./mutation');
const Query = require('./query');
const Note = require('./note');
const User = require('./users');
const { GraphQLDateTime } = require('graphql-iso-date');

module.exports = {
    Query,
    Mutation,
    Note,
    User,
    DateTime: GraphQLDateTime
};