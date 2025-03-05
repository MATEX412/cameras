import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, PermissionStatus } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor() { }

  private async checkPermissions(): Promise<void> {
    const permission = await Camera.requestPermissions();  // Solicitar permisos directamente
    if (permission.camera !== 'granted') {
      throw new Error('Permiso de cámara denegado');
    }
  }

  async takePicture(): Promise<string> {  // Método para capturar la foto
    await this.checkPermissions();

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera  // Usamos 'Camera' para abrir la cámara directamente
    });

    return image.webPath ?? '';  // Retorna la URL de la imagen capturada
  }
}
