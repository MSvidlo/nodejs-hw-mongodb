import { model} from 'mangoose';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema(
    {
        name: { type: String, required: true },
        email: {
            type:String, required:true,unique:true
        },
        password: {
            type:String,required:true
        },


    },
    { timestamps: true, versionKey: false },
);
usersSchema.methods.toJson = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
}
export const UsersCollection = model('users',usersSchema)
