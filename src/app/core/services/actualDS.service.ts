import { User } from '../dataObjects/user';
import { Web3WrapperService  } from './web3wrapper.service';


export class ActualDSService {
private static s_actDS: ActualDSService = null;

private _actUser: User = null;
private _web3wrap: Web3WrapperService = null;

// ----------------------------------------------------------
//   public user functions
//
// ----------------------------------------------------------
//  used to get an instance to the actual data objects ( user, person, company, roles, ...)
//
public static getInstance(): ActualDSService {
    if (ActualDSService.s_actDS == null) {
      ActualDSService.s_actDS = new ActualDSService();
    }
    return ActualDSService.s_actDS;
}

// ----------------------------------------------------------
// get the logged in user data
//
public getUser(): User {
  return this._actUser;
}

public getWeb3Wrapper() {
  return this._web3wrap;
}


// ----------------------------------------------------------
//   non public functions to fill the ActualDSService


private constructor() {
}

public setUser(u: User) {
  this._actUser = u;
}

public setWeb3Wrapper( w: Web3WrapperService) {
  this._web3wrap = w;
}

}
