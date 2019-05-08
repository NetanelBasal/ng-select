import { ChangeDetectionStrategy, Component, ElementRef, EmbeddedViewRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import Popper from 'popper.js';
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements OnInit {
  popperRef: Popper;
  @Input() model;
  @Input() labelKey = 'label';
  @Input() idKey = 'id';
  @Input() options = [];
  @Input() optionTpl: TemplateRef<any>;
  @Output() selectChange = new EventEmitter();
  visibleOptions = 4;
  searchControl = new FormControl();

  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  private view: EmbeddedViewRef<any>;
  private original = [];

  constructor(private vcr: ViewContainerRef) {
  }

  ngOnInit() {
    this.original = [...this.options];
    this.model = this.options.find(currentOption => currentOption[this.idKey] === this.model);

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
    ).subscribe(term => this.search(term));
  }

  get label() {
    return this.model ? this.model[this.labelKey] : 'Select...';
  }

  toggle(dropdown: TemplateRef<any>, origin: HTMLElement) {
    if ( !this.popperRef ) {
      this.view = this.vcr.createEmbeddedView(dropdown);
      const viewHTML = this.view.rootNodes[0];
      document.body.appendChild(viewHTML);
      viewHTML.style.width = `${origin.offsetWidth}px`;

      this.popperRef = new Popper(origin, viewHTML, {
        removeOnDestroy: true
      });

    } else {
      this.close();

    }
  }

  close() {
    this.popperRef.destroy();
    this.view.destroy();
    this.searchControl.patchValue('');
    this.view = null;
    this.popperRef = null;
  }

  select(option) {
    this.model = option;
    this.selectChange.emit(option[this.idKey]);
    this.close();
  }

  isActive(option) {
    if ( !this.model ) {
      return false;
    }
    return option[this.idKey] === this.model[this.idKey];
  }

  search(value: string) {
    this.options = this.original.filter(option => option[this.labelKey].includes(value));
    requestAnimationFrame(() => this.visibleOptions = getVisibleOptions(this.options));
  }
}

export function getVisibleOptions(options: any[]) {
  const size = options.length;
  if ( size === 1 ) {
    return 2;
  }

  return size;
}
