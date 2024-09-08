/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicVerticalCardComponent } from '../../dynamic-vertical-card/dynamic-vertical-card/dynamic-vertical-card.component';
import { LineTitleDirective } from 'app/shared/directives/line-title.directive';
import { ProductCardComponent } from '../../card/card.component';
import { ICategory } from 'app/entities/category/category.model';
import { CategoryService } from 'app/entities/category/service/category.service';

@Component({
  selector: 'dynamic-categories',
  standalone: true,
  imports: [DynamicVerticalCardComponent, LineTitleDirective, ProductCardComponent],
  templateUrl: './dynamic-categories.component.html',
  styleUrl: './dynamic-categories.component.css'
})
export class DynamicCategoriesComponent implements OnInit {
  category: any = '';
  title: string = '';
  description: string = '';
  image: string = '';

  constructor(
    private route: ActivatedRoute,
    
  ) {}

  ngOnInit(): void {
    // Obtener el parámetro de la categoría desde la ruta
    this.route.params.subscribe(params => {
      this.category = params['categoria']; // Ejemplo: la categoría en la URL
      this.filtrarProductosPorCategoria(this.category);
    });
  }


  filtrarProductosPorCategoria(category: string) {
    // Lógica de filtrado según la categoría
    if (category === 'cumpleaños') {
      this.title = '¡Feliz Cumpleaños!';
      this.description = 'Celebra un año más con alegría.';
      this.image = 'https://img.freepik.com/fotos-premium/abstracto-gotas-llama-brillante-iluminacion-electrica-ia-generativa_1038396-44.jpg'; // Cambia según la imagen de tu base de datos
    } else if (category === 'desayunos') {
      this.title = 'Desayunos Deliciosos';
      this.description = 'Comienza tu mañana con algo delicioso.';
      this.image = 'https://img.freepik.com/fotos-premium/abstracto-gotas-llama-brillante-iluminacion-electrica-ia-generativa_1038396-44.jpg'; // Cambia según la imagen
    } else if (category === 'fechas-especiales') {
      this.title = 'Fechas Especiales';
      this.description = 'Celebra los momentos más importantes.';
      this.image = 'https://img.freepik.com/fotos-premium/abstracto-gotas-llama-brillante-iluminacion-electrica-ia-generativa_1038396-44.jpg'; // Imagen asociada
    } else if (category === 'otros') {
      this.title = 'Otros';
      this.description = 'No se encontraron productos para esta categoría.';
      this.image = 'https://img.freepik.com/fotos-premium/abstracto-gotas-llama-brillante-iluminacion-electrica-ia-generativa_1038396-44.jpg'; // Imagen por defecto
    } else if (category === 'packaging') {
      this.title = 'Packaging';
      this.description = 'No se encontraron productos para esta categoría.';
      this.image = 'https://img.freepik.com/fotos-premium/abstracto-gotas-llama-brillante-iluminacion-electrica-ia-generativa_1038396-44.jpg'; // Imagen por defecto
    } else {
      this.title = 'Todas las categorías';
      this.description = 'No se encontraron productos para esta categoría.';
      this.image = 'https://img.freepik.com/fotos-premium/abstracto-gotas-llama-brillante-iluminacion-electrica-ia-generativa_1038396-44.jpg'; // Imagen por defecto
    }
    console.log(this.category);
    
  }



}
