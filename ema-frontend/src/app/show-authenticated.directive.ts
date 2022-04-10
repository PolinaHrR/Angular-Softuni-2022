import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from "./auth.service";

@Directive({
  selector: '[appShowAuthenticated]'
})
export class ShowAuthenticatedDirective implements OnInit {
  @Input() appShowAuthenticated: boolean = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private authService: AuthService,
    private viewContainer: ViewContainerRef
  ) {
  }

  ngOnInit(): void {
    this.authService.isAuth.subscribe(
      isAuth => {
        if (isAuth === this.appShowAuthenticated) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
  }
}
