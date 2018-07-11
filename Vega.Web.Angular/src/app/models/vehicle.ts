import { Contact } from './contact';
import { KeyValue } from './keyvalue';

export class Vehicle {
    id: number;
    make: KeyValue;
    model: KeyValue;
    registered: boolean;
    features: KeyValue[];
    contact: Contact;
    lastUpdated: Date;

    constructor() {
        this.contact = new Contact();
    }
}

