import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  url = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getTickets() {
    return this.http.get(`${this.url}/tickets`);
  }

  getTicketById(id) {
    return this.http.get(`${this.url}/tickets/${id}`);
  }

  addTicket(title, raisedby, responsible, description, severity) {
    const ticket = {
      title: title,
      raisedby: raisedby,
      responsible: responsible,
      description: description,
      severity: severity
    };
    return this.http.post(`${this.url}/tickets/add`, ticket);
  }

  updateTicket(id, title, raisedby, responsible, description, severity, status) {
    const ticket = {
      title: title,
      raisedby: raisedby,
      responsible: responsible,
      description: description,
      severity: severity,
      status: status
    };
    return this.http.post(`${this.url}/tickets/update/${id}`, ticket);
  }

  deleteTicket(id) {
    return this.http.get(`${this.url}/tickets/delete/${id}`);
  }
}
