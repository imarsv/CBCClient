import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NodeService, ProtocolType } from '../../service/node.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-node-edit',
  templateUrl: './node-edit.component.html',
  styleUrls: ['./node-edit.component.css']
})
export class NodeEditComponent implements OnInit {
  form: FormGroup;
  viewing = false;
  protocolType = ProtocolType;
  private readonly id: string;

  constructor(private nodeService: NodeService,
              private fb: FormBuilder,
              private router: Router, private activatedRoute: ActivatedRoute) {
    this.viewing = activatedRoute.snapshot.params['mode'] === 'view';
    if (this.viewing) {
      this.id = activatedRoute.snapshot.params['id'];
    }
  }

  ngOnInit() {
    const connection = this.fb.group({
      protocol: [ProtocolType.HTTP, [Validators.required, Validators.maxLength(16)]],
      hostname: ['', [Validators.required, Validators.maxLength(255)]],
      port: [4242, [Validators.required, Validators.min(0)]],
    });

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      connection: connection,
      opened: [false, [Validators.required]],
      enabled: [false, [Validators.required]],
    });

    if (this.viewing) {
      this.nodeService.get(this.id)
        .subscribe(item => this.form.patchValue(item));
    }
  }

  delete() {
    if (this.id) {
      this.nodeService.delete(this.id);
      this.router.navigateByUrl('/nodes');
    }
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.viewing) {
        this.nodeService.update(this.id, this.form.value)
          .subscribe(() => this.router.navigateByUrl('/nodes'));
      } else {
        this.nodeService.add(this.form.value)
          .subscribe(() => this.router.navigateByUrl('/nodes'));
      }
    }
  }
}
