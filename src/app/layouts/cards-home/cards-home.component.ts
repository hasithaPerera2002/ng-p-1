import {AfterViewInit, Component} from '@angular/core';


@Component({
  selector: 'app-cards-home',
  templateUrl: './cards-home.component.html',
  styleUrls: ['./cards-home.component.css']
})
export class CardsHomeComponent implements AfterViewInit{
  heading!: string;
  description!: string;
  image: string="/assets/img/stefano-alemani-f9KQYJR7fXk-unsplash.jpg";

  ngAfterViewInit(): void {
    this.heading = "Galle";
    this.description = "Lorem ipsum dolor sit amet, consectetur" +
      " adipisicing elit. Adipisci corporis enim explicabo facilis " +
      "fuga fugiat incidunt molestias nam pariatur perferendis tempora, " +
      "ut veritatis, voluptatibus! Aliquid, asperiores culpa distinctio magnam officiis" +
      " praesentium reprehenderit. Atque autem deleniti dicta dolorum maxime" +
      " minus nisi non possimus reprehenderit. Dignissimos hic non ullam! Debitis, ullam, veniam.";
  }

}
