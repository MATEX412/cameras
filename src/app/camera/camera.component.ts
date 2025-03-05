import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraService } from './services/camera.service'; // Importa el servicio correctamente

@Component({
  selector: 'app-camera',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent {
  cameraService = inject(CameraService);  // Inyección del servicio usando 'inject()'
  imgUrl: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  async takePicture() {
    this.errorMessage = '';  // Limpiar mensajes de error anteriores

    try {
      this.loading = true;
      this.imgUrl = await this.cameraService.takePicture();  // Llamada al servicio para tomar la foto
      this.loading = false;
    } catch (error) {
      console.error('Error al capturar imagen:', error);
      this.errorMessage = String(error);
      this.imgUrl = '';
      this.loading = false;
    }
  }
}
