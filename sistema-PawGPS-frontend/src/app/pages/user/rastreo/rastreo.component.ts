import { Component, OnInit } from '@angular/core';
import { UbicacionService } from '../../../services/ubicacion.service';
import { AuthService } from '../../../services/auth.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-rastreo',
  templateUrl: './rastreo.component.html',
  styleUrls: ['./rastreo.component.css']
})
export class RastreoComponent implements OnInit {
  

  constructor() {}

  ngOnInit(): void {
  }
}
