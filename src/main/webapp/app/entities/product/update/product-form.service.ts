import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IProduct, NewProduct } from '../product.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProduct for edit and NewProductFormGroupInput for create.
 */
type ProductFormGroupInput = IProduct | PartialWithRequiredKeyOf<NewProduct>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IProduct | NewProduct> = Omit<T, 'createDate' | 'lastModifyDate'> & {
  createDate?: string | null;
  lastModifyDate?: string | null;
};

type ProductFormRawValue = FormValueOf<IProduct>;

type NewProductFormRawValue = FormValueOf<NewProduct>;

type ProductFormDefaults = Pick<NewProduct, 'id' | 'createDate' | 'lastModifyDate' | 'isActive' | 'categories'>;

type ProductFormGroupContent = {
  id: FormControl<ProductFormRawValue['id'] | NewProduct['id']>;
  productName: FormControl<ProductFormRawValue['productName']>;
  productDescription: FormControl<ProductFormRawValue['productDescription']>;
  price: FormControl<ProductFormRawValue['price']>;
  image: FormControl<ProductFormRawValue['image']>;
  imageContentType: FormControl<ProductFormRawValue['imageContentType']>;
  createDate: FormControl<ProductFormRawValue['createDate']>;
  lastModifyDate: FormControl<ProductFormRawValue['lastModifyDate']>;
  isActive: FormControl<ProductFormRawValue['isActive']>;
  categories: FormControl<ProductFormRawValue['categories']>;
};

export type ProductFormGroup = FormGroup<ProductFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProductFormService {
  createProductFormGroup(product: ProductFormGroupInput = { id: null }): ProductFormGroup {
    const productRawValue = this.convertProductToProductRawValue({
      ...this.getFormDefaults(),
      ...product,
    });
    return new FormGroup<ProductFormGroupContent>({
      id: new FormControl(
        { value: productRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      productName: new FormControl(productRawValue.productName),
      productDescription: new FormControl(productRawValue.productDescription),
      price: new FormControl(productRawValue.price),
      image: new FormControl(productRawValue.image),
      imageContentType: new FormControl(productRawValue.imageContentType),
      createDate: new FormControl(productRawValue.createDate),
      lastModifyDate: new FormControl(productRawValue.lastModifyDate),
      isActive: new FormControl(productRawValue.isActive),
      categories: new FormControl(productRawValue.categories ?? []),
    });
  }

  getProduct(form: ProductFormGroup): IProduct | NewProduct {
    return this.convertProductRawValueToProduct(form.getRawValue() as ProductFormRawValue | NewProductFormRawValue);
  }

  resetForm(form: ProductFormGroup, product: ProductFormGroupInput): void {
    const productRawValue = this.convertProductToProductRawValue({ ...this.getFormDefaults(), ...product });
    form.reset(
      {
        ...productRawValue,
        id: { value: productRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ProductFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createDate: currentTime,
      lastModifyDate: currentTime,
      isActive: false,
      categories: [],
    };
  }

  private convertProductRawValueToProduct(rawProduct: ProductFormRawValue | NewProductFormRawValue): IProduct | NewProduct {
    return {
      ...rawProduct,
      createDate: dayjs(rawProduct.createDate, DATE_TIME_FORMAT),
      lastModifyDate: dayjs(rawProduct.lastModifyDate, DATE_TIME_FORMAT),
    };
  }

  private convertProductToProductRawValue(
    product: IProduct | (Partial<NewProduct> & ProductFormDefaults),
  ): ProductFormRawValue | PartialWithRequiredKeyOf<NewProductFormRawValue> {
    return {
      ...product,
      createDate: product.createDate ? product.createDate.format(DATE_TIME_FORMAT) : undefined,
      lastModifyDate: product.lastModifyDate ? product.lastModifyDate.format(DATE_TIME_FORMAT) : undefined,
      categories: product.categories ?? [],
    };
  }
}
