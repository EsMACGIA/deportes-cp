import { Component } from '@angular/core';
//Services
import {CommissionsService} from '../commissions/commissions.service';
//Models
import {CommissionsModel} from '../commissions/commissions.model';
import {Router} from '@angular/router'
import {NbToastrService,NbComponentStatus,NbGlobalLogicalPosition, NbGlobalPosition, NbGlobalPhysicalPosition} from '@nebular/theme';
import { NgForm } from '@angular/forms';
@Component({
    selector: 'ngx-smart-table',
    templateUrl: './commissions-form.component.html',
    styleUrls: ['./commissions-form.component.scss'],
  })
export class CommissionsFormComponent {

  match : boolean = true;
  commission: CommissionsModel = this.router.getCurrentNavigation().extras.queryParams.commission;
  commission2: CommissionsModel = new CommissionsModel();
  edit : boolean = this.router.getCurrentNavigation().extras.queryParams.edit;

  //Toastr configuration
  position:NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  status: NbComponentStatus = 'success'
  duration = 4000;
  destroyByClick = false;
  hasIcon = true;
  index = 1;
  preventDuplicates = false;

  constructor(private commissionsService:CommissionsService, private commissionModel:CommissionsModel,
    private router:Router, private toastrService: NbToastrService) {}

  addCommissionForm(commissionForm:NgForm){
    if (commissionForm.valid){
      if(commissionForm.value.password == commissionForm.value.confirmPassword){
        this.match = true;
      }else{
        this.match = false;
      }
      Object.assign(this.commission2, this.commission)
      if (this.match){
        delete this.commission2.confirmPassword;
        this.commissionsService.createCommissions(this.commission2).subscribe(data=>{
        if (data){
          if (!data.error){
            console.log(data)
            this.showToast('success','Se ha creado una disciplina exitosamente','Se ha creado la disciplina ' + this.commission.name + ' de manera exitosa.')
            this.router.navigate(['/pages/administration/commissions']);

          }else{
            this.showToast('danger','Hubo un error al crear comisión',data.error.error)
            this.router.navigate(['/pages/administration/commissions']);
            console.log(data.error.error)
          }
          }
        });
      }
    }
  }

  editCommissionForm(commissionForm:NgForm){
    if (commissionForm.valid){ 
        if(commissionForm.value.password == commissionForm.value.confirmPassword){
            this.match = true;
        }else{
            this.match = false;
        }
        Object.assign(this.commission2, this.commission)
        if (this.match){
            delete this.commission2.confirmPassword;
            delete this.commission2.email;
            console.log('MMM')
            console.log("Comision2",this.commission2)
            this.commissionsService.updateCommission(this.commission2).subscribe(data=>{
                if (data && !data.error){
                    console.log("Yay")
                    this.showToast('success','Se ha modificado una comisión exitosamente','Se ha modificado la comisión ' + this.commission.name + ' de manera exitosa.')
                    this.router.navigate(['/pages/administration/commissions']);
                }
                else {
                    console.log(data.error)
                    this.showToast('danger','Hubo un error al modificar la comisión',data.error.error)
                    console.log(data.error.error)
                    this.router.navigate(['/pages/administration/commissions']);
                }
            });
        }
    }
}
  
  private showToast(type: NbComponentStatus, title: string, body: string){
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };

    this.index += 1;
    this.toastrService.show(
      body,
      title,
      config);
  }

}