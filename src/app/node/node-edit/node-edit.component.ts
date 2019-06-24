import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Node, NodeConnection, NodeService } from '../../service/node.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-node-edit',
  templateUrl: './node-edit.component.html',
  styleUrls: ['./node-edit.component.css']
})
export class NodeEditComponent implements OnInit {
  viewing = false;
  node: Node = new Node(null, null, new NodeConnection(), true);

  constructor(private nodeService: NodeService, private router: Router, activatedRoute: ActivatedRoute) {
    this.viewing = activatedRoute.snapshot.params['mode'] === 'view';
    if (this.viewing) {
      const id = activatedRoute.snapshot.params['id'];
      this.nodeService.get(id)
        .subscribe(item => Object.assign(this.node, item));
    }
  }

  ngOnInit() {
  }

  save(form: NgForm) {
    if (form.valid) {
      if (this.viewing) {
        this.nodeService.update(this.node.id, this.node)
          .subscribe(() => this.router.navigateByUrl('/nodes'));
      } else {
        this.nodeService.add(this.node)
          .subscribe(() => this.router.navigateByUrl('/nodes'));
      }
    }
  }

  delete() {
    if (this.node.id) {
      this.nodeService.delete(this.node.id);
      this.router.navigateByUrl('/nodes');
    }
  }
}
