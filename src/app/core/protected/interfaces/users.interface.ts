import { GeneralProfile } from "../pages/profile/interfaces/profile.interface";

export interface NewUser extends Omit<GeneralProfile, 'username' | 'id'> {
	role: string;
}
