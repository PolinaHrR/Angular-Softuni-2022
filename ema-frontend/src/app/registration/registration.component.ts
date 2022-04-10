import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { FormBuilder } from '@angular/forms';
import { RegisterGQL, RegisterMutation } from "../../generated/graphql";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form = this.formBuilder.group({
    username: '',
    email: '',
    password: ''
  });
  success: boolean = false;
  error: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private mutation: RegisterGQL,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  register(): void {
    this.mutation.mutate({
      email: this.form.value.email,
      password: this.form.value.password,
      username: this.form.value.username
    }).subscribe({
      next: ({ data }) => {
        this.success = true;
        this.error = null;
        this.form.reset();

        if (data?.register.jwt) {
          this.authService.setToken(data.register.jwt, data.register.user.id);
        }
      },
      error: (error => {
        this.success = false;
        this.error = error;
      })
    });
  }
}
