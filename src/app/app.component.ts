import { Component } from '@angular/core';
import { ComunicacionService } from './services/comunicacion.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'ESTABLECIMIENTOS';
    db:any = {}

    user: any = 'admin'
    password: any = '123456798'

    cols: any = []

    mostrar: any = {
        arrendadores: true
    }

    constructor(
        private cs: ComunicacionService
    ){}

    ngOnInit(){
        //this.cs.getDB('rubros', this.db, () => { console.log(this.db) })
        //this.crearSesion('admin', '123456798')

        this.cols = [
            {field: 'produce', header: 'Produce'},
            {field: 'establecimiento', header: 'Establecimiento'},
            {field: 'arrendadores', header: 'Dueños'},
            {field: 'contrato', header: 'Contratos'},
            {field: 'vencimiento', header: 'Vencimiento'},
            {field: 'chacra', header: 'Chacra'},
            {field: 'seccion', header: 'Seccion'},
            {field: 'parcela', header: 'Parcela'},
            {field: 'circunscripcion', header: 'Circunscripcion'},
            {field: 'renspa', header: 'RENSPA'},
            {field: 'partida', header: 'N° Partida'},
            {field: 'contacto', header: 'Contacto'},
            {field: 'ciltivo', header: 'Cultivo'}
        ]
    }

    crearSesion(){
        this.cs.crearSesion(this.user, this.password).subscribe(
            (res:any) => {
                if(res){
                    if(res.ok){
                        sessionStorage.setItem('session', 'ok')
                        sessionStorage.setItem('token', res.data)
                        alert('Sesion creada con exito')
                    } else {
                        alert(res.mensaje)
                        console.log(res)
                    }
                } else {
                    console.log('eer')
                }
            },
            (err:any) => {
                console.log(err)
            }
        )
    }
    obtenerDatos(){
        this.cs.getDB('socios', this.db, () => { console.log(this.db) })
    }
}
