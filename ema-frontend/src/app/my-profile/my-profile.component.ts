import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { CreateItemGQL, CreateItemPageGQL, CreateItemPageQuery, UploadFileGQL } from "../../generated/graphql";
import { AuthService } from "../auth.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  error: string | null = null;
  success: boolean = false;
  form = this.formBuilder.group({
    title: '',
    description: '',
    age: '',
    gender: '',
    file: '',
    city: ''
  });
  private fileId: string | null = null;
  cities: Observable<CreateItemPageQuery['cities']>

  constructor(
    private formBuilder: FormBuilder,
    private query: CreateItemPageGQL,
    private mutation: CreateItemGQL,
    private uploadMutation: UploadFileGQL,
    private authService: AuthService
  ) {
    this.cities = query.watch().valueChanges.pipe(map(result => result.data.cities));
  }

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    console.log(event.target.files.length);
    if (event.target.files.length > 0) {
      this.uploadMutation.mutate({
        media: event.target.files[0]
      }).subscribe(result => {
        this.fileId = result?.data?.upload?.data?.id || null;
      });
    }
  }

  publish(): void {
    if (this.fileId) {
      this.mutation.mutate({
        age: this.form.value.age,
        gender: this.form.value.gender,
        description: this.form.value.description,
        title: this.form.value.title,
        uploadRef: this.fileId,
        user: this.authService.getUserId(),
        city: this.form.value.city
      }).subscribe({
        next: () => {
          this.success = true;
          this.error = null;
          this.form.reset();
        },
        error: (error) => {
          this.success = false;
          this.error = error;
        }
      });
    } else {
      this.error = "Please upload file!";
    }
  }

}
