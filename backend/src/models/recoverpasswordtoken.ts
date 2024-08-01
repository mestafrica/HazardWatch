// import { Schema,model,models } from "mongoose";




// const TokenSchema = new Schema ({
//     userId:{
//         type:Schema.Types.ObjectId,
//         required:true,
//         ref:'User'
//     },
//     token:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     createdAt:{
//         type:Date,
//         default:Date.now()
//     },
//     //helps to invalidate the token when password is updated
//     resetAt:{
//         type:Date
//     }
// })


// //use existing model or create a new one
// const recoveryPasswordToken = models.recoveryPasswordToken ||model("recoveryPasswordToken",TokenSchema)

// export default recoveryPasswordToken