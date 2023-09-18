import { Component, OnInit } from '@angular/core';
import {
  faDashboard,
  faLocation,
  faShop,
  faBox,
  faCapsules,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { MasterService } from '../service/master.service';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  faDashboard = faDashboard;
  faLocation = faLocation;
  faShop = faShop;
  faBox = faBox;
  faCapsules = faCapsules;
  faUser = faUser;

  constructor(private service: MasterService, private router: Router) {}

  ngOnInit(): void {}
}
