
export class Company {
    public id: number;
    public name: string;
    public street_1: string;
    public street_2?: string;
    public zip_code: string;
    public city: string;
    public state?: string;
    public website?: string;
    public phone?: string;
    public fax?: string;
    public email?: string;
    public registration_provider?: string;
    public registration_id?: string;
    public invoice_prefix?: string;
    public vat_id?: string;
    public approver?: string;
    public approval_transaction_id?: string;
    public approval_at?: Date;
    public creator_id?: number;
    public creation_transaction_id?: string;
    public created_at: Date;
    public updated_at?: Date;
    public url: string;

    public static assign(o: any): Company {
    const u = new Company();
    u.id =  o.id;
    u.creator_id = o.creator_id;
    u.approver = o.approver;
    u.name = o.name;
    u.street_1 = o.street_1;
    u.street_2 = o.street_2;
    u.created_at = new Date(Date.parse(o.created_at));
    u.updated_at = new Date(Date.parse(o.updated_at));
    u.url = o.url;
    u.zip_code = o.zip_code;
    u.city = o.city;
    u.state = o.state;
    u.website = o.website;
    u.phone = o.phone;
    u.fax = o.fax;
    u.email = o.email;
    u.registration_provider = o.registration_provider;
    u.registration_id = o.registration_id;
    u.invoice_prefix = o.invoice_prefix;
    u.vat_id = o.vat_id;
    u.approval_transaction_id = o.approval_transaction_id;
    u.approval_at = o.approval_at;
    u.creation_transaction_id = o.creation_transaction_id;

    return u;
    }

    public toString(): string {
      return  'company( id:' + this.id +
      ' creator_id:' + this.creator_id +
      ' approver_id:' + this.approver +
      ' name:' + this.name +
      ' street_1:' + this.street_1 +
      ' street_2:' + this.street_2 +
      ' created_at:' + this.created_at +
      ' updated_at:' + this.updated_at +
      ' url:' + this.url +
      ' zip_code:' + this.zip_code +
      ' city:' + this.city +
      ' state:' + this.state +
      ' website:' + this.website +
      ' phone:' + this.phone +
      ' fax:' + this.fax +
      ' email:' + this.email +
      ' registration_provider:' + this.registration_provider +
      ' registration_id:' + this.registration_id +
      ' invoice_prefix:' + this.invoice_prefix +
      ' vat_id:' + this.vat_id +
      ' approval_transaction_id:' + this.approval_transaction_id +
      ' approval_at:' + this.approval_at +
      ' creation_transaction_id:' + this.creation_transaction_id +
      ' ) ';
    }

}
