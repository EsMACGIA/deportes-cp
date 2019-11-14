import { Component } from '@angular/core';
//Services
import {CommissionsService} from '../commissions/commissions.service';
//Models
import {CommissionsModel} from '../commissions/commissions.model';
import {Router} from '@angular/router'
import {NbToastrService,NbComponentStatus,NbGlobalLogicalPosition, NbGlobalPosition, NbGlobalPhysicalPosition} from '@nebular/theme';
@Component({
    selector: 'ngx-smart-table',
    templateUrl: './commissions-form.component.html',
    styleUrls: ['./commissions-form.component.scss'],
  })
export class CommissionsFormComponent {

  private commission:CommissionsModel = new CommissionsModel();
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

  addCommissionForm(commissionForm){
    if (commissionForm.valid){
      this.commissionsService.createCommission(this.commission);
      this.showToast('success','Se ha creado una disciplina exitosamente','Se ha creado la disciplina ' + this.commission.name + ' de manera exitosa.')
      this.router.navigate(['/pages/administration/commissions']);
    }else{
      console.log(commissionForm.error);
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