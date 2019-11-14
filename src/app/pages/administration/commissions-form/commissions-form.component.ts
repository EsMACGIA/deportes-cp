import { Component } from '@angular/core';
//Services
import {CommissionsService} from '../commissions/commissions.service';
//Models
import {CommissionsModel} from '../commissions/commissions.model';
import {Router} from '@angular/router'
@Component({
    selector: 'ngx-smart-table',
    templateUrl: './commissions-form.component.html',
    styleUrls: ['./commissions-form.component.scss'],
  })
export class CommissionsFormComponent {

  private commission:CommissionsModel = new CommissionsModel();
  constructor(private commissionsService:CommissionsService, private commissionModel:CommissionsModel,
    private router:Router) {
    }
    addCommissionForm(commissionForm){
      this.commissionsService.createCommission(this.commission);
      this.router.navigate(['/pages/administration/commissions']);
    }

}