import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import gsap from 'gsap';
import { stagger, timeline, AnimationControls, inView} from "motion";









@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit,AfterViewInit {



  constructor(el: ElementRef) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
     const sq:any = [
       ['.text-reveal',{clipPath:'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'
          ,y:[0,250],},
        {duration:3,easing:"ease-in-out",delay:stagger(.2)}] ,

       ['.text-reveal',{
          y:[180],  clipPath:' polygon(0 0, 100% 0, 100% 100%, 0% 100%)'},
        {duration:2,easing:"ease-in-out",at:"+1"}],

       ['svg',{
           y:[50], clipPath:' polygon(0 0, 100% 0, 100% 100%, 0% 100%)'},
        {duration:1.2,easing:"ease-out",at:"<"}],


     ];

    timeline(sq, {
      defaultOptions: { easing: "ease-in-out" },

    })



    gsap.registerPlugin(ScrollTrigger);

    let sections = gsap.utils.toArray(".panel");

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".container-bg",
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=1024"
      }
    });





  }

}
