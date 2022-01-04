import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  public  notifyOverride:Partial<IndividualConfig> ={
    timeOut: 3000,
    easing:'ease-in',
    progressBar:true,
    progressAnimation:'decreasing',
    titleClass:'toast-title'
  }
  showSuccess(message:string, title:string){
    this.toastr.success(message, title , this.notifyOverride)
}

showError(message:string, title:string){
    this.toastr.error(message, title, this.notifyOverride)
}

showInfo(message:string, title:string){
    this.toastr.info(message, title, this.notifyOverride)
}

showWarning(message:string, title:string){
    this.toastr.warning(message, title, this.notifyOverride)
}
}
