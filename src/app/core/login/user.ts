

export class User {
public id: number;
public uid: string;
public email: string;
public name: string;
public allow_password_change: boolean;
public nickname?: string;
public provider?: string;
public image?: Uint8Array[];

public static assign(o: any): User {
  const u = new User();
  u.id =  o.data.id;
  u.uid = o.data.uid;
  u.email = o.data.email;
  u.name = o.data.name;
  u.allow_password_change = o.data.allow_password_change;
  u.nickname = o.data.nickname;
  u.provider = o.data.provider;
  u.image = o.data.image;
  return u;
  }
}
