import mongoose from "mongoose"

const patientsSchema = mongoose.Schema({
    "Program Identifier":{type:String},
    "Data Source":{type:String},
    "Card Number":{type:String},
    "Member ID":{type:String, unique:true},
    "First Name":{type:String},
    "Last Name":{type:String},
    "Date of Birth":{type:String},
    "Address1":{type:String},
    "Address 2":{type:String},
    "City":{type:String},
    "State":{type:String},
    "Zip code":{type:String},
    "Telephone number":{type:String},
    "Email Address":{type:String},
    "CONSENT":{type:String},
    "Mobile Phone":{type:String}


}) 

let patientsModel = mongoose.model("Patients",patientsSchema)

export default  patientsModel