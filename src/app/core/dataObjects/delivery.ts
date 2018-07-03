/*
approver_id:2
commodity_id:1
counterparty_id:2
created_at:"2018-07-01T19:41:36.929Z"
creator_id:1
elevator_id:1
gross_weight:"8000.0"
id:1
net_weight:"7000.0"
principal_id:1
product_id:1
storage_agreement_id:1
tare_weight:"1000.0"
weight_note_identifier:"123333"
weight_note_image:"https://demeta-staging.s3.eu-west-1.amazonaws.com/LcZM3sdLXhirqHxgE3CtAQn7?response-content-disposition=inline%3B%20
  filename%3D%22c6befd91-d93d-4f5e-bdd9-0b2937757627.jpeg%22%3B%20filename%2A%3DUTF-8%27%27c6befd91-d93d-4f5e-bdd9-0b2937757627.jpeg&
  response-content-type=image%2Fjpeg&
  X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJWWZVYZQV5VCLYVQ%2F20180703%2Feu-west-1%2Fs3%2Faws4_request&
  X-Amz-Date=20180703T183655Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&
  X-Amz-Signature=f7c06e6a995fe5f81433dee70e65ec7d53b82342e97b524364d30e3ce8c1651e"
weight_unit:"kg"
approval_at:null
approval_transaction_id:null
creation_transaction_id:null
test_results:null
updated_at:"2018-07-01T19:41:38.351Z"
*/

export class Delivery {

  public constructor(
    public approver_id: number,
    public commodity_id: number,
    public counterparty_id: number,
    public created_at: Date,
    public creator_id: number,
    public elevator_id: number,
    public gross_weight: number,
    public id: number,
    public net_weight: number,
    public principal_id: number,
    public product_id: number,
    public storage_agreement_id: number,
    public tare_weight: number,
    public weight_note_identifier: number,
    public weight_note_image: string,
    public weight_unit: string,
    public updated_at?: Date,
    public approval_at?: Date,
    public approval_transaction_id?: string,
    public creation_transaction_id?: string,
    public test_results?: string
                  ) { }

  public static assign(o: any): Delivery {

    const p = new Delivery(
      o.approver_id,
      o.commodity_id,
      o.counterparty_id,
      new Date(Date.parse(o.created_at)),
      o.creator_id,
      o.elevator_id,
      o.gross_weight,
      o.id,
      o.net_weight,
      o.principal_id,
      o.product_id,
      o.storage_agreement_id,
      o.tare_weight,
      o.weight_note_identifier,
      o.weight_note_image,
      o.weight_unit /*,
      ((o.updated_at == null) ? null : new Date(Date.parse(o.updated_at))),
      ((o.approval_at == null) ? null : new Date(Date.parse(o.approval_at))),
      o.approval_transaction_id,
      o.creation_transaction_id,
    o.test_results*/);

    return p;
  }

  public toString(): string {
    return ' { ' +
    ' approver_id:' + this.approver_id +
    ' commodity_id:' + this.commodity_id +
    ' counterparty_id:' + this.counterparty_id +
    ' created_at:' + this.created_at +
    ' creator_id:' + this.creator_id +
    ' elevator_id:' + this.elevator_id +
    ' gross_weight:' + this.gross_weight +
    ' id:' + this.id +
    ' net_weight:' + this.net_weight +
    ' principal_id:' + this.principal_id +
    ' product_id:' + this.product_id +
    ' storage_agreement_id:' + this.storage_agreement_id +
    ' tare_weight:' + this.tare_weight +
    ' weight_note_identifier:' + this.weight_note_identifier +
    ' weight_note_image:' + this.weight_note_image +
    ' weight_unit:' + this.weight_unit +
    ' updated_at:' + ((this.updated_at   == null) ? '<null>' : this.updated_at.toString()) +
    ' approval_at:' + ((this.approval_at   == null) ? '<null>' : this.approval_at.toString()) +
    ' approval_transaction_id:' + this.approval_transaction_id +
    ' creation_transaction_id:' + this.creation_transaction_id +
    ' test_results:' + this.test_results +
    ' } ';
  }


}
