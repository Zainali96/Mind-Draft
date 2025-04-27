import { Component } from '@angular/core';
import { DataHelperService } from '../services/data-helper.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  constructor(public dataHelper:DataHelperService) {}

}
