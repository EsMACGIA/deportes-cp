import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import {HttpClient} from '@angular/common/http';
import {DisciplinesService} from '../disciplines/disciplines.service';
import {DisciplinesModel} from '../disciplines/disciplines.model';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import { ToasterConfig } from 'angular2-toaster';
import {NbToastrService,NbComponentStatus,NbGlobalLogicalPosition, NbGlobalPosition, NbGlobalPhysicalPosition} from '@nebular/theme';
import { truncateSync } from 'fs';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './disciplines.component.html',
  styleUrls: ['./disciplines.component.scss'],
})
export class DisciplinesComponent {

  closeResult: string;

  //Settings for Smart Table
  settings = {
    mode:'external',
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
        title: 'Nombre',
        type: 'string',
      },
    },
  };

  //Variable to Load info to Smart Table
  source: LocalDataSource = new LocalDataSource();
  
  //Objects for Discipline model
  private DisciplineList:DisciplinesModel[];
  private discipline:DisciplinesModel = new DisciplinesModel();
  
  //Toastr configuration
  config:ToasterConfig;
  position:NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  status: NbComponentStatus = 'success'
  duration = 4000;
  destroyByClick = false;
  hasIcon = true;
  index = 1;
  preventDuplicates = false;

  edit: boolean = false;

  constructor(
    private service: SmartTableData,
    private http: HttpClient,
    private disciplinesService: DisciplinesService,
    private modalService: NgbModal,
    private toastrService: NbToastrService) {
      this.loadDisciplines();
    }

    // Load the Discipline to table
  loadDisciplines(){
    this.disciplinesService.getDisciplineList().subscribe(data=>{
      if (data){
        this.DisciplineList = data
        this.source.load(this.DisciplineList)
      }
    })
  }

  //Function to open modal with form to create discipline
  addDiscipline(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) =>{
      this.closeResult = 'Closed with: ${result}';
    }, (reason) => {
      this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';
    });
  }

  editDiscipline(content,event):void{
    this.edit = true
    console.log(event.data)
    Object.assign(this.discipline,event.data)
    const modal_options:NgbModalOptions = {
      size: 'lg',
      beforeDismiss: () => {
        this.discipline = new DisciplinesModel();
        this.edit = false
        return true
      },
      ariaLabelledBy: 'modal-basic-title'
    }
    this.modalService.open(content, modal_options).result.then((result) =>{
      this.closeResult = 'Closed with: ${result}';
    }, (reason) => {
      this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';
    });
  }

  // Function to close modal
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  //Function to process create Discipline Form
  addDisciplineForm(disciplineForm:NgForm){
      console.log(disciplineForm.value);
      if (disciplineForm.valid){
        this.disciplinesService.createDiscipline(this.discipline).subscribe(data =>{
          console.log(this.discipline)
        if(data){
          if(!data.error){
            this.modalService.dismissAll();
            this.loadDisciplines();
            this.showToast('success','Se ha creado una disciplina exitosamente','Se ha creado la disciplina ' + this.discipline.name + ' de manera exitosa.')
            console.log(data);
          }else{
            console.log(data.error)
            this.showToast('danger','Hubo un error al crear la disciplina',data.error.error)
          }
        }
      })
    }
  }

  editDisciplineForm(disciplineForm:NgForm){
    if (disciplineForm.valid){
      console.log(disciplineForm)
      this.disciplinesService.updateDiscipline(this.discipline).subscribe(data=>{
        if(data){
          this.modalService.dismissAll();
          if(!data.error){
            this.loadDisciplines();
            this.showToast('success','Se ha actualizado la disciplina exitosamente','Se ha actualizado la disciplina' + this.discipline.name + 'de manera exitosa')
            console.log(data);
          }else{
            console.log(data.error)
            this.showToast('danger','Hubo un error al actualizar la disciplina',data.error.error)
          }
        }
      })
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
  