import { Delivery } from './delivery';
import { StorageAgreement } from './storageagreement';

export class Company {
    public constructor (
    public id: number,
    public name: string,
    public url: string,
    public street_1: string,
    public zip_code: string,
    public city: string,
    public created_at: Date,
    public street_2?: string,
    public state?: string,
    public website?: string,
    public phone?: string,
    public fax?: string,
    public email?: string,
    public registration_provider?: string,
    public registration_id?: string,
    public invoice_prefix?: string,
    public vat_id?: string,
    public approver?: string,
    public approval_transaction_id?: string,
    public approval_at?: Date,
    public creator_id?: number,
    public creation_transaction_id?: string,
    public updated_at?: Date,
    public storageAgreements?: StorageAgreement[],
    public deliveries?: Delivery[]
    ) { }

    public static assign(o: any): Company {
    const u = new Company (
          o.id,
          o.name,
          o.url,
          o.street_1,
          o.zip_code,
          o.city,
          new Date(Date.parse(o.created_at)),
          o.street_2,
          o.state,
          o.website,
          o.phone,
          o.fax,
          o.email,
          o.registration_provider,
          o.registration_id,
          o.invoice_prefix,
          o.vat_id,
          o.approver,
          o.approval_transaction_id,
          o.approval_at,
          o.creator_id,
          o.creation_transaction_id,
          new Date(Date.parse(o.updated_at)));

    return u;
    }

    public setStorageAgreements(sas: StorageAgreement[]) {
      this.storageAgreements = sas;
    }

    public setDeliveries(dels: Delivery[]) {
      this.deliveries = dels;
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
      ' storageAgreements:' + ((this.storageAgreements == null) ? '<null>' : this.storageAgreements.toString()) +
      ' deliveries:' + ((this.deliveries == null) ? '<null>' : this.deliveries.toString()) +

      ' ) ';
    }

}
