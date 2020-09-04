import { Component, OnInit } from '@angular/core';
import { NodeGroup, NodeGroupService } from '../../service/node-group.service';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NodeGroupCreateComponent } from '../node-group-create/node-group-create.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-node-groups-list',
  templateUrl: './node-groups-list.component.html',
  styleUrls: ['./node-groups-list.component.css']
})
export class NodeGroupsListComponent implements OnInit {

  groups: Observable<NodeGroup[]>;

  constructor(private nodeGroupService: NodeGroupService,
              private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.load();
  }

  async createNewGroup() {
    const createNodeGroupModal = this.modalService.open(NodeGroupCreateComponent);

    try {
      const group = await createNodeGroupModal.result;
      if (group) {
        group.scalable = false;
        this.nodeGroupService.add(group).subscribe(
          () => this.load(),
          error => alert(error?.error?.message ? error.error.message : 'Something wrong with node group loading'));
      }
    } catch (e) {
    }
  }

  private load() {
    this.groups = this.nodeGroupService.list()
      .pipe(map(arr => arr.sort((a, b) => {
        let cmp = a.name.localeCompare(b.name);
        if (cmp === 0) {
          cmp = a.assignment.localeCompare(b.assignment);
        }
        return cmp;
      })));
  }
}
