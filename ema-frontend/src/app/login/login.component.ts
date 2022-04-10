import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { LoginGQL, RegisterGQL } from "../../generated/graphql";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = this.formBuilder.group({
    identifier: '',
    password: ''
  });
  error: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private mutation: LoginGQL,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.mutation.mutate({
      password: this.form.value.password,
      identifier: this.form.value.identifier
    }).subscribe({
      next: ({ data }) => {
        if (data?.login.jwt) {
          this.authService.setToken(data.login.jwt, data.login.user.id);

          this.router.navigate(['my-profile']);
        } else {
          this.error = '?!';
        }
      },
      error: (error => {
        this.error = error;
      })
    });
  }
}
