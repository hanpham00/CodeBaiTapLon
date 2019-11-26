import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { Subject } from '../models/subject';

@Component({
	selector: 'app-danhmucmonhoc',
	templateUrl: './danhmucmonhoc.component.html',
	styleUrls: ['./danhmucmonhoc.component.css']
})
export class DanhmucmonhocComponent implements OnInit {
	subjects: Subject[];
	
	login = [];
	showQuiz = true;
	page = 1;
    rowonpage = 4;
    
	
	constructor(
		private service: ServiceService
	) { }

	ngOnInit() {
		this.getSubject();
		
	}

	getSubject() {
		this.service.getListSubjects().subscribe(data => this.subjects = data);
		console.log(this.subjects);
	}
	
	resetQuiz() {
		this.page == 1;
	}

	checkTest() {
		let arr = JSON.parse(localStorage.getItem('Login'));
		if (arr === null) {
			alert("Vui Lòng Đăng Nhập Tài Khoản Của Bạn Để Làm Bài Thi");	
		}
	} 

	checkTT() {
		let arr = JSON.parse(localStorage.getItem('Login'));
		if (arr === null) {
			alert("Vui Lòng Đăng Nhập Tài Khoản Của Bạn Để Làm Bài Thi");	
		}
	
	}
	nextPage() {
        if (this.subjects.length / this.rowonpage > this.page)
            this.page++;
    }
    prePage() {
        if (this.page > 1)
            this.page--;
    }
}