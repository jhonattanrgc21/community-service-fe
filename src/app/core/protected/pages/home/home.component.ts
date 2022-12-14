import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { Task } from '../tasks/interfaces/tasks.iterface';
import { EditTaskComponent } from '../tasks/pages/edit-task/edit-task.component';
import { RegisteredProject } from './interfaces/home.interface';
import { HomeService } from './services/home.service';
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	// Listas de tareas
	tasksList: Task[] = [];

	// Listas de headers
	headersList: string[] = [];

	cardInfo!: RegisteredProject;
	hours: number = 0;

	pendingHours: number = 0;

	constructor(private _homeService: HomeService, private _authService: AuthService ,public dialog: MatDialog) {}

	get isStudentGraduated(): boolean{
		return this._authService.isGraduated;
	}

	ngOnInit(): void {
		this.loadData();
	}

	loadData(): void {
		this._homeService
			.getInfoProject()
			.subscribe((res: RegisteredProject) => {
				this.cardInfo = res;
				this.hours = this.cardInfo.hours
					? this.cardInfo.hours
					: 0;
				this.tasksList = res.task_list;

				this.pendingHours = 120 - this.cardInfo.hours;

				if (this.pendingHours < 0) {
					this.pendingHours = 0;
				}

				this.headersList = [
					'Nombre',
					'Descripción',
					'C.I tutor',
					'Nombre del tutor',
					'Fecha de inicio',
					'Fecha de finalización',
					'Horas',
					'Estatus',
				];
			});
	}

	editTask(task: any): void {
		const dialogRef = this.dialog.open(EditTaskComponent, {
			width: '25%',
			data: task,
		});

		dialogRef.afterClosed().subscribe((isRefresh) => {
			if (isRefresh) {
				this.loadData();
			}
		});
	}
}
