import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin: boolean = false; 

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  // form = new FormGroup({
  //   username: new FormControl(null, Validators.required),
  //   password: new FormControl(null, Validators.required),
  // });


    ngOnInit(): void {
    }
    
    signIn(credential: any) {
      
      this.authService.login(credential.email,credential.password)
        .subscribe(result => { 
          // console.log(result);
          if (result){
            let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
            this.router.navigate([returnUrl ||'/']);
          }
          else  
            this.invalidLogin = true; 
    });
        // this.authService.settoken();
  }

}
