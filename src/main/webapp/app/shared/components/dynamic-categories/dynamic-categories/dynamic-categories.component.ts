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


  //TODO refactorizar para que se envie id de categoria y no el string, crear nueva variable para obtener 
  //la categoria de la url y de ahi pasar buscar en las categorias cargadas el id de ese string y psarlo como category

  ngOnInit(): void {
    // Obtener el parámetro de la categoría desde la ruta
    this.route.params.subscribe(params => {
      this.category = params['categoria']; // Ejemplo: la categoría en la URL
      this.filterProductByCategory(this.category);
    });
  }


  filterProductByCategory(category: string) {
    // Lógica de filtrado según la categoría
    if (category === 'cumpleaños') {
      this.title = '¡Feliz Cumpleaños!';
      this.description = 'Celebra un año más con alegría y personalízalo como quieras!';
      this.image = 'https://img.freepik.com/fotos-premium/abstracto-gotas-llama-brillante-iluminacion-electrica-ia-generativa_1038396-44.jpg'; 
    } 
    // else if (category === 'desayunos') {
    //   this.title = 'Desayunos Deliciosos';
    //   this.description = 'Comienza tu mañana con algo delicioso.';
    //   this.image = 'assets/images/desayunos.jpg'; 
    //} 
    else if (category === 'fechas-especiales') {
      this.title = 'Fechas Especiales';
      this.description = '¿Fechas Especiales? CreacionesBruan tiene todo para esos días! Celebra los momentos más importantes de la mejor manera';
      this.image = 'https://img.freepik.com/fotos-premium/abstracto-gotas-llama-brillante-iluminacion-electrica-ia-generativa_1038396-44.jpg'; 
    } else if (category === 'otros') {
      this.title = 'Otros';
      this.description = 'Otros productos que seguro te van a gustar!. Lo que no encuentras en otras categorías podría esta aquí, animate a explorar todo nuestro contenido!';
      this.image = 'https://img.freepik.com/fotos-premium/abstracto-gotas-llama-brillante-iluminacion-electrica-ia-generativa_1038396-44.jpg';
    } else if (category === 'packaging') {
      this.title = 'Packaging';
      this.description = 'No te quedes sin personalizar tus regalos, encuentra lo que buscas a tu medida';
      this.image = 'https://img.freepik.com/fotos-premium/abstracto-gotas-llama-brillante-iluminacion-electrica-ia-generativa_1038396-44.jpg'; 
    } else {
      this.title = 'Todas las categorías';
      this.description = 'Todas las categorías en un solo lugar, no te pierdas nada! Aca podes ver todo lo que ofrecemos para tus días especiales, negocio o decoración de tu hogar';
      this.image = 'https://img.freepik.com/fotos-premium/abstracto-gotas-llama-brillante-iluminacion-electrica-ia-generativa_1038396-44.jpg';
    }
    
  }



}
