import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import {HttpClient} from '@angular/common/http';
import {DisciplinesService} from '../disciplines/disciplines.service';
import {DisciplinesModel} from '../disciplines/disciplines.model';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './disciplines.component.html',
  styleUrls: ['./disciplines.component.scss'],
})
export class DisciplinesComponent {

  closeResult: string;
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

  source: LocalDataSource = new LocalDataSource();
  private DisciplineList:DisciplinesModel[];
  private discipline:DisciplinesModel = new DisciplinesModel();

  constructor(
    private service: SmartTableData,
    private http: HttpClient,
    private disciplinesService: DisciplinesService,
    private modalService: NgbModal) {
      this.loadDisciplines();
    }

    // Load the Disciplline to table
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
    this.disciplinesService.createDiscipline(this.discipline).subscribe(data=>{
      console.log(disciplineForm.value)
      if(data){
        this.modalService.dismissAll();
        this.loadDisciplines();
        console.log(data);
      }
    })
  }



}
  