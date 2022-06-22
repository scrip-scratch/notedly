const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const cors = require('cors');
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');
require('dotenv').config();

// Импортируем локальые модули
const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers/index');

// запускаем сервер на порте из .env или 4000
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const getUser = token => {
    if (token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            new Error ('Session invalid');
        }
    }
}

async function startApolloServer(typeDefs, resolvers, port, models) {
    // Настройка AppoloServer
    const server = new ApolloServer({
        typeDefs, 
        resolvers,
        validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
        context: async ({ req }) => {
            const token = req.headers.authorization;
            const user = await getUser(token);
            return { models, user };
        }
    });

    await server.start();
    
    const app = express();

    // app.use(helmet({
    //     crossOriginEmbedderPolicy: true,
    //     contentSecurityPolicy: true,
    // }));
    app.use(cors());

    // Применяем промежуточное ПО Appolo GraphQL и указываем путь к api
    server.applyMiddleware({app, path: '/api'});

    await new Promise(resolve => app.listen({port}, resolve));
    console.log(
        `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    )
}

startApolloServer(typeDefs, resolvers, port, models);

db.connect(DB_HOST);

