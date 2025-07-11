export type CounselingType = "public_reception" | "counseling";

export interface IPublicReceptionRequest {
	type: CounselingType;
	name: string;
	description: string;
	client_email: string;
	phone: string;
	attachments: any[];
}
