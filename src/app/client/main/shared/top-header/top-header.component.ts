import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

@Component({
  selector: 'top-header',
  templateUrl: './top-header.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './top-header.component.scss'
  ]
})
export class TopHeaderComponent implements OnInit {
  userData: any;
  constructor(private accountService: AccountService,
    private ngZone: NgZone,
    public router: Router,) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.accountService
      .getCurrentUser()
      .subscribe((data: any) => {
        this.userData = data;
      });
  }

  logOut(): void {
    this.accountService.signOut();
    window.location.reload();
  }
}
