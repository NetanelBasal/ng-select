import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items = Array.from({ length: 1000 }).map((_, i) => ({
    id: i,
    label: `Item #${i}`
  }));

  change($event: any) {
    console.log($event);
  }
}
