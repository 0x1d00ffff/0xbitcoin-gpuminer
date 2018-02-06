

const Miner = require("./0xbitcoinminer");

const Vault = require("./lib/vault");


var Web3 = require('web3')

var NetworkInterface = require("./lib/network-interface");


var web3 = new Web3( );


//web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));


if (process.argv.length <= 2) {
console. log("Please add a subsystem parameter (use 'npm run help' for help)");
process. exit(-1);
}

var subsystem_name =  process.argv[2] ;
var subsystem_command =  process.argv[3] ;
var subsystem_option =  process.argv[4] ;




async function init()
{


  if(subsystem_name == 'account')
  {
    await Vault.init(web3);

    Vault.handleAccountCommand(subsystem_command,subsystem_option)
  }

  if(subsystem_name == 'contract')
  {
    await Vault.init(web3);

    Vault.handleContractCommand(subsystem_command,subsystem_option)
  }

  if(subsystem_name == 'config')
  {
    await Vault.init(web3);

    Vault.handleConfigCommand(subsystem_command,subsystem_option)
  }

  if(subsystem_name == 'mine')
  {
    await Vault.init(web3);

    //be careful! There is no web3 provider before this line
    web3.setProvider(Vault.getWeb3Provider());

    NetworkInterface.init(web3, Vault);

    Miner.init( web3 ,  subsystem_command, Vault, NetworkInterface );
  }

  if(subsystem_name == 'help')
  {
    console.log('\n\n')
    console.log('--0xBitcoin Miner Help--\n')
    console.log('Available commands:\n')
    console.log('"npm run account new" - Create a new mining account ')
    console.log('"npm run account list" - List all mining accounts ')
    console.log('"npm run account select 0x####" - Select a primary mining account by address ')

    console.log('"npm run contract list" - List the selected token contract to mine')
    console.log('"npm run contract select 0x####" - Select a PoW token contract to mine ')

    console.log('"npm run config gasprice #" - Set the gasprice used to submit PoW to the token smartcontract ')
    console.log('"npm run config cpu_threads #" - Set the number of CPU cores to use for mining ')
    console.log('"npm run config web3provider http://----:####" - Set the web3 provider url for submitting ethereum transactions ')

    console.log('"npm run mine" - Begin mining ')

  //  console.log('\n')
  //  console.log('Encrypted data vault stored at '+ Vault.get0xBitcoinLocalFolderPath())

    console.log('\n\n')
  }


}
init();
