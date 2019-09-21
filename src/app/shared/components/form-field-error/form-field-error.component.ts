import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{errorMessage}}
    </p>
  `,
  styleUrls: ['./form-field-error.component.scss']
})
export class FormFieldErrorComponent implements OnInit {
  @Input() formControlField: FormControl;

  constructor() { }

  ngOnInit() {
  }

  public get errorMessage(): string | null {
    if (this.formControlField.touched && this.formControlField.invalid) {
      return this.getErrorMessage();
    } else {
      return null;
    }
  }

  private getErrorMessage(): string | null {
    if (this.formControlField.errors.required) {
      return "dado obrigatório";
    }

    if (this.formControlField.errors.minlength) {
      const requiredLength = this.formControlField.errors.minlength.requiredLength;
      return `deve ter no mínimo ${requiredLength} caracteres`;
    }
  }

}
