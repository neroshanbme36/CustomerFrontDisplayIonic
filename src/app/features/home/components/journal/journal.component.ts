import { Component, Input } from '@angular/core';
import { ParentProductLine } from '../../../../core/models/order/order';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent {
  @Input() parentProductLines?: ParentProductLine[] = [];

  constructor() { }

  itemsTrackBy(index: number, item: ParentProductLine): number {
    return item.lineNo;
  }
}
