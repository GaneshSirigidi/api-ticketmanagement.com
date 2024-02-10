import passport from 'passport'
import LocalStrategy from 'passport-local'

import { UserDataServiceProvider } from '../services/userDataServiceProvider'

const userDataServiceProvider = new UserDataServiceProvider()

passport.use('signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (username, password, done) => {
  try {
    let user = await userDataServiceProvider.login(username, password)

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    done(error);
  }
}));

export default passport