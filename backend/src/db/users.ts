import mongoose from 'mongoose'

// Define schema

const UserSchema = new mongoose.Schema({
    userName:{type:String, required:true},
    email:{type:String, required:true},
    authentication:{
        password:{type:String, required: true, select:false},
        salt:{type:String , select:false},
        sessionToken:{type:String, select:false},
    },
});

export const UserModel = mongoose.model('User', UserSchema)


//function to get users
export const getUser = () => UserModel.find();
export const getUserByEmail = (email:string) => UserModel.findOne({email});
export const getUserBySessionToken = (sessionToken:string) => UserModel.findOne({
    'authentication.sessionToken':sessionToken,
});
export const getUserById = (id:string) => UserModel.findOne({id});
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id:string) => UserModel.findOne({_id: id});

export const updateUserByEmail = (id:string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);



