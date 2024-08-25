/* eslint-disable @angular-eslint/component-selector */

import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ProductService } from "app/entities/product/service/product.service";
import { IProduct } from 'app/entities/product/product.model';
import { AnimationTranslateTopHoverDirective } from "app/shared/directives/animation-translate-top-hover.directive";
import { FilterByPipe } from "app/shared/pipes/filterBy/filter-by.pipe";
import { NgxPaginationModule } from "ngx-pagination";


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [ CommonModule, AnimationTranslateTopHoverDirective, NgxPaginationModule, FilterByPipe, FormsModule ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class ProductCardComponent implements OnInit {

  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];

  public page!: number;
  
  productName: string = '';

  constructor(
    private productService: ProductService
  ) {

  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.loadProducts();
  }

  public loadProducts(): void {
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

  public filterProducts(): void {
    if (this.productName) {
      this.filteredProducts = this.products.filter(product =>
        product.productName?.toLowerCase().includes(this.productName) && product.isActive === true
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  public getImageSrc(product: IProduct): string | undefined {
    if (product.image && product.imageContentType) {
      return `data:${product.imageContentType};base64,${product.image}`;
    }
    return undefined;
  }

}


