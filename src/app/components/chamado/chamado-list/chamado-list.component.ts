import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {
  selected:string;
  ELEMENT_DATA: Chamado[] = []
   

  displayedColumns: string[] = ['id','titulo', 'nomeTecnico', 'nomeCliente', 'dataAbertura','dataFechamento','prioridade','status', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private service: ChamadoService) { }

  ngOnInit(): void {
    this.findAll();
  }


  findAll(){
    this.service.findAll().subscribe(resposta =>{
      this.ELEMENT_DATA=resposta;
      this.dataSource =  new MatTableDataSource<Chamado>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  retornaStatus(status :any): string {
    switch(status){
     case 0: return 'Aberto'
             break;
     case 1: return 'Andamento'
             break;
     default: return 'Encerrado'
    }
  }
    retornaPrioridade(prioridade :any): string {
      switch(prioridade){
       case 0: return 'Baixa'
               break;
       case 1: return 'Média'
               break;
       default: return 'Alta'
      }
    
  }

  orderByStatus(status:any):void{
    let chamadosFitrados : Chamado[]=[];
    this.ELEMENT_DATA.forEach(element=>{
          if(element.status==status)
            chamadosFitrados.push(element)
    });
    this.dataSource = new MatTableDataSource(chamadosFitrados);
    this.dataSource.paginator = this.paginator;

  }
}
