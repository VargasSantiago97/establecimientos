import { Component } from '@angular/core';
import { ComunicacionService } from './services/comunicacion.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    api: any = "AIzaSyA_b7kr1_R1gtIsyfWzLUNEjlhCvnN2dbo";
    constructor(
    ) { }

    ngOnInit() {
    }
}
