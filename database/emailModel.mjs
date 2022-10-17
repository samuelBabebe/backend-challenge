import mongoose from "mongoose"

let emialSchema = mongoose.Schema({
    "Member ID":{type:String},
   
    "Name":{type:String},
    "Scheduled Date":{type:String}
})


let emailModel = mongoose.model("email",emialSchema)


export default emailModel