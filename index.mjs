import mongoose from "mongoose";
import readWrite from "./readWrite.mjs";
import connectToMongoose, { closeConnection } from "./util.mjs";

try {
    await connectToMongoose();
    await readWrite(process.argv[2]);
    closeConnection();
} catch(err) {
    console.error(err);
}

