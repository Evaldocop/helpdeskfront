import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-delete',
  templateUrl: './chamado-delete.component.html',
  styleUrls: ['./chamado-delete.component.css']
})
export class ChamadoDeleteComponent implements OnInit {

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
  clientes: Cliente []=[];
  tecnicos: Tecnico[]=[];

  prioridade:    FormControl=  new FormControl(null,[Validators.required]);
	status:        FormControl=  new FormControl(null,[Validators.required]);
	titulo:        FormControl=  new FormControl(null,[Validators.required]);
  observacoes:   FormControl=  new FormControl(null,[Validators.required]);
  tecnico:       FormControl=   new FormControl(null,[Validators.required]);
  cliente:       FormControl=   new FormControl(null,[Validators.required]);


  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toastr : ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findAllClientes();
    this.findAllTecnicos();
    this.findById();
  }
  delete():void{
    this.chamadoService.delete(this.chamado.id).subscribe(resposta=>{
      this.toastr.success("Chamado deletado com sucesso", "Deletando Chamado");
      this.router.navigate(['chamados']);
        
    }, ex => {
         this.toastr.error(ex.error.error)
    });
    
  }
  findAllClientes():void{
    this.clienteService.findAll().subscribe(resposta=>{
      this.clientes=resposta;
    })
  }

  findAllTecnicos():void{
    this.tecnicoService.findAll().subscribe(resposta=>{
      this.tecnicos=resposta;
    })
  }

  findById(){
    this.chamadoService.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta;
     } , ex => {
        this.toastr.error(ex.error.error)
   });
  }

  validaCampos(): boolean{
    return this.prioridade.valid &&
    this.status.valid&&
    this.titulo.valid&&
    this.observacoes.valid &&   
    this.tecnico.valid&&
    this.cliente.valid
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

