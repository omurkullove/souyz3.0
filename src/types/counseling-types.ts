export type CounselingType = 'public_reception' | 'counseling' | 'low_center';

export interface IPublicReceptionRequest {
    type: CounselingType;
    name: string;
    description: string;
    client_email: string;
    phone: string;
    attachments: any[];
}

export interface ILegalCenterRequest {
    type: CounselingType;
    name: string;
    client_email: string;
    phone: string;
}
