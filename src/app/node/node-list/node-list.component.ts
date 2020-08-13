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
    const compareString = (a: string, b: string) => {
      if (a < b) {
        return 1;
      } else if (a > b) {
        return -1;
      }
      return 0;
    };

    this.nodes = this.nodeService.list()
      .pipe(map(arr => arr.sort((a, b) => compareString(a.name, b.name))));
  }
}
