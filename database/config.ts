import mongoose, { ConnectOptions } from 'mongoose';

export const dbConnection = async() => {
  try {
    await mongoose.connect( process.env.MOGODB_URI || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as ConnectOptions );

    console.log('db connected');

  } catch (error) {
    console.log( error );
    throw new Error('error connecting to database');
  }
}
