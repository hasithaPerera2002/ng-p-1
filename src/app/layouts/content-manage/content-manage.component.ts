import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {DbService} from "../../database/db.service";
import {Content} from "../../interfaces/content";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import * as util from "util";
import {UtilService} from "../../util/util.service";
import {Observable} from "rxjs";


@Component({
  selector: 'app-content-manage',
  templateUrl: './content-manage.component.html',
  styleUrls: ['./content-manage.component.css']
})
export class ContentManageComponent implements AfterViewInit {
  form: FormGroup;
  status = 'Add';
  destinations!: Observable<Content[]> | any;
  url!: HTMLImageElement


  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private cd: ChangeDetectorRef, private db: DbService, private util: UtilService) {
    this.form = this.fb.group({
      town: ['', [Validators.required]],
      desc: ['', [Validators.required]],
      file: [null, Validators.required],
      caption: ['', Validators.required],
      place: ['', Validators.required]
    });

    console.log(this.destinations + 'destinations');
  }

  async onSubmit() {
    try {

      console.log(this.form.value);
      const newDataURL = await this.util.convertImageToDataURL(this.url, 'image/jpeg', 0.8);
      const newContent: Content = {
        destination_name: this.form.value.town,
        description: this.form.value.desc,
        caption: this.form.value.caption,
        file: newDataURL,
        town: this.form.value.town
      }
      this.db.addData(newContent).then()
    } catch (e) {
      console.error(e);
    }

  }

  get formControl() {
    return this.form.controls;
  }

  onFileSelect(e: any) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        this.url = event.target.result;

      }
    }
  }


  /* addImage() {
       if (this.form.valid) {
           const imageData = this.form.value;

           let fileInput = document.getElementById('fileInput') as HTMLInputElement;
           if (fileInput && fileInput.files && fileInput.files.length > 0) {
               const file = fileInput.files[0];

               let place = imageData.place;
               let caption = imageData.caption;

               const reader = new FileReader();
               reader.onload = (event: any) => {
                   const url = event.target.result;


                   this.imgArray.push({
                       url: url,
                       caption: caption,
                       place: place
                   });


                   this.imageForm.reset();
                   fileInput.value = '';
               };


               reader.readAsDataURL(file);
           }
       }
   }*/


  async onLoadData(des: any) {
    try {
      console.log(des)
      const imageElement = await this.util.convertDataURLToImage(des.photo);
      this.status = 'Edit';
      this.formControl['town']?.setValue(des.destination_name);
      this.formControl['desc']?.setValue(des.description);
      this.url = imageElement;
      this.formControl['caption']?.setValue(des.caption);
      this.formControl['place']?.setValue(des.place);

      this.cdr.detectChanges();
    } catch (e) {
      console.error(e);
    }


  }

  onUpdate() {

  }

  async loadAllData() {
    this.db.getAllDestinations().subscribe(data => {
      this.destinations = data
      console.log(data)
    })
  }

  ngAfterViewInit(): void {
    this.loadAllData().then(r => {
      console.log('data loaded================')
    })
    console.log(this.destinations + 'destinations');
  }
}
