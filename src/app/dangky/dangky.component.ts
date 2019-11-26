import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student } from '../models/student';


@Component({
	selector: 'app-dangky',
	templateUrl: './dangky.component.html',
	styleUrls: ['./dangky.component.css']
})
export class DangkyComponent implements OnInit {
	students: Student[];
	listUsers = [];
	studentLocal = [];
	_submit = false;
	checkbox = true;
	check = false;;
	id: number = 4;
	username: string = "binhdang";
	password: string = "Binhdang1808";
	repass: string = "Binhdang1808";
	fullname: string = "Dang Thai Binh";
	email: string = "dangthaibinh08@gmail.com";
	gender: string = "true";
	birthday: string = "2000-08-18";
	schoolfee: number = 6500000;
	marks = 0;

	constructor(
		private serviceService: ServiceService
	) { }

	ngOnInit() {
		this.getUsers();
		this.studentLocal = JSON.parse(localStorage.getItem('students'));
	}
	getUsers() {
		this.serviceService.getListUsers().subscribe(data => this.students = data);
	}	

	onSubmit(formUser: NgForm) {
		let count1 = 0;
		let count2 = 0;
		let count3 = 0;

		for (var i = 0; i < this.students.length; i++) {
			if (this.students[i].username == formUser.value.username) {
				count1++;
			}
		}
		for (var i = 0; i < this.listUsers.length; i++) {
			if (this.listUsers[i].username == formUser.value.username) {
				count2++;
			}
		}
		for (var i = 0; i < this.studentLocal.length; i++) {
			if (this.studentLocal[i].username == formUser.value.username) {
				count3++;
			}
		}

		if (count1 == 0 && count2 == 0 && count3 == 0) {
			this._submit = true;
			this.listUsers.push({
				id: this.id++,
				username: this.username,
				password: this.password,
				fullname: this.fullname,
				email: this.email,
				gender: this.gender,
				birthday: this.birthday,
				schoolfee: this.schoolfee,
				marks: this.marks
			});
			this.serviceService.addStudent(
				this.username, this.password, this.fullname, this.email,
				this.gender, this.birthday, this.schoolfee, this.marks
			);
		}
		else {
			alert('Tên Đăng Nhập Đã Tồn Tại')
		}
	}

	onSM(formUser: NgForm) {
		if (formUser.value.repass !== formUser.value.password) {
			alert('Mật Khẩu Phải Giống Nhau')
			return false;
		}
	}

	onReset(formUser: NgForm) {
		formUser.reset();
	}

	Back() {
		window.history.back();
	}

}