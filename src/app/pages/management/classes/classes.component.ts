import { Component, TemplateRef} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import {NbToastrService,NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition} from '@nebular/theme';

import {ClassesService} from '../classes/classes.service';
import { ClassesModel } from '../classes/classes.model';
import { NbDialogService } from '@nebular/theme';

import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'classes-component',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent {
  
  classList = [];

  settings = {
    mode: 'external',
    actions: {
      columnTitle: 'Acciones'
    },
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
        width: '100px'
      },
      description: {
        title: 'descripción',
        type: 'string',
      },
      comission_name: {
        title: 'Comisión',
        type: 'string',
      },
      trainer_name: {
        title: 'Nombre Entrenador',
        type: 'string',
      },
      trainer_lastname: {
        title: 'Apellido Entrenador',
        type: 'string',
      }
    },
  };


  //Toastr configuration
  position:NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  status: NbComponentStatus = 'success'
  duration = 4000;
  destroyByClick = false;
  hasIcon = true;
  index = 1;
  preventDuplicates = false;

  source: LocalDataSource = new LocalDataSource();

  //Var to difference if open edit or add
  private edit: boolean = false; 
  private clase : ClassesModel = new ClassesModel();
  private dialogRef : any;

  constructor(
    private router: Router,
    private classesService: ClassesService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService) {
    const data = [
      {
        id: 1,
        description: 'Esta clase es de natación',
        trainer_id: 1,
        trainer_name: 'Manuel',
        trainer_lastname: 'Faria',
        trainer_ci: 1,
        trainer_email: 'mfaria724@gmail.com',
        comission_id: 1,
        comission_name: 'Natación'
        
      },
      {
        id: 2,
        description: 'Esta clase es de futbol',
        trainer_id: 1,
        trainer_name: 'Carlos',
        trainer_lastname: 'Rivero',
        trainer_ci: 1,
        trainer_email: 'carlosrivero@gmail.com',
        comission_id: 1,
        comission_name: 'Futbol'
        
      },
      

    ]
    //this.source.load(data);
    this.loadClasses();
    
  }

  loadClasses(){
    let data = this.classesService.getClassList().subscribe(data=>{
      if (data){
        console.log('Recibiendo Clases', data);
        this.classList = data;
        this.source.load(this.classList);
      }
    });
  }

  createClassForm() {
    this.edit = false;
    this.clase = new ClassesModel();
    let navigationExtras: NavigationExtras = {
      queryParams: { clase : this.clase, edit : this.edit }
    };
    this.router.navigate(['/pages/management/classes-form'], navigationExtras);
  }
  
  editClassForm(event) {
    this.edit = true;
    //console.log(event.data)
    Object.assign(this.clase,event.data) //Instance all fields of trainers with the event data
    let navigationExtras: NavigationExtras = {
      queryParams: { clase : this.clase, edit : this.edit  }
    };
    this.router.navigate(['pages/management/classes-form'], navigationExtras);
  }
  
  openModal(dialog: TemplateRef<any>,event) {
    Object.assign(this.clase,event.data) //Instance all fields of user with the event data
    this.dialogRef = this.dialogService.open(
      dialog,
      { context: this.clase.description });
  }

  confirmDelete(dialog:TemplateRef<any>){
    this.classesService.deleteClass(this.clase).subscribe(data=>{
      if (data){
        if (!data.error){

          console.log(data)
          this.showToast('success','Se ha eliminado una clase exitosamente','Se ha eliminado la clase ' + this.clase.description + ' de manera exitosa.')
          this.dialogRef.close();
          this.loadClasses();
        }else{
          this.showToast('danger','Hubo un error al eliminar la clase',data.error.error)
          this.dialogRef.close();
        }
      }
    })
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