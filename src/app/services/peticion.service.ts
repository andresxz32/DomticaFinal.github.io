import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
          let array= action.payload.val();
          Object.values(array).forEach(data => {
            if(data == 'TRUE'){
                   console.log("ALERTA!!!");
                   //ALERTAAAA!!!
                 }else{
                   console.log("No alerta");
                 }
          })
        }

      })
      // if(action.payload.key == 'STATUS_MAG'){
      //  let array = action.payload.val();
      //  //console.log(Object.values(array));
      //  Object.values(array).forEach(data=>{
      //    if(data == 'TRUE'){
      //      console.log("ALERTA!!!");
      //      //ALERTAAAA!!!
      //    }else{
      //      console.log("No alerta");
      //    }
      //  })
      // }
    })
  }
}
