import 'babel-polyfill';
import app                               from './server';
import { connectDatabase }               from './server/db';
import { development, test, production } from './server/db/config';

const port = process.env.PORT || 8080;
const databaseConfig = process.env.NODE_ENV === 'production' ? production : development;

(async() => {
  try {
    const info = await connectDatabase(databaseConfig);
    console.log(`Connected to ${info.host}:${info.port}/${info.name} database`);

    await app.listen(port);
    console.log(`Server started on port ${port}`);
  } catch (error) {
    console.error('Unable to connect to database', error);
  }
})();
