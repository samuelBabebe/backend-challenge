import mongoose from "mongoose";

export default function connectToMongoose() {
    return new Promise((resolve,reject) => {
        mongoose.connect("mongodb://localhost:27017/Assessment", async (err) => {
          if (err) {
            console.error("Db not connected....");
            throw err;
          }
          console.log("Db connected...");
          resolve();
        });
    })
}

export function closeConnection() {
    mongoose.connection.close();
}
