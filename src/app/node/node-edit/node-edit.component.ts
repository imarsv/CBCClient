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
  editing = false;
  node: Node = new Node(null, null, new NodeConnection());

  constructor(private nodeService: NodeService, private router: Router, activatedRoute: ActivatedRoute) {
    this.editing = activatedRoute.snapshot.params['mode'] === 'view';
    if (this.editing) {
      const id = activatedRoute.snapshot.params['id'];
      this.nodeService.get(id)
        .subscribe(item => Object.assign(this.node, item));
    }
  }

  ngOnInit() {
  }

  save(form: NgForm) {
    console.log(form);
    console.log(this.node);
  }
}
