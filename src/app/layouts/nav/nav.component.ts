import {AfterViewInit, Component} from '@angular/core';
import {timeline} from "motion";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements AfterViewInit{
  ngAfterViewInit(): void {

    gsap.registerPlugin(ScrollTrigger);

    let scrollPosition = 0;
    const navbar = document.querySelector('.navbar') as HTMLElement;

    ScrollTrigger.create({
      onUpdate: (self: ScrollTrigger) => {
        let newPosition:number = parseFloat(self.progress.toFixed(2));
        if (newPosition > scrollPosition) {
          gsap.to(navbar, { y: '-100%', duration: 0.3, ease: 'power2.out' });
        } else {
          gsap.to(navbar, { y: '0%', duration: 0.3, ease: 'power2.out' });
        }
        scrollPosition = (newPosition);
      },
    });
  }
}
