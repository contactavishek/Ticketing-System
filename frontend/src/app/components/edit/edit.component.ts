import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { TicketService } from '../../ticket.service';
import { Ticket } from '../../ticket.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  ticket: any = {};
  updateForm: FormGroup;

  constructor(private ticketService: TicketService, private router: Router, 
    private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
      this.createForm();
     }

  createForm() {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      raisedby: ['', Validators.required],
      responsible: ['', Validators.required],
      description: ['', Validators.required],
      severity: '',
      status: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.ticketService.getTicketById(this.id).subscribe(res => {
        this.ticket = res;
        this.updateForm.get('title').setValue(this.ticket.title);
        this.updateForm.get('raisedby').setValue(this.ticket.raisedby);
        this.updateForm.get('responsible').setValue(this.ticket.responsible);
        this.updateForm.get('description').setValue(this.ticket.description);
        this.updateForm.get('severity').setValue(this.ticket.severity);
        this.updateForm.get('status').setValue(this.ticket.status);
      });
    });
  }

  updateTicket(title, raisedby, responsible, description, severity,status) {
    this.ticketService.updateTicket(this.id, title, raisedby, responsible, description, severity, status)
    .subscribe(() => {
      this.snackBar.open('Ticket updated successfully', 'OK', {
        duration: 3000
      });
    });
  }
}
