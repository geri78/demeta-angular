

export class Company {
  public id: number;
  public creator_id: number;
  public approver_id: number;
  public name: string;
  public street_1: string;
  public street_2: string;
  public created_at: Date; // "2018-06-14T13:37:37.987Z",
  public updated_at: Date;
  public url: string;

  public static assign(o: any): Company {
    const u = new Company();
    u.id =  o.id;
    u.creator_id = o.creator_id;
    u.approver_id = o.approver_id;
    u.name = o.name;
    u.street_1 = o.street_1;
    u.street_2 = o.street_2;
    u.created_at = new Date(Date.parse(o.created_at));
    u.updated_at = new Date(Date.parse(o.updated_at));
    u.url = o.url;
    return u;
    }

    public toString(): string {
      return  'company( id:' + this.id +
      ' creator_id:' + this.creator_id +
      ' approver_id:' + this.approver_id +
      ' name:' + this.name +
      ' street_1:' + this.street_1 +
      ' street_2:' + this.street_2 +
      ' created_at:' + this.created_at +
      ' updated_at:' + this.updated_at +
      ' url:' + this.url +
      ' ) ';
    }

}
