import mongoose, { Schema, Document, Types, PopulatedDoc } from "mongoose";

export interface IUser extends Document {
    email: string,
    password: string,
    name: string,
    delegates: PopulatedDoc<IUser & Document>[]
}

const userSchema: Schema = new Schema({
    email: {
        type: String,
        require: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    delegates: [
        {
            type: Types.ObjectId,
            ref: "User"
        }
    ]
})

const User = mongoose.model<IUser>("User", userSchema)
export default User