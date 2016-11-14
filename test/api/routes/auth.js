import chai  from 'chai';
import Faker from 'faker';

const expect = chai.expect;

Faker.locale = 'ru';

export default function testUser(request) {
  const email    = Faker.internet.email();
  const password = Faker.internet.password();

  let TOKEN = null;
  let ID    = null;

  describe('Registration', () => {
    it('should register fake user', done => {
      request
        .post('/api/auth/register')
        .send({
          avatar:     require('mongoose').Types.ObjectId(),
          name:       Faker.name.firstName(),
          surname:    Faker.name.lastName(),
          birthdate:  Faker.date.past(),
          country:    1,
          region:     261,
          city:       1367,
          login:      Faker.internet.userName(),
          email:      email,
          password:   password
        })
        .expect(200);
        .end(function(err, res) {
          if (err) { return done(err); }
          expect(res.body.token).to.exist;
          TOKEN = res.body.token;
          ID    = res.body.user._id;
          done();
        });
    });
  });

  describe('Logging in', () => {
    it('should login as fake user', done => {
      request
        .post('/api/auth/login/')
        .send({ email, password })
        .expect(200);
        .end(function(err, res) {
          if (err) { return done(err); }
          TOKEN = res.body.token;
          done();
        });
    });
  });

  describe('Edit user', () => {
    it('should edit user account name', done => {
      request
        .patch('/api/user/' + ID)
        .set({ Authorization: TOKEN })
        .send({ name: Faker.name.firstName() })
        .expect(200);
        .end(function(err, res) {
          if (err) { return done(err); }
          done();
        });
    });
  });

  describe('Logging out', () => {
    it('should log out current user', done => {
      request
        .delete('/api/auth/logout')
        .set({ Authorization: TOKEN })
        .expect(200);
        .end(function(err, res) {
          if (err) { return done(err); }
          TOKEN = null;
          done();
        });
    });
  });
}
