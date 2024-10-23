import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  registerMode = false;
  users: any;

  constructor(private http: HttpClient, private accountService: AccountService) { }

  ngOnInit() {
    this.getUsers();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  onCancelRegister(event: boolean) {
    this.registerMode = event;
  }

  getUsers() {
    let token = this.accountService.getCurrentUser()?.token;
    this.http.get('https://localhost:5001/api/users', { headers: new HttpHeaders().set('Authorization', 'Bearer ' + token) }).subscribe({
      next: data => this.users = data,
      error: error => console.error('There was an error!', error),
      complete: () => console.log('Completed!')
    });
  }

}
