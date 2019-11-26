import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-quenmatkhau',
	templateUrl: './quenmatkhau.component.html',
	styleUrls: ['./quenmatkhau.component.css']
})
export class QuenmatkhauComponent implements OnInit {

	userLocal = [];
	studentLocal = [];
	dataLocal = [];
	getData = [];
	_submit = false;
	username: string;
	email: string;

	constructor(
		private userService: ServiceService,
		private rout: ActivatedRoute,
		private http: HttpClient
	) { }

	ngOnInit() {
		this.userLocal = JSON.parse(localStorage.getItem('users'));
		this.studentLocal = JSON.parse(localStorage.getItem('students'));
		this.dataLocal = this.studentLocal.concat(this.userLocal);
	}

	checkData(formSend: NgForm) {
		let count = 0;
		if (formSend.valid) {
			for (var i = 0; i < this.dataLocal.length; i++) {
				if (this.dataLocal[i].username === formSend.value.username &&
					this.dataLocal[i].email === formSend.value.email) {
					this.getData.push(this.dataLocal[i]);
					this._submit = true;
					count++;
				}
			}
			if (count == 0) {
				alert('Thông Tin Không Chính Xác');
			}
		}
	}

	back() {
		this._submit = false;
		this.getData = [];
		this.username = null;
		this.email = null;
	}
}
