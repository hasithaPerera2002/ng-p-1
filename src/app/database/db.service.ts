import {Injectable} from '@angular/core';
import "firebase/firestore";

import {firebaseApp$} from "@angular/fire/app";
import {Content} from "../interfaces/content";
import {Environment} from "@angular/cli/lib/config/workspace-schema";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {UtilService} from "../util/util.service";
import {map, Observable} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class DbService {
    constructor(private firestore: AngularFirestore, private util: UtilService) {
    }
    public async addData(data: Content) {
        try {
            console.log(data, 'data');
            const docName = data.destination_name;
            const docRef = this.firestore.collection('destinations').doc();


            const base64Image = await this.util.getResizedImage(data.file, 200, 200); // Adjust dimensions as needed




           const newData = {
                desc: data.description,
                town: data.town,
                photo: base64Image,
                caption:data.caption,
                place:data.destination_name

            };

            await docRef.set(newData);

        } catch (error) {
            console.error('Error adding data: ', error);
        }
    }


    getAllDestinations(): Observable<Content[]> {
        return this.firestore.collection('destinations').snapshotChanges()
            .pipe(
                map((snapshot) => {
                    return snapshot.map((doc) => {
                        const data = doc.payload.doc.data() as Content;
                        const id = doc.payload.doc.id;

                        return { id, ...data };
                    });
                })
            );
    }
}
