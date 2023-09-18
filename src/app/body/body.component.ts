import { Component } from '@angular/core';
import { MasterService } from '../service/master.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent {
  id: number;

  constructor(private service: MasterService) {
    this.id = this.service.getId();
  }
}
