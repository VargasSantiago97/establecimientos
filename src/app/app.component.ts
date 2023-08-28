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

    datosEstablecimientos: any = []

    user: any = 'admin'
    password: any = '123456798'

    cols: any = []

    displayCampo: any = 'none'
    displayCampoTitulo: any = ''

    establecimiento: any = {alias : ''};

    mostrar: any = {
        arrendadores: true,
        renspa: true
    }

    constructor(
        private cs: ComunicacionService
    ){}

    ngOnInit(){
        //this.cs.getDB('rubros', this.db, () => { console.log(this.db) })
        //this.crearSesion('admin', '123456798')

        this.cols = [
            {field: 'establecimiento', header: 'Establecimiento'},
            {field: 'produce', header: 'Produce'},
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

        this.cs.getDB('establecimientos', this.db, () => { this.prepararDatosTabla() })
    }


    prepararDatosTabla(){
        this.datosEstablecimientos = []

        this.db['establecimientos'].forEach((establecimiento:any) => {

            var item:any = {
                id: establecimiento.id,
                establecimiento: establecimiento.alias
            }

            this.datosEstablecimientos.push(item)

        })
    }

    abrirModalCampo(idd:any = null){

        if(idd){
            //buscar establecimiento
            this.displayCampoTitulo = 'Editar '
            this.establecimiento = this.db['establecimientos'].find((e:any) => { return e.id == idd })

        } else {
            this.displayCampoTitulo = 'Nuevo '
            this.establecimiento = {
                id: null,
                alias: ''
            }
        }

        this.displayCampo = 'block'
    }

    aceptarEstablecimiento(){
        if(this.establecimiento.id){
            //EDITAR
            this.cs.updateDB('establecimientos', this.establecimiento, () => {
                this.displayCampo = 'none'
                this.cs.getDB('establecimientos', this.db, () => { this.prepararDatosTabla() })
            })
        } else {
            //CREAR
            this.establecimiento.id = this.generarID('establecimientos')
            this.establecimiento.estado = 1

            this.cs.createDB('establecimientos', this.establecimiento, () => {
                this.displayCampo = 'none'
                this.cs.getDB('establecimientos', this.db, () => { this.prepararDatosTabla() })
            })
        }
    }

    generarID(tabla:any){
        var idd:any = this.generateUUID()
        if(!this.db[tabla].some((e:any) => { return e.id == idd})){
            return idd
        }
        idd = this.generateUUID()
        if(!this.db[tabla].some((e:any) => { return e.id == idd})){
            return idd
        }
        idd = this.generateUUID()
        if(!this.db[tabla].some((e:any) => { return e.id == idd})){
            return idd
        }
        idd = this.generateUUID()
        return idd
    }
    generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
}
