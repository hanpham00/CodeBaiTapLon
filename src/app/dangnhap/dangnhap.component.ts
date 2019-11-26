import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Student } from '../models/student';
import { FormGroup, Validators, NgForm } from '@angular/forms';
import { ServiceService } from '../services/service.service';

@Component({
	selector: 'app-dangnhap',
	templateUrl: './dangnhap.component.html',
	styleUrls: ['./dangnhap.component.css']
})
export class DangnhapComponent implements OnInit {
	students: Student[];
	studentLocal = [];
	userLocal = [];
	listDataLocal = [];
	login = [];
	_submit = false;
	Checkbox = false;
	username = "binhdang";
	password = "Binhdang1808";

	constructor(
		private service: ServiceService
	) { }

	ngOnInit() {
		this.getUsers();
		this.userLocal = JSON.parse(localStorage.getItem('users'));
		this.studentLocal = JSON.parse(localStorage.getItem('students'));		
		this.listDataLocal = this.studentLocal.concat(this.userLocal);
	}
	getUsers() {
		this.service.getListUsers().subscribe(data => this.students = data);
	}
 
	onSubmit(formUser: NgForm) {
		let count = 0;
		if (formUser.valid) {
			this._submit = true;
			for (var i = 0; i < this.listDataLocal.length; i++) {
				if (this.listDataLocal[i].username == formUser.value.username &&
					this.listDataLocal[i].password == formUser.value.password) {
					this.login.push(this.listDataLocal[i]);				
					count++;
				}
			}
			if (count == 0) {
				alert("Thông Tin Không Chính Xác")
			} else {
				localStorage.setItem("Login", JSON.stringify(this.login));
				window.location.replace("");
			}
		}
		else if (count == 0 && formUser.dirty) {
			alert("Thông Tin Không Chính Xác")
		}
		else {
			alert("Vui Lòng Nhập Thông Tin")
		}
	}
	checkIn() {
		let arr = JSON.parse(localStorage.getItem('Login'))
		if(arr !== null){
			alert("Vui Lòng Đăng Xuất Tài Khoản")
			return false;	
		}
	}
}