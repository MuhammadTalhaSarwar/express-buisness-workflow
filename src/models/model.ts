export class Business {
    fein: string;
    name: string;
    industry: string | null;
    contact: { name: string; phone: string } | null;
    status: string;

    constructor(fein: string, name: string, industry: string | null = null, contact: { name: string; phone: string } | null = null, status: string = 'New') {
        this.fein = fein;
        this.name = name;
        this.industry = industry;
        this.contact = contact;
        this.status = status;
    }
}

export const businesses: Business[] = [];
