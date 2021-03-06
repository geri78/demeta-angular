import { User } from './user';
import { Commodity } from './commodity';
/*
 {
"id": 1,
"principal_id": 1,
"counterparty_id": 2,
"commodity": {
"id": 1,
"name": "Weizen",
"unique": null,
"description": null,
"created_at": "2018-07-01T19:41:36.640Z",
"updated_at": "2018-07-01T19:41:36.640Z"
},
"storage_charge": "3.2",
"price_unit": "EUR",
"weight_unit": "T",
"loading_charge": "3.0",
"unloading_charge": "2.0",
"reduction": "0.03",
"expires_on": "2018-12-01T19:41:36.757Z",
"signed_on": "2018-07-01T19:41:36.757Z",
"signer": {
"id": 2,
"provider": "email",
"uid": "andreas.hieger@hieger.cc",
"allow_password_change": false,
"nickname": null,
"image": null,
"email": "andreas.hieger@hieger.cc",
"created_at": "2018-07-01T19:41:36.578Z",
"updated_at": "2018-07-01T19:41:36.578Z",
"company_id": 2,
"first_name": "Andreas",
"last_name": "Hieger",
"phone": null,
"mobile": null
},
"signing_transaction_id": null,
"creator": {
"id": 1,
"provider": "email",
"uid": "hannes@stiebitzhofer.com",
"allow_password_change": false,
"nickname": null,
"image": null,
"email": "hannes@stiebitzhofer.com",
"created_at": "2018-07-01T19:41:36.572Z",
"updated_at": "2018-07-02T15:35:22.735Z",
"company_id": 1,
"first_name": "Hannes",
"last_name": "Stiebitzhofer",
"phone": null,
"mobile": null
},
"creation_transaction_id": null,
"created_at": "2018-07-01T19:41:36.811Z",
"updated_at": "2018-07-01T19:41:36.811Z"
},

*/

export class StorageAgreement {
public constructor (
  public id: number,
  public principal_id: number,
  public counterparty_id: number,
  public commodity_id: number,
  public storage_charge: number,
  public price_unit: string,
  public weight_unit: string,
  public loading_charge: number,
  public unloading_charge: number,
  public reduction: number,
  public expires_on: Date,
  public signed_on: Date,
  public signer_id: number,
  public creator_id: number,
  public created_at: Date,
  public updated_at?: Date,
  public creation_transaction_id?: string,
  public signing_transaction_id?: string
) { }

public static assign (o: any): StorageAgreement {
/*  const com = new Commodity (o.commodity.id, o.commodity.name, o.commodity.created_at, o.commodity.updated_at, o.commodity.unique,
                            o.commodity.description);
  const signer = new User( o.signer.id,
    o.signer.uid,
    o.signer.company_id,
    o.signer.email,
    o.signer.name,
    o.signer.allow_password_change,
    o.signer.nickname,
    o.signer.provider,
    o.signer.image);
    const creator = new User( o.creator.id,
      o.creator.uid,
      o.creator.company_id,
      o.creator.email,
      o.creator.name,
      o.creator.allow_password_change,
      o.creator.nickname,
      o.creator.provider,
      o.creator.image);
*/
    const sa = new StorageAgreement(o.id, o.principal_id, o.counterparty_id, o.commodity_id, o.storage_charge, o.price_unit,
              o.weight_unit, o.loading_charge, o.unloading_charge,   o.reduction, o.expires_on, o.signed_on, o.signer_id,
            o.creator_id, new Date(Date.parse(o.created_at)), new Date(Date.parse(o.updated_at)), o.creation_transaction_id,
            o.signing_transaction_id );
  return sa;
}
// TODO: additional fields....
public toString() {
  return '{ ' +
  ' id:' + this.id +
  ' principal_id:' + this.principal_id +
  ' counterparty_id:' + this.counterparty_id +
  ' commodity_id:' + this.commodity_id +
  ' storage_charge:' + this.storage_charge +
  ' price_unit:' + this.price_unit +
  ' weight_unit:' + this.weight_unit +
  ' loading_charge:'  + this.loading_charge +
  ' unloading_charge:' + this.unloading_charge +
  ' reduction:' + this.reduction +
  ' expires_on:' + this.expires_on +
  ' signed_on:' + this.signed_on +
  ' signer_id:' + this.signer_id +
  ' creator_id:' + this.created_at +
  ' created_at:' + this.created_at +
  ' updated_at:' + this.updated_at +
  ' creation_transaction_id:' + this.creation_transaction_id +
  ' signing_transaction_id:' + this.signing_transaction_id +
  ' }';
}
}
