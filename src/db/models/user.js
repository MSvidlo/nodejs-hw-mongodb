import { Schema } from 'mongoose';

import mongoose from 'mongoose';



const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      validate: {
        validator: function (v) {

          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`,
      },
        required: [false, 'User email required'],
      unique:true
        },

  {
      timestamps: true,
      versionKey: false
    }}
);

const UsersCollection  = mongoose.model('users', usersSchema);

export default UsersCollection;

