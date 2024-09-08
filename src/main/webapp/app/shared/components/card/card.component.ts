/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @angular-eslint/component-selector */

import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ProductService } from "app/entities/product/service/product.service";
import { IProduct } from 'app/entities/product/product.model';
import { AnimationTranslateTopHoverDirective } from "app/shared/directives/animation-translate-top-hover.directive";
import { FilterByPipe } from "app/shared/pipes/filterBy/filter-by.pipe";
import { NgxPaginationModule } from "ngx-pagination";
import { LineTitleDirective } from "app/shared/directives/line-title.directive";
import { ProductFilterComponent } from "../product-filter/product-filter/product-filter.component";
import { CategoryService } from "app/entities/category/service/category.service";
import { ICategory } from "app/entities/category/category.model";


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [ CommonModule, AnimationTranslateTopHoverDirective, NgxPaginationModule, FilterByPipe, FormsModule, LineTitleDirective, ProductFilterComponent ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class ProductCardComponent implements OnInit {

  products: IProduct[] = [];
  categories: ICategory[] = [];

  filteredProducts: IProduct[] = [];

  public page!: number;

  productName: string = '';
  selectedCategory: string = ''; // Categoría seleccionada, por defecto es 'all'

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    console.log(this.productName);
    console.log(this.selectedCategory);
    console.log(this.categories);
    
  }

  loadProducts(): void {
    this.productService.query().subscribe(
      (res) => {
        this.products = res.body ?? [];
        this.filteredProducts = this.products; // Inicialmente, mostrar todos los productos
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

  loadCategories(): void {
    this.categoryService.query().subscribe(
      (res) => {
        this.categories = res.body ?? [];
      },
      (error) => {
        console.error('Error al cargar categorias:', error);
      }
    );
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      // Filtrar por nombre del producto
      const matchesProductName = product.productName?.toLowerCase().includes(this.productName.toLowerCase());
  
      // Convertir selectedCategory a number antes de comparar
      const selectedCategoryId = Number(this.selectedCategory);
  
      // Filtrar por categoría: comprobar si 'selectedCategory' es 'all' o si alguna de las categorías del producto coincide
      const matchesCategory = this.selectedCategory === '' ||  // Mostrar todos si no hay categoría seleccionada
        product.categories?.some(category => category.id === selectedCategoryId);
  
      return matchesProductName && matchesCategory && product.isActive === true;
    });
  }

  // Escucha el cambio en el filtro de nombre desde el componente de filtrado
  onFilterNameChange(productName: string): void {
    this.productName = productName;
    this.filterProducts();
  }

  onFilterCategoryChange(selectedCategory: string): void {
    this.selectedCategory = selectedCategory;  // Asigna el valor recibido primero
    console.log('Categoría seleccionada card:', this.selectedCategory); // Luego muestra el valor
    this.filterProducts();  // Vuelve a aplicar el filtro a los productos
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category?.categoryName || 'Categoría no encontrada';
  }

  public getImageSrc(product: IProduct): string | undefined {
    if (product.image && product.imageContentType) {
      return `data:${product.imageContentType};base64,${product.image}`;
    }
    return undefined;
  }
}


