import { Component, PLATFORM_ID, Inject, Injector} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import {HttpClient} from '@angular/common/http';
import {TrainersService} from '../trainers/trainers.service';
import {TrainersModel} from '../trainers/trainers.model';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import { ToasterConfig } from 'angular2-toaster';
import {NbToastrService,NbComponentStatus,NbGlobalLogicalPosition, NbGlobalPosition, NbGlobalPhysicalPosition} from '@nebular/theme';



@Component({
  selector: 'ngx-smart-table',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.scss'],
})
export class TrainersComponent {

  closeResult: string;

  //Settings of Smart Table
  settings = {
    mode: 'external',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      name: {
        title: 'Primer nombre',
        type: 'string',
      },
      lastname: {
        title: 'Apellido',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      type: {
        title: 'Tipo',
        type: 'number',
      },
      ci: {
        title: 'Cedula',
        type: 'number'
      }
    },
  };

  //Variable to load info to smart table
  source: LocalDataSource = new LocalDataSource();

  //Objects for Model Trainer
  private TrainerList:TrainersModel[];
  private trainer:TrainersModel = new TrainersModel();
  private trainer2:TrainersModel = new TrainersModel();


  //Variables to Toastr configuration
  config:ToasterConfig;
  position:NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  status: NbComponentStatus = 'success'
  duration = 4000;
  destroyByClick = false;
  hasIcon = true;
  index = 1;
  preventDuplicates = false;

  //Var to difference if open edit modal or add modal
  edit: boolean = false; 

  constructor(
    private service: SmartTableData,
    private http: HttpClient,
    private trainersService: TrainersService,
    private modalService: NgbModal,
    private toastrService: NbToastrService) {

      this.loadTrainers();
  }

  /*Load the Trainers to table */

  loadTrainers(){
    this.trainersService.getTrainerList().subscribe(data=>{
      if (data){
        console.log('Estoy recibiendo los entrenadores',data)
        this.TrainerList = data
        this.source.load(this.TrainerList)
      }
    })

  }

  
  /*----FUNCTIONS TO HANDLE MODALS----*/

  /*Function to open modal with form for create trainers */
  addTrainer(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /*Function to open modal with form for edit trainers */
  editTrainer(content,event):void{
    this.edit = true
    console.log(event.data)
    Object.assign(this.trainer,event.data) //Instance all fields of trainers with the event data
    this.trainer.password = ""
    const modal_options:NgbModalOptions = {
      size: 'lg',
      beforeDismiss: () => {
        this.trainer = new TrainersModel();
        this.edit = false
        return true
      },
      ariaLabelledBy: 'modal-basic-title'

    } 
    this.modalService.open(content, modal_options).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /*Function to open modal to confirmation for delete trainers*/
  deleteTrainer(content,event){
    Object.assign(this.trainer,event.data) //Instance all fields of trainers with the event data
    this.modalService.open(content,{ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.trainer = event.data;
  }
  
  /*Function to close modal */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  /*------------------------*/


  /* ----Functions to Handle Forms Submit---- */

  /*Function to process create Trainer Form */
  addTrainerForm(trainersForm:NgForm){
    if (trainersForm.valid){
      Object.assign(this.trainer2, this.trainer)
      this.trainer2.type = 3
      delete this.trainer2.confirmPassword;
      this.trainersService.createTrainer(this.trainer2).subscribe(data=>{
        console.log("Este es el entrenador que estoy agregando ",this.trainer2)
        console.log(this.trainer2)
        if(data){
          this.modalService.dismissAll();
          if(!data.error){
            this.loadTrainers();
            this.showToast('success','Se ha creado un entrenador exitosamente','Se ha creado el entrenador ' + this.trainer2.name + ' de manera exitosa.')
            console.log(data);
          }else{
            console.log(data.error)
            this.showToast('danger','Hubo un error al crear entrenador',data.error.error)
          }
  
          this.trainer = new TrainersModel();
        }
      })
    }
  }

  editTrainerForm(trainersForm:NgForm){
    if (trainersForm.valid){
      console.log(trainersForm)
      console.log("Este es el entrenador que estoy editando",this.trainer)
      Object.assign(this.trainer2, this.trainer)
      this.trainer2.type = 3
      delete this.trainer2.confirmPassword;
      delete this.trainer2.id;
      this.trainersService.updateTrainer(this.trainer2).subscribe(data=>{
        if(data){
          this.modalService.dismissAll();
          if(!data.error){
            this.loadTrainers();
            this.showToast('success','Se ha actualizado el entrenador exitosamente', 'Se ha actualizado el entrenador ' + this.trainer2.name + ' de manera exitosa.')
            console.log(data);
          }else{
            console.log(data.error)
            this.showToast('danger', 'Hubo un error al actualizar el entrenador', data.error.error)
          }
          this.trainer = new TrainersModel();
        }
      })
    }
  }

  deleteTrainerConfirm(){
    this.trainersService.deleteTrainer(this.trainer).subscribe(data=>{
      if(data){
        this.modalService.dismissAll();
        if (!data.error){
          this.loadTrainers();
          this.showToast('success', 'Se ha eliminado el entrenador exitosamente', 'Se ha eliminado el entrenador ' + this.trainer.name + ' de manera exitosa.')
        }else{
          this.showToast('danger','Hubo un error al eliminar el entrenador', data.error.error)
        }
        this.trainer = new TrainersModel();

      }
    })
  }

  validatePassword(password1,password2){
    return password1 == password2
  }

  /*------------------------*/

  /* Function to show toast*/
  private showToast(type: NbComponentStatus, title: string, body: string) {
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


