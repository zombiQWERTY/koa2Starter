import mongoose         from 'mongoose-fill';
import { modelCleaner } from '../../db/utils';

const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
  login: {
    type:      String,
    required:  true,
    trim:      true,
    unique:    true,
    sparse:    true
  },
  email: {
    type:      String,
    required:  true,
    lowercase: true,
    trim:      true,
    unique:    true,
    sparse:    true
  },
  password: {
    type:     String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

modelCleaner(UserSchema);
export default mongoose.model('User', UserSchema);
