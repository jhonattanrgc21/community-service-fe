export const Careers = [
	{ id: 1, name: 'Computación' },
	{ id: 2, name: 'Física' },
	{ id: 3, name: 'Química'},
	{ id: 4, name: 'Matemática' },
	{ id: 5, name: 'Biología' },
];

export const StatusProject: string[] = ['Activo', 'Inactivo'];

export const StatusUser: string[] = ['Activo', 'Inactivo', 'Aprobado', 'Graduado']

export const Nationalities: string[] = ['V', 'E'];

export const TaskStatuses: string[] = ['Pendiente', 'En progreso', 'Completada', 'Inactiva'];

export const emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

export const ROUTES = {
	login: '/auth',
	dashboard: '/layout',
	notFound: '/layout/404-notFound',
	students: '/layout/students',
	tutors: '/layout/tutors',
	profile: '/layout/profile',
	newStudents: '/layout/students/new-student',
	newProjects: '/layout/projects/new-project',
	activeProject: '/layout/projects/actives',
	inactiveProject: '/layout/projects/inactives',
	activeProjectDetails: '/layout/projects/actives',
	inactiveProjectDetails: '/layout/projects/inactives',
};

export const ROLES = {
	student: 'student',
	tutor: 'tutor',
	coordinator: 'coordinator'
}

export const ACCESS_ROLES = {
	home: [ROLES.student],
	profile: [ROLES.student, ROLES.tutor, ROLES.coordinator],
	students: [ROLES.tutor, ROLES.coordinator],
	newProject: [ROLES.coordinator],
	newStudent: [ROLES.coordinator],
	activeProjects: [ROLES.student, ROLES.tutor, ROLES.coordinator],
	inactiveProjects: [ROLES.coordinator],
	tasks: [ROLES.student, ROLES.tutor],
	tutors: [ROLES.tutor, ROLES.coordinator],
	graduates: [ROLES.coordinator],
};
