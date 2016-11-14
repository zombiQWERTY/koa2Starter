import importDir           from 'import-dir';
import supertest           from 'supertest-as-promised';
import mongoose            from 'mongoose';
import chai                from 'chai';
import app                 from '../../src/server';
import { connectDatabase } from '../../src/server/db';
import { test }            from '../../src/server/db/config';

const routes  = importDir('./routes');
const request = supertest.agent(app.listen());
chai.should();

describe('Routes', () => {
  before(async () => {
    Object.keys(mongoose.models).forEach(async name => await mongoose.model(name).remove());
    await connectDatabase(test);
  });

  after(async () => {

  });

  routes.auth(request);
});
