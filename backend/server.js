import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Ticket from './models/ticket';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/tickets');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

router.route('/tickets').get((req, res) => {
    Ticket.find((err, tickets) => {
        if (err)
           console.log(err);
        else 
           res.json(tickets);
    });
});

router.route('/tickets/:id').get((req, res) => {
    Ticket.findById(req.params.id, (err, ticket) => {
        if (err)
           console.log(err);
        else
           res.json(ticket);
    });
});

router.route('/tickets/add').post((req, res) => {
    let ticket = new Ticket(req.body);
    ticket.save()
        .then(ticket => {
            res.status(200).json({'ticket': 'Generated Successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new ticket');
        });
});

router.route('/tickets/update/:id').post((req, res) => {
    Ticket.findById(req.params.id, (err, ticket) => {
        if (!ticket)
           return next(new Error('Could not load ticket!'));
        else {
            ticket.title = req.body.title;
            ticket.raisedby = req.body.raisedby;
            ticket.responsible = req.body.responsible;
            ticket.description = req.body.description;
            ticket.severity = req.body.status;
            ticket.status = req.body.status;

            ticket.save().then(ticket => {
                res.json('Ticket updated');
            }).catch(err => {
                res.status(400).send('Update Failed!');
            });
        }
    });
});

router.route('/tickets/delete/:id').get((req, res) => {
    Ticket.findByIdAndRemove({_id: req.params.id}, (err, ticket) => {
        if (err)
           res.json(err);
        else 
           res.json('Ticket Deleted Successfully');
    });
});

app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000'));