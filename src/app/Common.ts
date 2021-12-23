import { FormGroup } from "@angular/forms";

export function confirmPassword(password: string, confirmPass: string){
    return(formGroup:FormGroup)=>{
        const control = formGroup.controls[password];
        const matchingControl = formGroup.controls[confirmPass];
        if(control.value !== matchingControl.value)
        matchingControl.setErrors({confirmPasswordMatch: true})
        else if(control.value == '' && matchingControl.value == '')
        matchingControl.setErrors({confirmPasswordMatch: true})
        else
        matchingControl.setErrors(null);
    }
}
