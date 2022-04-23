import express, { Application } from 'express';
import userRoutes from '../routes/userRoutes';

class Server {

  private app: Application;
  private port: string;
  private apiPaths = {
    users: '/api/v1/user',
  }

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3001';
    this.routes();
  }

  routes() {
    this.app.use( this.apiPaths.users, userRoutes );
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('server on port', this.port);
    });
  }

}

export default Server;
