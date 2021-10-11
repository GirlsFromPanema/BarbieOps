import { connect } from "mongoose";
import { validateEnv } from "./validateEnv"

export const connectDatabase = async () => {
    await connect(process.env.MONGO_URI as string);
    console.log("Database Connected!")
}