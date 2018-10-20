import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Ticket } from '../../ticket.model';
import { TicketService } from '../../ticket.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  tickets: Ticket[];
  displayedColumn = ['title', 'raisedby', 'responsible', 'severity', 'status', 'actions'];

  constructor(private ticketService: TicketService, private router: Router) { }

  ngOnInit() {
    this.fetchTickets();
  }

  fetchTickets() {
    this.ticketService.getTickets().subscribe((data: Ticket[]) => {
      this.tickets = data;
      console.log('Data requested: ');
      console.log(this.tickets);
    });
  }

  editTicket(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteTicket(id) {
    this.ticketService.deleteTicket(id).subscribe(() => {
      this.fetchTickets();
    });
  }

}
