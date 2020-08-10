import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ComputingResourceNodeModel } from '../../service/node-group.service';

@Component({
  selector: 'app-node-list-view',
  templateUrl: './node-list-view.component.html',
  styleUrls: ['./node-list-view.component.css']
})
export class NodeListViewComponent implements OnInit {

  @Input() persistentNodes: ComputingResourceNodeModel[];
  @Input() groupNodes: ComputingResourceNodeModel[];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  selected(id: string) {
    return this.groupNodes.findIndex(item => item.id === id) !== -1;
  }

  updateSelectedNode(enabled: boolean, node: ComputingResourceNodeModel) {
    const index = this.groupNodes.findIndex(item => item.id === node.id);

    if (enabled) {
      if (index === -1) {
        this.groupNodes.push(node);
      }
    } else {
      if (index !== -1) {
        this.groupNodes.splice(index, 1);
      }
    }
  }

  update() {
    this.activeModal.close(this.groupNodes);
  }
}
