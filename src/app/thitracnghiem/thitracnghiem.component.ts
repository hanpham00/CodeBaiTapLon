import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, ParamMap } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { Quizs } from '../models/quizs';
import { Subject } from '../models/subject';
import { FormBuilder, FormGroup, FormControl, NgForm } from '@angular/forms';


@Component({
	selector: 'app-thitracnghiem',
	templateUrl: './thitracnghiem.component.html',
	styleUrls: ['./thitracnghiem.component.css']
})
export class ThitracnghiemComponent implements OnInit {
	quizs: Quizs[] = [];
	subjects: Subject[] = [];
	answers = [];
	subject: any = [];
	selectSubject: Subject;
	point = 0;
	page = 1;
	rowpage = 1;

	showTime = true;
	counter = 0;
	setSecond = 2700;
	interval = null;
	onShowPage = false;
	resultPoint = false;

	constructor(
		private service: ServiceService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.getSubject();
		this.getQuiz();
		this.changeTest();
	}

	convertTime(s) {
		var timer = document.getElementById('timer');
		var min = Math.floor(s / 60);
		var sec = s % 60;
		var minute = (min < 10) ? "0" + min : min;
		var sencond = (sec < 10) ? "0" + sec : sec;
		return minute + "'" + ':' + sencond;
	}

	startTime() {
		this.onShowPage = true;
		clearInterval(this.interval);
		var timer = document.getElementById('timer');
		timer.innerHTML = this.convertTime(this.setSecond - this.counter);
		this.interval = setInterval(() => {
			this.counter++;
			timer.innerHTML = this.convertTime(this.setSecond - this.counter);
			if ((this.setSecond - this.counter) <= 0) {
				clearInterval(this.interval);
				this.setSecond = 2700;
				this.counter = 0;
				timer.innerHTML = "Hết Thời Gian Làm Bài";
			}
		}, 1000);
	}

	endTime() {
		this.resultPoint = false;
		clearInterval(this.interval);
		document.getElementById('timer-2').innerHTML = this.convertTime(this.counter);
		document.getElementById('result').style.display = 'block';
		document.getElementById('training').style.display = 'none';
	}

	resetTime() {
		clearInterval(this.interval);
		document.getElementById('timer').innerHTML = "45':00";
		this.setSecond = 2700;
		this.counter = 0;
		this.answers = [];
	}

	pointTest() {
		var sum = 0;
		for (var i = 0; i < this.quizs.length; i++) {
			if (this.answers[i] == this.quizs[i].AnswerId) {
				sum += this.quizs[i].Marks;
				this.point = sum;
			}
		}
	}

	changeTest() {
		const mId = this.route.snapshot.paramMap.get('mId');
		this.service.getListSubjects().subscribe(data => {
			this.subject = data.find(s => s.Id === mId);
		});
	}

	onSelectSubject(subject: Subject) {
		this.selectSubject = subject;
	}

	getSubject() {
		this.service.getListSubjects().subscribe(data => this.subjects = data)
	}

	getQuiz() {
		this.route.paramMap.subscribe(para => {
			const id = para.get('mId');
			this.service.getListQuizs(id).subscribe(data => this.quizs = data)
		});
	}

	Back() {
		window.history.back();
	}

	prePage() {
		if (this.page > 1) {
			this.page--;
		}
	}

	nextPage() {
		if (this.quizs.length / this.rowpage > this.page) {
			this.page++;
		}
	}

	firstPage() {
		this.page = 1;
	}

	lastPage() {
		this.page = this.quizs.length;
	}

	totalM() {
		return this.quizs.length;
	}

	newPage(subject: Subject) {
		var id;
		this.onShowPage = false;
		document.getElementById('training').style.display = 'block';
		document.getElementById('result').style.display = 'none';
		this.route.paramMap.subscribe(para => id = para.get('mId'));
		if (subject.Id !== id) {
			this.page = 1;
			this.point = 0;
			this.answers = [];
			alert('Bạn Muốn Làm Bài Trắc Nghiệm Môn Khác');
		} else {
			alert('Bạn Đang Làm Bài Trắc Nghiệm Môn Này');
		}
	}
} 

