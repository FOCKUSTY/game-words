import mongoose, { Schema, SchemaTypes } from 'mongoose';

const schema = new Schema<{name: string, words: []}>({
    name: { type: SchemaTypes.String, required: true, unique: true },
    words: [{ type: SchemaTypes.String }]
});

const database = mongoose.model('words', schema)

export default database;