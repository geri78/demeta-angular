import { Component, HostListener, NgZone } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const Web3 = require('web3');
// const contract = require('truffle-contract');
const AxEuroTokenArtifact = require('./../../../../build/contracts/AxEuroToken.json');
// import AxEuroTokenArtefact from './../../../../build/contracts/AxEuroToken.json';


declare var window: any;



@Injectable()
export class Web3WrapperService {
  // AxEuroToken = contract(AxEuroTokenArtifact);
// get only interface object from contract

  private AxEuroTokenInterface = (<any>AxEuroTokenArtifact).abi;
  private AxEuroTokenApprovalEvt;
// address where contract is deployed.
  private AxEuroTokenDeployedAt = '0xbFEa297CAD970b59364b5A0f9d78bfA42D705756';
  private AxEuroToken = null;
  account: any;
  accounts: any;
  web3: any;
  status: string;
  _bnval = 1000000000000000000;


  constructor(private _ngZone: NgZone) {

  }
  /*
  @HostListener('window:load')
  windowLoaded() {
    this.checkAndInstantiateWeb3();
    this.onReady();
  }
*/

public initAxAgroTokenContract(): void {
  this.AxEuroToken = this.web3.eth.contract(this.AxEuroTokenInterface)
                                         .at(this.AxEuroTokenDeployedAt);
      const ret = this.AxEuroToken.totalSupply();
      console.log('got totalSupply:' + ret);
      this.AxEuroTokenApprovalEvt = this.AxEuroToken.Approval();
      // event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
      this.AxEuroTokenApprovalEvt.watch ( (err, response) => {  // set up listener for the AuctionClosed Event
        if  (!err) {
          const receipient = response.args.spender;
          let value = response.args.tokens;
          value /= this._bnval;
          console.log('receiver:' + receipient + ' value:' + value);
        }
        // alert('event received');
        });
      // setTimeout ( () => {  //simulate an auction for 3 seconds, after which the creator closes the auction
      /*
      this.AxEuroTokenApprovalEvt.watch(function(error, result){
      if (!error) { // event Approval(address indexed owner, address indexed spender, uint value);
            console.log('owner:' + result.args.owner.toString().toUpperCase() + 'value:' + result.args.value);
            alert('event received');
        } else {
            console.log(error);
        }
      });*/
    }

public AxEuroToken_approve( receipient: string, price: number, sender: string, sender_password: string): void {
  /*
  var bnval = new BigNumber(price);
  var bn18 = new BigNumber('1000000000000000000');

  var bnv =  bnval.multipliedBy(bn18);
  BuyStruct.kaufer = kaufer;
  BuyStruct.asset =  val;
  BuyStruct.preis = bnv;
  var pw = $('#ka_pw').val();
  */


    price *= this._bnval;

  // App.web3.personal.unlockAccount(kaufer, pw);
  if (sender_password != null) {
      this.web3.personal.unlockAccount(sender, sender_password);
  }
  /*
  var assetContract = "0x95977E9685BEbccCb889E32359ED0fe31B60bBeb";
  App.contracts.Token.approve(assetContract , bnv.toString(), {from: kaufer},
  function(error, ret){ console.log(error)});
*/
  this.AxEuroToken.approve(receipient, price.toString(), {from: sender});

}


  checkAndInstantiateWeb3 = () => {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      console.warn(
        'Using web3 detected from external source. If you find that your accounts don\'t appear or you have 0 MetaCoin, ensure you\'ve ' +
        'configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) ' +
        'http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.warn(
        'No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live, as it\'s ' +
        'inherently insecure. Consider switching to Metamask for development. More info here: ' +
        'http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      const nw = new Web3.providers.HttpProvider('http://localhost:8545');
      this.web3 = new Web3( nw
         // kovan
      );
    }
  }

  onReady = () => {
    // Bootstrap the MetaCoin abstraction for Use.
    // this.nameChange.setProvider(this.web3.currentProvider);

       // Get the initial account balance so it can be displayed.
    this.web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        alert('There was an error fetching your accounts.');
        return;
      }

      if (accs.length === 0) {
        alert(
          'Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.'
        );
        return;
      }
      console.log(accs);
      // This is run from window:load and ZoneJS is not aware of it we
      // need to use _ngZone.run() so that the UI updates on promise resolution
   //   this._ngZone.run(() =>
   //     this.refreshName()
   //   );
    });
  }


}
