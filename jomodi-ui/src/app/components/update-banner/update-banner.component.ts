import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Banner } from '../../core/models/banner.interface';
import { deleteBanner, updateBanner } from '../../state/actions/banner.actions';
import { AppState } from '../../state/app.state';
import { selectCurrentBanner } from '../../state/selectors/banner.selector';

@Component({
  selector: 'app-update-banner',
  templateUrl: './update-banner.component.html',
  styleUrls: ['./update-banner.component.css']
})
export class UpdateBannerComponent {

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private fb: FormBuilder,
    ) {}

    private subscriptions = new Subscription();
    banner: Banner | null = null;
    form!: FormGroup;

    private initForm(): void {
      this.form = this.fb.group({
        title: ['']
      });
    }

    private updateForm(banner: Banner): void {
      this.form.setValue({
        title: banner.title
      });
    }

    ngOnInit() {
      this.initForm();
      this.subscriptions.add(
        this.store.select(selectCurrentBanner).subscribe(banner => {
          this.banner = banner;
          this.updateForm(banner as Banner);
        })
      );
    }

    onDelete() {
      this.store.dispatch(deleteBanner({ id: this.banner!.id }));
      this.router.navigate(['/admin/manage-banner']);
    }

    onSubmit() {
      this.store.dispatch(updateBanner({ id: this.banner!.id , data: this.form.value }));
      this.router.navigate(['/admin/manage-banner']);
    }

}
