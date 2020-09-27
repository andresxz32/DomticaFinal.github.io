import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { PeticionService } from '../../services/peticion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  luz: string;

  constructor(private auth: AuthService,
              private route: Router,
              private pt: PeticionService) { }

  ngOnInit() {
    this.pt.detectarMagnetico();
  }

  salir() {
    this.auth.logout();
    this.route.navigateByUrl('/login');
  }

  encendidoLuz(){
    this.luz='ON';
    this.pt.actualizarLuz(this.luz);
    console.log(this.luz);
  }

  apagadoLuz(){
    this.luz='OFF';
    this.pt.actualizarLuz(this.luz);
    console.log(this.luz);


  }

}
