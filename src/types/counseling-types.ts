export type CounselingType = 'public_reception' | 'counseling' | 'low_center';

export interface IPublicReceptionRequest {
    type: 'public_reception';
    name: string;
    description: string;
    client_email: string;
    phone: string;
    attachments: any[];
}
