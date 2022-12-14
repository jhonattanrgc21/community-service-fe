import { SelectionModel } from '@angular/cdk/collections';
import {
	AfterViewInit,
	Component,
	OnInit,
	ViewChild,
	Input,
	Output,
	EventEmitter,
	ChangeDetectorRef,
	ChangeDetectionStrategy,
	SimpleChanges,
	OnChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {ExportTable} from './exportTable'
import { ChangeStatus } from 'src/app/core/protected/interfaces/users.interface';

@Component({
	selector: 'app-dynamic-table',
	templateUrl: './dynamic-table.component.html',
	styleUrls: ['./dynamic-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicTableComponent implements OnInit, AfterViewInit, OnChanges {
	// Valores de entrada
	@Input('headers') tableHeaders: string[] = [];
	@Input('data') tableData!: any[];
	@Input('filter') isFilter?: boolean = false;
	@Input('select') isSelect?: boolean = true;
	@Input('edit') isEdit?: boolean = true;
	@Input('isUser') isUser?: boolean = false;
	@Input('isRegister') isRegister?: boolean = false;
	@Input('statuses') statuses?: string[] = [];
	@Input('typeTable') typeTable?: string = '';
	@Input('messageConfirmButton') messageConfirmButton?: string = 'Confirmar';

	@Output() confirmedSelection = new EventEmitter<any[]>();
	@Output() confirmedChangeStatus = new EventEmitter<ChangeStatus>();
	@Output() editRow = new EventEmitter<any>();

	@ViewChild(MatSort) sort!: MatSort;

	// Paginador
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	// Variables para manipular datos de a tabla
	tableCols: any[] = [];
	dataSource = new MatTableDataSource<any>();
	selection = new SelectionModel<any>(true, []);

	generalForm: FormGroup = this._fb.group({
		status: ['', [Validators.required]],
	});

	constructor(private _fb: FormBuilder, private cd: ChangeDetectorRef) {}

	ngOnInit(): void {
		this.dataSource.data = this.tableData;
		this.tableCols =
			this.tableData && this.tableData.length > 0
				? Object.keys(this.tableData[0])
				: [];

		if (this.isSelect) {
			if (!this.tableCols.includes('select')) {
				this.tableCols.unshift('select');
			}
		}

		if (this.isEdit) {
			this.tableCols.push('edit');
		}

		// Eliminando columnas innecesarios
		this.removeAtributes(this.tableCols, 'id');
		this.removeAtributes(this.tableCols, 'project_id');
		this.removeAtributes(this.tableCols, 'role');

		if (!this.isRegister) {
			this.removeAtributes(this.tableCols, 'email');
			this.removeAtributes(this.tableCols, 'phone');
		}
		if (this.isUser) {
			this.removeAtributes(this.tableCols, 'status');
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.generalForm.reset();
		this.selection.clear();
		this.isSelect = this.isSelect;
		if (this.isSelect) {
			if (!this.tableCols.includes('select')) {
				this.tableHeaders = [' ', ...this.tableHeaders];
				this.tableCols.unshift('select');
			}
		} else {
			this.removeAtributes(this.tableHeaders, ' ');
			this.removeAtributes(this.tableCols, 'select');
		}
		this.dataSource.data = this.tableData;
		this.cd.markForCheck();
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	removeAtributes(array: any, value: string): void {
		const posId = array.indexOf(value);
		if (posId != -1) {
			array.splice(posId, 1);
		}
	}

	/** Whether the number of selected elements matches the total number of rows. */
	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	toggleAllRows() {
		if (this.isAllSelected()) {
			this.selection.clear();
			return;
		}

		this.selection.select(...this.dataSource.data);
	}

	/** The label for the checkbox on the passed row */
	checkboxLabel(row?: any): string {
		if (!row) {
			return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
			row.position + 1
		}`;
	}

	viewConfirmButton(): boolean {
		return this.selection.selected.length > 0;
	}

	onConfirmSelection(): void {
		this.confirmedSelection.emit(this.selection.selected);
	}

	onConfirmChangeStatus(): void {
		const changeStatus: ChangeStatus = {
			identifications: this.selection.selected.map((item) => item.id),
			status: this.generalForm.controls['status'].value,
		};
		this.confirmedChangeStatus.emit(changeStatus);
	}

	/**
	 * @description Verifica si el formulario no es valido
	 * @param field
	 * @returns boolean
	 */
	isNotValid(field: string): boolean {
		return (
			this.generalForm.controls[field].invalid &&
			this.generalForm.controls[field].touched
		);
	}

	onEdit(row: any): void {
		this.editRow.emit(row);
	}

	exportExcel(): void {
		ExportTable.exportTableToExcel('exportToExcel');
	}
}
