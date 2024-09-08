/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @angular-eslint/component-selector */

import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges, OnInit } from "@angular/core";
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
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [ CommonModule, AnimationTranslateTopHoverDirective, NgxPaginationModule, FilterByPipe, FormsModule, LineTitleDirective, ProductFilterComponent ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class ProductCardComponent implements OnInit, OnChanges {
  
  @Input() selectedCategory: any = '';  // Recibe la categoría desde el padre

  products: IProduct[] = [];
  categories: ICategory[] = [];
  filteredProducts: IProduct[] = [];
  public page!: number;
  productName: string = '';
  category: any = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const category = this.route.snapshot.paramMap.get('categoria');
        this.onFilterCategoryChange(category || '');
      }
    });
  
    this.loadProducts();
    this.loadCategories();
    console.log(this.productName);
    console.log(this.selectedCategory);
    console.log(this.categories);
    
  }

  ngOnChanges(): void {
    if (this.categories.length > 0) {
      this.matchCategoryId();
    } else {
      this.loadCategories().then(() => this.matchCategoryId()); // Cargar categorías y luego buscar
    }
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

  loadCategories(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.categoryService.query().subscribe(
        (res) => {
          this.categories = res.body ?? [];
          resolve(); // Resuelve la promesa cuando las categorías han sido cargadas
        },
        (error) => {
          console.error('Error al cargar categorias:', error);
          reject(error);
        }
      );
    });
  }

  filterProducts(): void {
    if (this.categories.length === 0) {
      console.warn('Las categorías aún no están cargadas.');
      return;
    }
  
    const selectedCategoryId = this.category ? Number(this.category) : null;
    console.log('ID de la categoría seleccionada para el filtro:', selectedCategoryId);
  
    this.filteredProducts = this.products.filter(product => {
      // Filtrar por nombre del producto
      const matchesProductName = product.productName?.toLowerCase().includes(this.productName.toLowerCase());
      console.log('Coincidencia del nombre del producto:', matchesProductName);
  
      // Filtrar por categoría: si `selectedCategoryId` es `null`, mostrar todos los productos
      const matchesCategory = selectedCategoryId === null || 
        product.categories?.some(category => category.id === selectedCategoryId);
      console.log('Coincidencia de categoría:', matchesCategory);
  
      return matchesProductName && matchesCategory && product.isActive === true;
    });
  
    console.log('Productos filtrados:', this.filteredProducts);
  }
  

  matchCategoryId(): void {
    // Busca la categoría que coincide con el nombre recibido en el input
    const matchingCategory = this.categories.find(category => category.categoryName?.toLowerCase() === this.selectedCategory?.toLowerCase());

    if (matchingCategory) {
      this.category = matchingCategory.id;  // Si se encuentra, extrae el ID
      console.log('ID de la categoría encontrada:', this.category);
      console.log('Filtrando por:', this.category);
      this.filterProducts();  // Filtrar los productos cuando cambie la categoría
    } else {
      console.log('No se encontró una categoría con el nombre:', this.category);
      this.category = '';  // Si no se encuentra, establecemos el ID a null
    }
  }

  // Escucha el cambio en el filtro de nombre desde el componente de filtrado
  onFilterNameChange(productName: string): void {
    this.productName = productName;
    this.filterProducts();
  }

  onFilterCategoryChange(selectedCategory: string): void {
    // Primero, eliminamos espacios en blanco y verificamos si la categoría es válida
    this.selectedCategory = selectedCategory.trim();  // Eliminar espacios adicionales
  
    console.log('Categoría seleccionada desde el navbar/card:', this.selectedCategory);
  
    // Si `selectedCategory` está vacío, asignamos `null` para que no se aplique el filtro de categoría
    if (!this.selectedCategory) {
      console.log('No se seleccionó ninguna categoría, mostrando todos los productos.');
      this.category = null;
      this.filteredProducts = this.products;  // Mostrar todos los productos si no hay categoría seleccionada
    } else {
      // Convertimos la categoría seleccionada a un número, ya que estamos trabajando con IDs numéricos
      const selectedCategoryId = Number(this.selectedCategory);
      
      // Si es un número válido, buscamos el ID de esa categoría
      if (!isNaN(selectedCategoryId)) {
        const matchingCategory = this.categories.find(category => 
          category.id === selectedCategoryId
        );
  
        if (matchingCategory) {
          this.category = matchingCategory.id;
          console.log('ID de la categoría encontrada:', this.category);
        } else {
          console.log('No se encontró una categoría con el ID:', this.selectedCategory);
          this.category = null;  // Si no se encuentra la categoría, limpiamos el filtro
        }
      } else {
        console.log('La categoría seleccionada no es un número válido:', this.selectedCategory);
        this.category = null;  // Si no es un número válido, limpiamos el filtro
      }
    }
  
    // Aplicamos el filtro de productos después de obtener o no el ID de la categoría
    this.filterProducts();
  }

  onSelectFilterCategoryChange(selectedCategory: string): void {
    this.selectedCategory = selectedCategory.trim();  // Eliminar espacios adicionales
    console.log('Categoría seleccionada card:', this.selectedCategory); // Luego muestra el valor
    this.filterProducts();  // Vuelve a aplicar el filtro a los productos
}


  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category?.categoryName || 'Categoría no encontrada';
  }

  navigateToUrl() {
    window.open('https://wa.me/c/5491126786057', '_blank');
  }

  public getImageSrc(product: IProduct): string | undefined {
    if (product.image && product.imageContentType) {
      return `data:${product.imageContentType};base64,${product.image}`;
    }
    return undefined;
  }
}


