import { Component, OnInit } from '@angular/core';
import { ServiceService } from './services/service.service';
import { Student } from './models/student';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'baitapcoiky';

  students: Student[];

  constructor(
		private studentService: ServiceService
	) { }

	ngOnInit() {
		this.studentService.loadLocalStorage();
		this.studentService.updateLocalStorage();
		this.studentService.getListUsers().subscribe(data => {
			this.students = data;
			localStorage.setItem("users", JSON.stringify(this.students));
		});
	}
}