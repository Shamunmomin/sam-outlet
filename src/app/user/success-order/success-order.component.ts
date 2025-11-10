import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-order',
  templateUrl: './success-order.component.html',
  styleUrls: ['./success-order.component.css']
})
export class SuccessOrderComponent implements OnInit{

    constructor(private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

}
