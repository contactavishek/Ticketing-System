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
        default: 'Low'
    },
    status: {
        type: String,
        default: 'Open'
    }
});

export default mongoose.model('Ticket', Ticket);
