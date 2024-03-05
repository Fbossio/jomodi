import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { createBanner } from '../../state/actions/banner.actions';
import { AppState } from '../../state/app.state';

@Component({
  selector: 'app-create-banner',
  templateUrl: './create-banner.component.html',
  styleUrls: ['./create-banner.component.css']
})
export class CreateBannerComponent {

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router
    ) {}

  form!: FormGroup;
  fileName: string = 'No file selected';

  ngOnInit() {
    this.form = this.fb.group({
      title: [''],
      file: [null]
    });
  }

  createBanner(banner: any) {
    const formData = new FormData();
    formData.append('title', banner.title);
    formData.append('file', banner.file);
    this.store.dispatch(createBanner({ data: formData }));
    this.router.navigate(['/admin/manage-banner']);

  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.form.get('file')!.setValue(fileList[0]);
    }
  }

}
