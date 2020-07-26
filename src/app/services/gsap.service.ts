import { Injectable } from '@angular/core';
import { gsap, Power2, Elastic } from 'gsap/all';

@Injectable({
  providedIn: 'root'
})
export class GsapService {

  constructor() { }

  public fFadeFrom(e, tym, alfa, dlay, xVal, yVal) {
    gsap.from(e, { duration: tym, opacity: alfa, ease: Power2, delay: dlay, x: xVal, y: yVal });
  }
}
