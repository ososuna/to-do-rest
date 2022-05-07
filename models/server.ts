import express, { Application } from 'express';
import userRoutes from '../routes/userRoutes';
import authRoutes from '../routes/authRoutes';
import { dbConnection } from '../database/config';

class Server {

  private app:  Application;
  private port: string;
  private apiPaths = {
    auth: '/api/v1/auth',
    users: '/api/v1/user',
  }

  constructor() {
    this.app  = express();
    this.app.use(express.json());
    this.port = process.env.PORT || '3001';
    this.connectDB();
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  routes() {
    this.app.use( this.apiPaths.auth, authRoutes );
    this.app.use( this.apiPaths.users, userRoutes );
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('server on port', this.port);
    });
  }

}

export default Server;
