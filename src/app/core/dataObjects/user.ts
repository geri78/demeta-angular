

export class User {
  public constructor (
  public id: number,
  public uid: string,
  public company_id: number,
  public email: string,
  public name: string,
  public allow_password_change: boolean,
  public created_at?: Date,
  public updated_at?: Date,
  public nickname?: string,
  public provider?: string,
  public image?: Uint8Array[]) { }


  public static assign(o: any): User {
    const u = new User(
        o.id,
        o.uid,
        o.company_id,
        o.email,
        o.name,
        o.allow_password_change,
        new Date(Date.parse(o.created_at)),
        new Date(Date.parse(o.updated_at)),
        o.nickname,
        o.provider,
        o.image);

    return u;
    }

  public toString(): string {
    return  'user( id:' + this.id +
            ' uid:' + this.uid +
            ' company_id:' + this.company_id +
            ' email:' + this.email +
            ' name:' + this.name +
            ' allow_password_change:' + this.allow_password_change +
            ' created_at:' + this.created_at +
            ' updated_at:' + this.updated_at +
            ' nickname:' + this.nickname +
            ' provider:' + this.provider +
            ' image:' + this.image +
            ') ';
  }
}
