const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        eventType: {
            type: String,
            enum: ['Battle 1vs1', 'Battle 2vs2', 'Exchange', 'Cooperative'],
            required: true,
        },
        location: {
            type: {
                type: String,
            },
            coordinates: {
                type: [Number],
            },
        },
        assistance: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
    },

    {
        timestamps: true,
    }
);

eventSchema.index({ location: "2dsphere" });

const Event = model("Event", eventSchema);

module.exports = Event;