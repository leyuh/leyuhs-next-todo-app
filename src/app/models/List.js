import { model, models, Schema, Types } from "mongoose";

const listSchema = new Schema({
    title: String,
    boardId: Types.ObjectId
}, { timestamps: true });

const ListModel = models?.List || model("List", listSchema);

export default ListModel;