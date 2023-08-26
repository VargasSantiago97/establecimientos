import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var vars: any;

@Injectable({
    providedIn: 'root'
})
export class ComunicacionService {

    API_URI = vars.API_URI_DATABASE;

    formatoColumnas: any = {
        users: ['id', 'alias', 'nombre', 'apellido', 'email', 'contrasena', 'imagen', 'datos', 'estado'],
        establecimientos: ['id', 'alias', 'datos', 'estado'],
    }

    constructor(
        private http: HttpClient
    ) { }

    //Consultas a DB
    dbConsulta(consulta: any) {
        return this.http.post(`${this.API_URI}/index.php`, { sentencia: consulta, token: this.getToken() });
    }
    getDBServer(tabla: any) {
        var sent = 'SELECT * FROM ' + tabla
        return this.http.post(`${this.API_URI}/index.php`, { sentencia: sent, token: this.getToken() });
    }
    createDBServer(tabla: any, data: any) {
        var sent = 'INSERT INTO ' + tabla + ' ('
        sent += this.formatoColumnas[tabla].join(', ')
        sent += ') VALUES ("'

        this.formatoColumnas[tabla].forEach((e: any) => {
            const sumar = data[e] ? (data[e].toString() ? data[e].toString() : '') : ''
            sent += sumar
            sent += '", "'
        });

        sent = sent.slice(0, -3) + ')'

        return this.http.post(`${this.API_URI}/index.php`, { sentencia: sent, token: this.getToken() });
    }
    updateDBServer(tabla: any, data: any) {
        var sent = 'UPDATE ' + tabla + ' SET '

        for (let i = 0; i < this.formatoColumnas[tabla].length; i++) {
            const agregar = this.formatoColumnas[tabla][i] + ' = "' + data[this.formatoColumnas[tabla][i]] + '", '
            sent += agregar
        }

        sent = sent.slice(0, -2)
        sent += ' WHERE id = "' + data.id + '"'

        return this.http.post(`${this.API_URI}/index.php`, { sentencia: sent, token: this.getToken() });
    }
    deleteDBServer(tabla: any, idd: any) {
        const sent = 'DELETE FROM ' + tabla + ' WHERE id = "' + idd + '"'
        return this.http.post(`${this.API_URI}/index.php`, { sentencia: sent, token: this.getToken() });
    }

    getToken() {
        var token = sessionStorage.getItem('token')
        return token
    }

    //Consultas LOCALES:
    getDB(tabla: any, datosGuardar: any, fn: any = false) {
        this.getDBServer(tabla,).subscribe(
            (res: any) => {
                if (res.ok) {
                    res.data.forEach((e: any) => {
                        if (e.datos) {
                            if (JSON.parse(e.datos)) {
                                e.datos = JSON.parse(e.datos)
                            }
                        }
                    });

                    datosGuardar[tabla] = res.data

                    if (fn) {
                        fn()
                    }
                } else {
                    console.log(res)
                    alert('Error en backend')
                }
            },
            (err: any) => {
                console.error(err)
                alert('Error conectando a backend')
            }
        )
    }

    createDB(tabla: any, datosGuardar: any, fn: any = false) {
        this.createDBServer(tabla, datosGuardar).subscribe(
            (res: any) => {
                if (res.ok) {
                    if (fn) {
                        fn()
                    }
                } else {
                    console.log(res)
                    alert('Error en backend')
                }
            },
            (err: any) => {
                console.error(err)
                alert('Error conectando a backend')
            }
        )
    }

    updateDB(tabla: any, datosGuardar: any, fn: any = false) {
        this.updateDBServer(tabla, datosGuardar).subscribe(
            (res: any) => {
                if (res.ok) {
                    if (fn) {
                        fn()
                    }
                } else {
                    console.log(res)
                    alert('Error en backend')
                }
            },
            (err: any) => {
                console.error(err)
                alert('Error conectando a backend')
            }
        )
    }

    deleteDB(tabla: any, idd: any, fn: any = false) {
        this.deleteDBServer(tabla, idd).subscribe(
            (res: any) => {
                if (res.ok) {
                    if (fn) {
                        fn()
                    }
                } else {
                    console.log(res)
                    alert('Error en backend')
                }
            },
            (err: any) => {
                console.error(err)
                alert('Error conectando a backend')
            }
        )
    }




    crearSesion(user:any, pass:any) {
        return this.http.post(`${this.API_URI}/index.php`, { autorizar: { user: user, pass: pass } });
    }
    setearSesionOk(token:any){
        sessionStorage.setItem('session', 'ok')
        sessionStorage.setItem('token', token)
    }

}