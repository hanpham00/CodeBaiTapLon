import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Student } from '../models/student';
import { FormGroup, NgForm } from '@angular/forms';
import { ServiceService } from '../services/service.service';
@Component({
	selector: 'app-editpassword',
	templateUrl: './editpassword.component.html',
	styleUrls: ['./editpassword.component.css']
})
export class EditpasswordComponent implements OnInit {
	@Input() student: Student;
	@Output() editStudent: EventEmitter<Student> = new EventEmitter<Student>();
	check = false;
	userlogin = [];
	_submit = false;
	formEdit = {
		newpass: "",
		repass: ""
	}

	constructor() { }

	ngOnInit() {

	}

	submitEdit(formStudent: NgForm) {
		this._submit = true;
		if (this.formEdit.newpass !== this.formEdit.repass) {
			alert('Cập Nhật Thất Bại !!! Mật Khẩu Phải Giống Nhau');
			return false;
		} else {
			this.student.password = this.formEdit.newpass;
			this.editStudent.emit(this.student);
			alert('Cập Nhật Mật Khẩu Thành Công');
		}
	}

}
