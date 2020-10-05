import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  var;
  constructor( db:AngularFireDatabase ) {
    this.itemsRef = db.list('CASA');
  }

  actualizarLuz(luz: any ){
    return this.itemsRef.update('LED_STATUS', {luz});
  }

  detectarMagnetico(){
    this.itemsRef.snapshotChanges(['child_changed']).subscribe(action => {
      //console.log(action.payload.val());
      action.forEach(action=>{
        if(action.payload.key == 'STATUS_MAG'){
          const rel = this;
          let array= action.payload.val();
          Object.values(array).forEach(data => {
            if(data == 'TRUE'){
                   console.log("ALERTA!!!");
                   Swal.fire({
                    icon: 'warning',
                    title: '¡ALERTA!',
                    text: 'POSIBLE INTRUSIÓN EN TU HOGAR',
                    footer: '¿Tienes alguna pregunta?'
                  })
                  rel.reproducir();
                 }else{
                   console.log("No alerta");
                 }
          })
        }

      })
    })
  }

  reproducir() {
    const audio = new Audio('assets/alerta.mp3');
    audio.play();
}
}
