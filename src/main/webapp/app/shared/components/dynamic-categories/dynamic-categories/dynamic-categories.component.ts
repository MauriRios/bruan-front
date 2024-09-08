/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicVerticalCardComponent } from '../../dynamic-vertical-card/dynamic-vertical-card/dynamic-vertical-card.component';
import { LineTitleDirective } from 'app/shared/directives/line-title.directive';
import { ProductCardComponent } from '../../card/card.component';

@Component({
  selector: 'dynamic-categories',
  standalone: true,
  imports: [DynamicVerticalCardComponent, LineTitleDirective, ProductCardComponent],
  templateUrl: './dynamic-categories.component.html',
  styleUrl: './dynamic-categories.component.css'
})
export class DynamicCategoriesComponent implements OnInit {
  categoria: string = '';
  titulo: string = '';
  descripcion: string = '';
  imagen: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtener el parámetro de la categoría desde la ruta
    this.route.params.subscribe(params => {
      this.categoria = params['categoria']; // Ejemplo: la categoría en la URL
      this.filtrarProductosPorCategoria(this.categoria);
    });
  }

  filtrarProductosPorCategoria(categoria: string) {
    // Lógica de filtrado según la categoría
    if (categoria === 'cumpleaños') {
      this.titulo = '¡Feliz Cumpleaños!';
      this.descripcion = 'Celebra un año más con alegría.';
      this.imagen = 'https://img.freepik.com/fotos-premium/abstracto-gotas-llama-brillante-iluminacion-electrica-ia-generativa_1038396-44.jpg'; // Cambia según la imagen de tu base de datos
    } else if (categoria === 'desayunos') {
      this.titulo = 'Desayunos Deliciosos';
      this.descripcion = 'Comienza tu mañana con algo delicioso.';
      this.imagen = 'https://img.freepik.com/fotos-premium/abstracto-gotas-llama-brillante-iluminacion-electrica-ia-generativa_1038396-44.jpg'; // Cambia según la imagen
    } else if (categoria === 'fechas-especiales') {
      this.titulo = 'Fechas Especiales';
      this.descripcion = 'Celebra los momentos más importantes.';
      this.imagen = 'https://img.freepik.com/fotos-premium/abstracto-gotas-llama-brillante-iluminacion-electrica-ia-generativa_1038396-44.jpg'; // Imagen asociada
    } else if (categoria === 'otros') {
      this.titulo = 'Otros';
      this.descripcion = 'No se encontraron productos para esta categoría.';
      this.imagen = 'https://img.freepik.com/fotos-premium/abstracto-gotas-llama-brillante-iluminacion-electrica-ia-generativa_1038396-44.jpg'; // Imagen por defecto
    } else if (categoria === 'packaging') {
      this.titulo = 'Packaging';
      this.descripcion = 'No se encontraron productos para esta categoría.';
      this.imagen = 'https://img.freepik.com/fotos-premium/abstracto-gotas-llama-brillante-iluminacion-electrica-ia-generativa_1038396-44.jpg'; // Imagen por defecto
    } 
  }

}
