const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  twitterProvider: {
    type: {
      id: String,
      token: String
    },
    select: false
  }
});

userSchema.set('toJSON', { getters: true, virtuals: true });

userSchema.statics.upsertTwitterUser = async function upsertTwitterUser(token, tokenSecret, profile, cb) {
  try {
    const user = await this.findOne({ 'twitterProvider.id': profile.id });
    if (!user) {
      const newUser = new this({
        email: profile.emails[0].value,
        twitterProvider: {
          id: profile.id,
          token,
          tokenSecret
        }
      });
      const savedUser = await newUser.save();
      return cb(savedUser);
    }
    return cb(user);
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = mongoose.model('User', userSchema);
