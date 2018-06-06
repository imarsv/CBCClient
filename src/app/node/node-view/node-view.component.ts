import { Component, OnInit } from '@angular/core';
import { Node, NodeService } from '../../service/node.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-node-view',
  templateUrl: './node-view.component.html',
  styleUrls: ['./node-view.component.css']
})
export class NodeViewComponent implements OnInit {

  private _nodes: Node[];

  constructor(private nodeService: NodeService, private router: Router, private route: ActivatedRoute) {
    this.load();
  }

  private load() {
    this.nodeService.list()
      .subscribe(data => this._nodes = data, error => this.router.navigateByUrl('\login'));
  }

  ngOnInit() {
  }

  get nodes(): Node[] {
    return this._nodes;
  }
}
