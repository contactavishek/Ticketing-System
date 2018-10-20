import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketService } from '../../ticket.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;
  constructor(private ticketService: TicketService, private fb: FormBuilder,
    private router: Router) {
      this.createForm = this.fb.group({
        title: ['', Validators.required],
        raisedby: ['', Validators.required],
        responsible: ['', Validators.required],
        description: ['', Validators.required],
        severity: ''
      });
    }

  addTicket(title, raisedby, responsible, description, severity) {
    this.ticketService.addTicket(title, raisedby, responsible, description, severity).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }

  ngOnInit() {
  }

}
