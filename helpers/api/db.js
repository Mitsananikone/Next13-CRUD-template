import getConfig from 'next/config';
import mongoose from 'mongoose';

const { serverRuntimeConfig } = getConfig();
const Schema = mongoose.Schema;

async function dbConnect() {
    if (mongoose.connection.readyState !== 0) return;
  
    await mongoose.connect(serverRuntimeConfig.dbUrl || process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
}

dbConnect(); // Call it once when the file is loaded

export const db = {
    User: userModel()
};

// mongoose models with schema definitions

function userModel() {
    const schema = new Schema({
        email: { type: String, unique: true, required: true },
        username: { type: String, unique: true, required: true },
        hash: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
    }, {
        // add createdAt and updatedAt timestamps
        timestamps: true
    });

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.hash;
        }
    });

    return mongoose.models.User || mongoose.model('User', schema);
}

export default dbConnect;
