const mongooseHidden = require('mongoose-hidden')({ autoHideObject: false, autoHideJSON: false });
const deepPopulate   = require('mongoose-deep-populate');

export const modelCleaner = Schema => {
  Schema.set('toJSON', {
    transform(doc, ret) {
      delete ret.createdAt;
      delete ret.updatedAt;
      delete ret.__v;
      delete ret.password;
      return ret;
    }
  });

  Schema.plugin(mongooseHidden);
};

export const enableDeepPopulate = (Schema, mongoose) => {
  Schema.plugin(deepPopulate(mongoose));
};
