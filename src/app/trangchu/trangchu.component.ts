import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { Subject } from '../models/subject';
import { SubjectSubscriber } from 'rxjs/internal/Subject';

@Component({
    selector: 'app-trangchu',
    templateUrl: './trangchu.component.html',
    styleUrls: ['./trangchu.component.css']
})
export class TrangchuComponent implements OnInit {
    subjects: Subject[];
    constructor(
       

    ) { }

    ngOnInit() {
    }
}
