import { Contact } from './contact';

export class SaveVehicle {
    id: number;
    makeId: number;
    modelId: number;
    registered: boolean;
    featureIds: number[];
    contact: Contact;

    constructor() {
        this.contact = new Contact();
    }
}

