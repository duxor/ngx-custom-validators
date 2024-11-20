import { Directive, Input, forwardRef, OnInit } from '@angular/core';
import { NG_VALIDATORS, Validator, UntypedFormControl, ValidatorFn, AbstractControl } from '@angular/forms';

import { equalTo } from './validator';

const EQUAL_TO_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => EqualToValidator),
  multi: true
};

@Directive({
    selector: '[equalTo][formControlName],[equalTo][formControl],[equalTo][ngModel]',
    providers: [EQUAL_TO_VALIDATOR],
    standalone: false
})
export class EqualToValidator implements Validator, OnInit {
  @Input() equalTo: UntypedFormControl;

  private validator: ValidatorFn;

  ngOnInit() {
    this.validator = equalTo(this.equalTo);
  }

  validate(c: AbstractControl): {[key: string]: any} {
    return this.validator(c);
  }
}
