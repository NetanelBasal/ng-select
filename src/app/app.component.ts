import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items = Array.from({ length: 10000 }).map((_, i) => ({
    id: i,
    label: `Item #${i}`
  }));

  change($event: any) {
  }
}
