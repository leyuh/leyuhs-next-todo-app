import { model, models, Schema, Types } from "mongoose";

const listSchema = new Schema({
    title: String,
    boardId: Types.ObjectId
}, { timestamps: true });

const List = models?.List || model("List", listSchema);

export default List;