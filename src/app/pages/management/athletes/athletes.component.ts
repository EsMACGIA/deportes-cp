import { Component, TemplateRef } from '@angular/core';



//Models
import { AthletesModel } from './athletes.model';
//Services
import {AthletesService} from './athletes.service';

//Components
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { Router, NavigationExtras } from '@angular/router';
import {NbToastrService,NbComponentStatus,NbGlobalLogicalPosition, NbGlobalPosition, NbGlobalPhysicalPosition} from '@nebular/theme';
import { debug } from 'util';

@Component({
  selector: 'athletes-component',
  templateUrl: './athletes.component.html',
  styleUrls: ['./athletes.component.scss'],
})
export class AthletesComponent {

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
      stock_number: {
        title: 'N° Acción',
        type: 'number',
      },
      name: {
        title: 'Nombres',
        type: 'string',
      },
      lastname: {
        title: 'Apellidos',
        type: 'string',
      },
      ci: {
        title: 'Cédula de Identidad',
        type: 'string',
      },
      sex: {
        title: 'Sexo',
        type: 'string',
      },
      birthday: {
        title: 'Fecha de Nacimiento',
        type: 'number',
      },
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

  //Variable to Load info to Smart Table
  source: LocalDataSource = new LocalDataSource();
  private athletesList:AthletesModel[];
  private athlete:AthletesModel = new AthletesModel();
  private dialogRef : any;
  //Var to difference if open edit or add
  private edit: boolean = false; 

  constructor(
    private router: Router, private athletesService:AthletesService,
    private dialogService: NbDialogService, private toastrService: NbToastrService
  ) {
    this.loadAthletes();
  }

  loadAthletes(){
    let data = this.athletesService.getAthletesList().subscribe(data=>{
      if (data){
        this.athletesList = data
        this.source.load(this.athletesList)
      }
    });
  }

  createAthletesForm(){
    this.edit = false;
    this.athlete = new AthletesModel();
    let navigationExtras: NavigationExtras = {
      queryParams: { athlete : this.athlete, edit : this.edit }
    };
    this.router.navigate(['pages/management/athletes-form'], navigationExtras);
  }


  editAthletesForm(event){
    this.edit = true;
    Object.assign(this.athlete,event.data) //Instance all fields of trainers with the event data
    let navigationExtras: NavigationExtras = {
      queryParams: { athlete : this.athlete, edit : this.edit  }
    };
    this.router.navigate(['pages/management/athletes-form'], navigationExtras);
  }

  /*Function to open modal to confirmation for delete user*/
  openModal(dialog: TemplateRef<any>,event) {
    Object.assign(this.athlete,event.data) //Instance all fields of user with the event data
    this.dialogRef = this.dialogService.open(
      dialog,
      { context: this.athlete.name });
  }

  confirmDelete(dialog:TemplateRef<any>){
    this.athletesService.deleteAthlete(this.athlete).subscribe(data=>{
      if (data){
        if (!data.error){
          this.showToast('success','Se ha eliminado un atleta exitosamente','Se ha eliminado al atleta ' + this.athlete.name + ' ' + this.athlete.lastname + ' de manera exitosa.')
          this.dialogRef.close();
          this.loadAthletes();
        }else{
          this.showToast('danger','Hubo un error al eliminar al atleta',data.error.error)
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
  