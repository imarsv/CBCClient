import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage, StorageService, StorageType } from '../../service/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-storage-edit',
  templateUrl: './storage-edit.component.html',
  styleUrls: ['./storage-edit.component.css']
})
export class StorageEditComponent implements OnInit {

  form: FormGroup;

  storageType = StorageType;
  readonly edit: boolean;
  private readonly id: string;

  constructor(private storageService: StorageService,
              private formBuilder: FormBuilder,
              private router: Router, private activatedRoute: ActivatedRoute) {
    this.edit = activatedRoute.snapshot.params['mode'] === 'edit';
    if (this.edit) {
      this.id = activatedRoute.snapshot.params['id'];
    }
  }

  ngOnInit(): void {
    if (this.edit) {
      this.storageService.get(this.id).subscribe((item) => {
        this.form.patchValue(item);
      });
    }

    const storageType = this.formBuilder.control(null, Validators.required);
    storageType.valueChanges.subscribe((type => this.updateForm(type)));

    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(255)]],
      type: storageType,
    });
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.edit) {
        this.storageService.update(this.id, this.form.value as Storage)
          .subscribe(() => this.router.navigateByUrl('/storages'));
      } else {
        this.storageService.add(this.form.value as Storage)
          .subscribe(() => this.router.navigateByUrl('/storages'));
      }
    }
  }

  getUserFriendlyStorageTypeName(type: StorageType) {
    switch (type) {
      case StorageType.AmazonS3:
        return 'Amazon S3';
      case StorageType.AmazonS3Compatible:
        return 'Amazon S3 Compatible';
      default:
        return '?';
    }
  }

  private updateForm(type: StorageType) {
    const baseFields = ['name', 'type'];
    const keys = [];
    for (const key in this.form.controls) {
      if (!baseFields.includes(key)) {
        keys.push(key);
      }
    }

    const storage = {};
    for (const [key, value] of Object.entries(this.form.value)) {
      if (!baseFields.includes(key)) {
        if (value !== null) {
          Object.assign(storage, { [key]: value });
        }
      }
    }

    keys.forEach(key => this.form.removeControl(key));

    this.appendStorageFields(type);

    this.form.patchValue(storage);
  }

  private appendStorageFields(type: StorageType) {
    if ((type === StorageType.AmazonS3) || (type === StorageType.AmazonS3Compatible)) {
      this.form.addControl('accessKeyId',
        this.formBuilder.control(null, [Validators.required, Validators.maxLength(255)]));
      this.form.addControl('secretAccessKey',
        this.formBuilder.control(null, [Validators.required, Validators.maxLength(255)]));
      this.form.addControl('bucket',
        this.formBuilder.control(null, [Validators.required, Validators.maxLength(255)]));
      this.form.addControl('path',
        this.formBuilder.control(null, [Validators.maxLength(255)]));
    }

    if (type === StorageType.AmazonS3Compatible) {
      this.form.addControl('endpoint',
        this.formBuilder.control(null, [Validators.required, Validators.maxLength(255)]));
    }
  }

  remove() {
    this.storageService.remove(this.id).subscribe(
      () => {
        this.router.navigateByUrl('/storages');
      },
      error => alert(error?.error?.message ? error.error.message : 'Something wrong'));
  }
}
