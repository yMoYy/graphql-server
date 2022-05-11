import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express, { Application } from 'express';
import http from 'http';

import { typeDefs } from '../queries/typeDefs';
import { resolvers } from '../resolvers/resolvers';

export default class ApolloGraphQLServerExpress {

  app: Application;
  httpServer:any;
  PORT:number = 4000;
  server:ApolloServer<ExpressContext>;
  
  constructor() {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer })],
    });
    this.PORT;
  }
  middlewares():void {
    this.server.applyMiddleware({
      app: this.app,
      path: '/'
    });
  }
  
  async startApolloServer():Promise<void> {
    await this.server.start();
    this.middlewares();
    await new Promise<void> (resolve => this.httpServer.listen({ port: this.PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${this.server.graphqlPath}`);
  }

}