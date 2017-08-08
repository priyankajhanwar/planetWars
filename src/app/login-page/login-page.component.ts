import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../search.service';
import { Http } from '@angular/http';	
import { LoginService } from '../login.service';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent  {

	constructor(private router: Router,
				private http:Http,
				private searchService: SearchService,
				private loginService: LoginService) {}

	title = 'app works!';
	uname='C-3PO';
	pwd='112BBY';

	// other credentials-"Luke Skywalker,19BBY"
	loginData:any;

	onLogin(user,password){

		this.loginService.onLogin(user,password)
		.subscribe(data => {
			this.loginData = data.results;
			if(user===this.loginData[0].name && password===this.loginData[0].birth_year){

				this.router.navigate(['/search',user]);  
			}
			else{
				alert("please insert valid credentials");
			}
		});
	}

}