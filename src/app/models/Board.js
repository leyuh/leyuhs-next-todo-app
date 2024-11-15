import { model, models, Schema, Types } from "mongoose";

const boardSchema = new Schema({
    title: String,
    backgroundImage: String,
    backgroundColor: String,
    isStarred: Boolean,
    userId: Types.ObjectId
}, { timestamps: true });

const BoardModel = models?.Board || model("Board", boardSchema);

export default BoardModel;