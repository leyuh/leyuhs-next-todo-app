import { model, models, Schema, Types } from "mongoose";

const itemSchema = new Schema({
    title: String,
    description: String,
    boardId: Types.ObjectId,
    listId: Types.ObjectId
}, { timestamps: true });

const ItemModel = models?.Item || model("Item", itemSchema);

export default ItemModel;