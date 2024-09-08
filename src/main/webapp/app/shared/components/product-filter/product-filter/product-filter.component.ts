/* eslint-disable no-console */
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICategory } from 'app/entities/category/category.model';
import { CategoryService } from 'app/entities/category/service/category.service';

@Component({
  selector: 'product-filter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
export class ProductFilterComponent implements OnInit{
  
  @Output() filterNameChange = new EventEmitter<string>();
  @Output() filterCategoryChange = new EventEmitter<string>();
  @Input() selectedCategory: string = '';  // Recibe la categoría desde el padre

  productName: string = '';
  categories: ICategory[] = [];

  constructor(
    private categoryService: CategoryService
  ){

  }

  ngOnInit(): void {
    this.loadCategories();
    console.log(this.selectedCategory);
    
  }

  // Emite el valor de filtro por nombre
  onFilterNameChange(): void {
    this.filterNameChange.emit(this.productName);
  }

  onFilterCategoryChange(): void {
    console.log('Categoría seleccionada en el filtro:', this.selectedCategory); // Verifica qué valor se está seleccionando
    this.filterCategoryChange.emit(this.selectedCategory); // Emite el valor seleccionado
  }
  

  loadCategories(): void {
    this.categoryService.query().subscribe(
      (res) => {
        this.categories = res.body ?? []; 
        console.log('Categorías cargadas:', this.categories); 
      },
      (error) => {
        console.error('Error al cargar categorías:', error);
      }
    );
  }
}
