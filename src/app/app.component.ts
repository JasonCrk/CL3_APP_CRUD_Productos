import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PrimeNGConfig } from 'primeng/api'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class AppComponent implements OnInit {

  private readonly _primeNgConfig = inject(PrimeNGConfig)

  ngOnInit(): void {
    this._primeNgConfig.ripple = false
  }
}
