import { FormControl, FormGroup, Validators } from '@angular/forms'

export const productForm = new FormGroup({
  description: new FormControl('', [
    Validators.required,
    Validators.maxLength(255),
  ]),
  price: new FormControl(1, [
    Validators.required,
    Validators.min(0.01),
  ]),
  stock: new FormControl(1, [
    Validators.required,
    Validators.min(1),
  ]),
})
