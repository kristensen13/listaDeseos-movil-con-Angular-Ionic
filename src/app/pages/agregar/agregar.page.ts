import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  lista: Lista;
  nombreItem = '';
  constructor(private deseosSvc: DeseosService, private route: ActivatedRoute) {
    const listaId = this.route.snapshot.paramMap.get('listaId');
    console.log(listaId);
    this.lista = this.deseosSvc.obtenerLista(listaId);
    console.log(this.lista);
  }

  ngOnInit() {}

  agregarItem() {
    if (this.nombreItem.length === 0) {
      return;
    }
    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);
    this.nombreItem = '';
    this.deseosSvc.guardarStorage();
  }
  cambioCheck(item: ListaItem) {
    //console.log(item);
    const pendientes = this.lista.items.filter(
      (itemData) => !itemData.completado
    ).length;
    //console.log({ pendientes });
    if (pendientes === 0) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }

    this.deseosSvc.guardarStorage();
    console.log(this.deseosSvc.listas);
  }
  borrar(i: number) {
    this.lista.items.splice(i, 1);
    this.deseosSvc.guardarStorage();
  }
}
