import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router,
              private service : AuthService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.router.navigate(['tecnicos'])
  }

  logout(){
    this.router.navigate(['login']);
    this.service.logout();
    this.toastr.info('Logout realizado com sucesso','Logout',{timeOut: 7000})
  }

}