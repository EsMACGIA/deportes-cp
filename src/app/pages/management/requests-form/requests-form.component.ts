import { Component } from '@angular/core';
//Services
import {ClassesService} from '../classes/classes.service';
import {AthletesService} from '../athletes/athletes.service';
import {RequestsService} from '../requests/requests.service';
//Models
import {RequestModel} from '../requests/request.model';
import {AthletesModel} from '../athletes/athletes.model'
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router'
import {NbToastrService,NbComponentStatus,NbGlobalLogicalPosition, NbGlobalPosition, NbGlobalPhysicalPosition} from '@nebular/theme';


@Component({
  selector: 'requests-form-component',
  templateUrl: './requests-form.component.html',
  styleUrls: ['./requests-form.component.scss'],
})
export class RequestsFormComponent {

  type: string = 'edit';
  cardTitle: string = '';
  match : boolean = true;
  edit : boolean = this.router.getCurrentNavigation().extras.queryParams.edit;
  request: RequestModel = this.router.getCurrentNavigation().extras.queryParams.request;
  request2: RequestModel = new RequestModel();



  classList = [];
  athletesList = [];

  //Toastr configuration
  position:NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  status: NbComponentStatus = 'success'
  duration = 4000;
  destroyByClick = false;
  hasIcon = true;
  index = 1;
  preventDuplicates = false;

  constructor (private classesService:ClassesService, private athletesService:AthletesService, private requestsService:RequestsService,
     private router:Router,private toastrService: NbToastrService) {
      console.log(this.edit);

    if (this.type == 'add') {
      this.cardTitle = 'Agrega Solicitud';
    } else if (this.type == 'edit'){
      this.cardTitle = 'Editar Solicitud';
    }

    this.loadClasses();
    this.loadAthletes();
  }

  loadClasses(){
    let data = this.classesService.getClassList().subscribe(data=>{
      if (data){
        console.log('Recibiendo Clases', data);
        this.classList = data;
        return this.classList
      }
    });
  }

  loadAthletes(){
    let data = this.athletesService.getAthletesList().subscribe(data=>{
      if (data){
        console.log('Recibiendo Clases', data);
        this.athletesList = data;
        return this.athletesList
      }
    });
  }

  addRequestForm(requestForm:NgForm){
    if (requestForm.valid){
      console.log('Entree aca')
      Object.assign(this.request2, this.request)
      this.request2.status = 'IN PROCESS';
      this.request2.athlete_id = Number(this.request2.athlete_id)
      this.request2.class_id = Number(this.request2.class_id)
      console.log('El retire de request 2 es: ',this.request2.retire)
      // this.request2.retire = (this.request2.retire == 'true');
      console.log("El retire de request 2 CASTEADO", this.request2.retire)  // == true
      console.log('Estoy enviando: ',this.request2)
      
      // if (this.request2.retire == "1"){
      //   this.request2.retire = true
      // }else{
      //   this.request2.retire = false;
      // }
      console.log(this.request2.retire)

      this.request = Object.assign(this.request2);
        this.requestsService.createRequest(this.request2).subscribe(data=>{
        if (data){
          if (!data.error){
            console.log(data)
            this.showToast('success','Se ha creado una solicitud exitosamente','Se ha creado la solicitud ' + this.request.id + ' de manera exitosa.')
            this.router.navigate(['/pages/management/requests']);

          }else{
            this.showToast('danger','Hubo un error al crear solicitud',data.error.error)
            this.router.navigate(['/pages/management/requests']);
            console.log(data.error.error)
          }
          }
        });
      }
      
  }

  editRequestForm(requestForm:NgForm){
        Object.assign(this.request2, this.request)
            console.log('MMM')
            console.log("Comision2",this.request2)
            this.requestsService.updateRequest(this.request2).subscribe(data=>{
                if (data && !data.error){
                    console.log("Yay")
                    this.showToast('success','Se ha modificado una comisión exitosamente','Se ha modificado la comisión ' + this.request.id + ' de manera exitosa.')
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
