import { AbstractControl, ValidationErrors } from '@angular/forms';

export class UsernameValidators {
    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
        if((control.value as string).indexOf(' ') >=0){
            return { 
                // minlength: {
                //     requiredLength:10,
                //     actualLength: control.value.length
                // }
                cannotContainSpace: true 
            }
        }else{
            return null;
        }
    }
}
