import { Component } from '@angular/core';
import { PersonaService } from './servicios/persona.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'cliente-rest';

  objetoJson:any;

  persona: any = {id:'',nombre:'',tipo:'',profesion:'',telefono:'',
                      fechaNacimiento:'',ciudad:'',departamento:'',pais:''}

  constructor(private personasService:PersonaService){
  }

  obtenerPersona():void{
    this.personasService.obtenerPersona(this.persona.id).subscribe(resp=>{
      console.log(resp);
      if(resp.status==200){
        this.objetoJson=resp.body;    
        console.log(this.objetoJson);
        this.persona.id=this.objetoJson.idPersona;
        this.persona.nombre=this.objetoJson.nombre;
        this.persona.tipo=this.objetoJson.tipo;
        this.persona.profesion=this.objetoJson.profesion;
        this.persona.telefono=this.objetoJson.telefono;
        this.persona.fechaNacimiento=this.objetoJson.nacimiento.fechaNacimiento;
        this.persona.ciudad=this.objetoJson.nacimiento.ciudadNacimiento;
        this.persona.departamento=this.objetoJson.nacimiento.departamentoNacimiento;
        this.persona.pais=this.objetoJson.nacimiento.paisNacimiento;
      }  
    },
    error => {
      console.log(<any>error);
      if(error.status==404){
        alert("La Persona no existe");
      }else alert("Error!");
    });
  }

  registrarPersona():void{
    this.personasService.registrarPersona(this.persona).subscribe(resp=>{
      console.log(resp);
      if(resp.status==200){
        alert("La Persona fué registrada satisfactoriamente!");
      }  
    },
    error => {
      console.log(<any>error);
      if(error.status==404){
        alert("No se pudo registrar, verifique qué la persona no existe!");
      }else alert("Error!");
    });
  }  

  actualizarPersona():void{
    this.personasService.actualizarPersona(this.persona).subscribe(resp=>{
      console.log(resp);
      if(resp.status==200){
        alert("La Persona fué actualizada satisfactoriamente!");
      }  
    },
    error => {
      console.log(<any>error);
      if(error.status==404){
        alert("No se pudo actualizar!");
      }else alert("Error!");
    });
  } 

  eliminarPersona():void{
    this.personasService.eliminarPersona(this.persona.id).subscribe(resp=>{
      console.log(resp);
      if(resp.status==200){
        alert("La Persona fué eliminada!");
        this.persona.id="";
        this.persona.nombre="";
        this.persona.tipo="";
        this.persona.profesion="";
        this.persona.telefono="";
        this.persona.nacimiento="";
        this.persona.ciudad="";
        this.persona.departamento="";
        this.persona.pais="";
      }else if(resp.status==204){
          alert("La Persona no pudo ser eliminada, verifique qué no tenga mascotas o productos asociados!");
      }  
    },
    error => {
      console.log(<any>error);
      if(error.status==404){
        alert("No se pudo eliminar, verifique si la persona no existe!");
      }else alert("Error!");
    });
  } 

}
