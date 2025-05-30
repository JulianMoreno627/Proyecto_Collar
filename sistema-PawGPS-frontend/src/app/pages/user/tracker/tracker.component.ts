import { Component } from '@angular/core';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent {
  // Usa tu URL de ngrok sin puerto
  public TRACKER_SERVER_URL = 'https://f432-2800-484-c487-7400-14d2-f24c-66a5-a728.ngrok-free.app';

  constructor() { }

  // Abre el monitor de rastreo (para PC)
  openTrackerMonitor(collarId: 'collar1' | 'collar2') {
    // Abre tracking.html con el parámetro del collar
    const trackerUrl = `${this.TRACKER_SERVER_URL}/tracking.html?device=${collarId}`;
    
    const trackerWindow = window.open(trackerUrl, '_blank');
    
    if (!trackerWindow) {
      alert('Por favor permite las ventanas emergentes para usar el rastreador');
    }
  }

  // Genera enlace para el dispositivo móvil (para compartir)
  generateCollarLink(collarId: 'collar1' | 'collar2'): string {
    return `${this.TRACKER_SERVER_URL}/${collarId}`;
  }

  // Copia el enlace al portapapeles
  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Enlace copiado al portapapeles');
    });
  }
}
