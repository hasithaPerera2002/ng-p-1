import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private pica = require('pica')();
  constructor() { }


  public async getResizedImage(url: string, maxWidth: number, maxHeight: number): Promise<string> {
    try {
      const img = new Image();
      img.src = url;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = maxWidth;
      canvas.height = maxHeight;

      const resizedImage = await this.pica.resize(img, canvas);

      return resizedImage.toDataURL('image/jpeg');
    } catch (error) {
      throw new Error('Error processing image: ' + error);
    }
  }
  public async convertDataURLToImage(dataURL: string): Promise<HTMLImageElement> {
   try {
     console.log(dataURL, 'dataURL')

      return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          resolve(img);
        };
        img.onerror = (error) => {
          reject(error);
        };
        img.src = dataURL;
      });
    }catch (error) {
      throw new Error('Error processing image: ' + error);
    }
  }
  public async convertImageToDataURL(image: HTMLImageElement, format: string = 'image/jpeg', quality: number = 0.8): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.width = image.width;
      canvas.height = image.height;

      context?.drawImage(image, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          const reader = new FileReader();
          reader.onload = () => {
            const dataURL = reader.result as string;
            resolve(dataURL);
          };
          reader.onerror = (error) => {
            reject(error);
          };
          reader.readAsDataURL(blob);
        } else {
          reject(new Error('Error creating blob from canvas'));
        }
      }, format, quality);
    });
  }

}
