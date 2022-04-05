import { Component, OnInit, ViewChild  } from '@angular/core';
import { filter, take } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { DeviceState } from './app.states';
import { StartEventStream } from './actions/event.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  @ViewChild('drawer') drawer!: MatSidenav;

  constructor(router: Router, private store: Store<DeviceState>) {    
    router.events.pipe(filter((event) => event instanceof NavigationEnd)
    ).subscribe(_ => this.drawer.close());
  }

  reloadPage() {
    window.location.reload()
  }

  ngOnInit(): void {
    this.store.dispatch(StartEventStream());
  }
}
