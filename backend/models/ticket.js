import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Ticket = new Schema({
    title: {
        type: String,
        required: true
    },
    raisedby: {
        type: String,
        required: true
    },
    responsible: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        default: 'low'
    },
    status: {
        type: String,
        default: 'open'
    }
});

export default mongoose.model('Ticket', Ticket);
