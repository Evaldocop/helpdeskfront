import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';



@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})
export class ChamadoReadComponent implements OnInit {

  chamado: Chamado={
   
    prioridade: '',   
    status:     '',
    titulo:     '',
    observacoes:'',
    tecnico:    '',
    cliente:    '',
    nomeTecnico:'',
    nomeCliente:''

  }
 


  constructor(
    private chamadoService: ChamadoService,
    private toastr : ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(){
    this.chamadoService.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta;
     } , ex => {
        this.toastr.error(ex.error.error)
   });
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

}




