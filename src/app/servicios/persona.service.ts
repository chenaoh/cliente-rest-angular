import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  
  constructor(private http: HttpClient) { 
  }

  obtenerPersona(id:string){
    var url='http://localhost:8080/clinicasoft/servicio/personas/'+id;
    let header=new HttpHeaders().set('Content-Type','application/json');

    return this.http.get(url,{
      observe: 'response',
      headers:header
    });
  }

  registrarPersona(persona:any){
    console.log("Información para actualizar")
    console.log(persona);
    var url='http://localhost:8080/clinicasoft/servicio/personas/add';
    let header=new HttpHeaders().set('Content-Type','application/json')
    
    let objJson=JSON.stringify({
      idPersona: persona.id,
      nacimiento: {
          ciudadNacimiento: persona.ciudad,
          departamentoNacimiento: persona.departamento,
          fechaNacimiento: persona.nacimiento,
          idNacimiento: null,
          paisNacimiento: persona.pais
      },
      nombre: persona.nombre,
      profesion: persona.profesion,
      telefono: persona.telefono,
      tipo: persona.tipo
  })
    console.log(objJson);

    return this.http.post(url,objJson,{
      observe: 'response',
      headers:header
    });
  }

  actualizarPersona(persona:any){
    var url='http://localhost:8080/clinicasoft/servicio/personas/'+persona.id;
    let header=new HttpHeaders().set('Content-Type','application/json')
    let objJson=JSON.stringify({
      idPersona: persona.id,
      nacimiento: {
          ciudadNacimiento: persona.ciudad,
          departamentoNacimiento: persona.departamento,
          fechaNacimiento: persona.nacimiento,
          paisNacimiento: persona.pais
      },
      nombre: persona.nombre,
      profesion: persona.profesion,
      telefono: persona.telefono,
      tipo: persona.tipo
  })

    return this.http.put(url,objJson,{
      observe: 'response',
      headers:header
    });
  }

  eliminarPersona(id:string){
    var url='http://localhost:8080/clinicasoft/servicio/personas/'+id;
    let header=new HttpHeaders().set('Content-Type','application/json')

    return this.http.delete(url,{
      observe: 'response',
      headers:header
    });
  }
}

