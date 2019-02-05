import { Injectable } from '@angular/core';
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toast: ToastaService,
    private toastConfig: ToastaConfig
  ) {
    this.toastConfig.theme = 'bootstrap';
   }

   public addToast(type, title, body) {
    // Or create the instance of ToastOptions
    const toastOptions: ToastOptions = {
        title: title,
        msg: body,
        showClose: true,
        timeout: 5000,
        // theme: 'default',
        onAdd: (toast: ToastData) => {
            // console.log('Toast ' + toast.id + ' has been added!');
        },
        onRemove: function(toast: ToastData) {
            // console.log('Toast ' + toast.id + ' has been removed!');
        }
    };
    // Add see all possible types in one shot
    switch (type) {
      case 'info':
        this.toast.info(toastOptions);
        break;
      case 'success':
        this.toast.success(toastOptions);
        break;
      case 'wait':
        this.toast.wait(toastOptions);
        break;
       case 'error':
        this.toast.error(toastOptions);
        break;
      case 'warning':
        this.toast.warning(toastOptions);
        break;
    }
  }
}
