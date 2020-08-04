import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NodeGroup, NodeGroupService } from "../../service/node-group.service";
import { NodeGroupCreateComponent } from "../node-group-create/node-group-create.component";

@Component({
  selector: 'app-node-group-dashboard',
  templateUrl: './node-group-dashboard.component.html',
  styleUrls: ['./node-group-dashboard.component.css']
})
export class NodeGroupDashboardComponent implements OnInit {

  group: NodeGroup | undefined = undefined;

  private id: string;

  constructor(private nodeGroupService: NodeGroupService,
              private modalService: NgbModal,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.nodeGroupService.get(this.id).subscribe(
      group => this.group = group,
      error => alert(error?.error?.message ? error.error.message : 'Something wrong with node group loading on dashboard')
    )
  }

  async editGroup() {
    const createNodeGroupModal = this.modalService.open(NodeGroupCreateComponent);
    createNodeGroupModal.componentInstance.group = this.group;
    createNodeGroupModal.componentInstance.update = true;

    try {
      const group = await createNodeGroupModal.result;
      if (group) {
        this.nodeGroupService.update(this.id, group).subscribe(
          () => this.load(),
          error => alert(error?.error?.message ? error.error.message : 'Something wrong with node group loading on update'));
      }
    } catch (e) {
    }
  }
}
