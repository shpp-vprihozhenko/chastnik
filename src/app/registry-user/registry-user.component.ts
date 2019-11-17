import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../common-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registry-user',
  templateUrl: './registry-user.component.html',
  styleUrls: ['./registry-user.component.css']
})
export class RegistryUserComponent implements OnInit {
  
  name: string;
  pwd: string;
  email: string;

  fNewUser = false;
  reqMsg = '';

  constructor(private commonDataServ: CommonDataService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('email', this.email);
    console.log('pwd', this.pwd);
    if (this.checkReqFileds()){
      this.commonDataServ.checkUser(this.email, this.pwd).then( fUserOk =>{
        if (fUserOk) {
          console.log('user checked of', this.commonDataServ.commonDataObj.user);
          this.router.navigate(['/RSS']);
        } else {
          this.fNewUser = true;
        }
      })
    } 
  }

  checkReqFileds(fReqName=false) {
    this.reqMsg = '';
    if (!this.email) {
      this.reqMsg = 'Введите email';
      return false;
    }
    if (!this.pwd) {
      this.reqMsg = 'Введите пароль';
      return false;
    }
    if (fReqName) {
      if (!this.name) {
        this.reqMsg = 'Введите имя';
        return false;  
      }
    }
    return true;
  }

  onSubmitNew() { 
    console.log('name', this.name);
    console.log('email', this.email);
    console.log('pwd', this.pwd);
    if (this.checkReqFileds(true)) {
      console.log('ok for reg new user');
    }
  }

  cancelSubmit() {
    this.pwd = '';
    this.fNewUser = false;
  }
}
