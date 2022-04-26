import { Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(({
  name:{
    type: String,
    required: [true, "User must have a name"],
    trim: true,
  },

  email: {
    type: String,
    required: [true, "User must have a email"],
    trim: true,
    unique: true,
    lowerCase: true,
    validate: [validator.isEmail, "User must have a valid email"],
  },

  password:{
    type: String,
    required: [true, "User must have a password"],
    minLength: 8,
    select: false
  },

  passwordConfirm: {
    type: String,
    required: [true, "User must have a password"],
    validate:{
      // WORKS ONLY ON SAVE and CREATE!!!
      validator: function(el) {
        return el === this.password;
      },
      message: "The passwords must be the same!"
    }
  },

  passwordChangedAt: Date,

  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  }
}));

userSchema.pre('save', async function(next) {
  // Only run if the password was actually modified
  if(!this.isModified('password')) return next();
  
  // Hash password
  this.password = await bcrypt.hash(this.password, 12);

  // Delete password confirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
  const isEqual = await bcrypt.compare(candidatePassword, userPassword);
  return isEqual;
}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
  if(this.passwordChangedAt){
    const changeTimestamp = this.passwordChangedAt.getTime() / 1000;

    return true;
  }
  
  return false;
}

const User = model('user', userSchema);

export default User;