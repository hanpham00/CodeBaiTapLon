import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student } from '../models/student';


@Component({
	selector: 'app-doimatkhau',
	templateUrl: './doimatkhau.component.html',
	styleUrls: ['./doimatkhau.component.css']
})
export class DoimatkhauComponent implements OnInit {
	students: Student[];
	selectStudent: Student;
	userLocal = [];
	studentLocal = [];
	userlogin = [];
	resetData = [];
	newpass =  "";
	repass =  "";

	fmEdit = {
		id: null,
		username: "",
		password: "",
		fullname: "",
		email: "",
		gender: "",
		birthday: "",
		schoolfee: null,
		marks: 0
	};

	lstUser = [{ "name": "teonv" }, { "name": "pheonv" }, { "name": "nopt" }];

	StudentById = -1;
	check = false;
	showEdit = false;
	isshow = false;
	show = false;

	constructor(
		private serviceService: ServiceService
	) { }

	ngOnInit() {
		this.userLocal = JSON.parse(localStorage.getItem('users'));
		this.studentLocal = JSON.parse(localStorage.getItem('students'));
		this.userlogin = JSON.parse(localStorage.getItem('Login'));
		this.showButtonEdit();
	}

	onSelectST(student: Student) {
		this.selectStudent = student;
	}

	onSelectUS(student: Student) {
		this.isshow = !this.isshow;
		this.fmEdit = {
			id: student.id,
			username: student.username, password: student.password,
			fullname: student.fullname, email: student.email,
			gender: student.gender, birthday: student.birthday,
			schoolfee: student.schoolfee, marks: student.marks
		};
		this.StudentById = this.fmEdit.id;
	}

	onEdit(student: Student) {
		this.serviceService.onEditStudent(
			student.id, student.username, student.password,
			student.fullname, student.email, student.gender,
			student.birthday, student.schoolfee, student.marks
		);
	}


	saveUserLocal(id: number) {
		if (this.newpass == this.repass) {
			let index = this.userlogin.indexOf(this.userlogin.find(us => us.id === id));
			this.userlogin[index] = Object.assign(this.fmEdit);
			this.fmEdit.password = this.newpass;
			localStorage.setItem("Login", JSON.stringify(this.userlogin));

			this.resetData = this.userLocal.filter(s => s.id !== id);
			localStorage.setItem("users", JSON.stringify(this.userlogin.concat(this.resetData)));
			this.isshow = false;
			alert("Cập Nhật Mật Khẩu Thành Công !!!");
		}else{
			alert('Cập Nhật Thất Bại !!! Mật Khẩu Phải Giống Nhau');
			return false;
		}

	}

	showButtonEdit() {
		let count = 0;
		if (this.userlogin !== null) {
			for (var i = 0; i < this.userlogin.length; i++) {
				for (var j = 0; j < this.lstUser.length; j++) {
					if (this.userlogin[i].username == this.lstUser[j].name) {
						count++;
					}
				}
			}
		}
		if (count == 0) {
			this.showEdit = true;
		} else {
			this.showEdit = false;
		}
	}
}