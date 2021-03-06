import { Component, OnInit } from '@angular/core';
import { Node, NodeService } from '../../service/node.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-node-list',
  templateUrl: './node-list.component.html',
  styleUrls: ['./node-list.component.css']
})
export class NodeListComponent implements OnInit {

  nodes: Observable<Node[]>;

  constructor(private nodeService: NodeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  getUserFriendlyLocation(node: Node) {
    return node.connection.hostname;
  }

  private load() {
    this.nodes = this.nodeService.list()
      .pipe(map(arr => arr.sort((a, b) => a.name.localeCompare(b.name))));
  }
}
