var solc = require('solc');

// var eth = require('./web3dummy').eth;
var eth = require('./web3relay').eth;

var Contract = require('./contracts');
var mongoose = require( 'mongoose' );
var Transaction = mongoose.model( 'Transaction' );
const ERC223ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"_name","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"_totalSupply","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"_decimals","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT256","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"_symbol","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"},{"name":"_custom_fallback","type":"string"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":true,"name":"data","type":"bytes"}],"name":"Transfer","type":"event"}];
const ERC20ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}];
const SMART_ERCABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];
var soliCompCache = {};//solidity compiler cache。generating for compiler cost too much time, so we swap space for time
// var TokenTransferGrabber = require('./grabTokenTransfer');
// TokenTransferGrabber.Init(eth);
/* 
  TODO: support other languages
*/
module.exports = function(req, res) {
  console.log(req.body);
  if (!("action" in req.body))
    res.status(400).send();
  if (req.body.action=="compile") {
    compileSolc(req, res);
  } else if (req.body.action=="find") {
    Contract.findContract(req.body.addr, res);
  }

}


var compileSolc = function(req, res) {

  // get bytecode at address
  var address = req.body.address;
  var version = req.body.version;
  var name = req.body.name;
  var input = req.body.code;
  var optimization = (req.body.optimization) ? true : false;
  var optimise = (optimization) ? 1 : 0;

  var bytecode = eth.getCode(address);
  if (bytecode.substring(0,2)=="0x")
    bytecode = bytecode.substring(2);

  var data = {
    "address": address,
    "ERC": 0,
    "creationTransaction": "",
    "symbol": "",
    //"owner": "",//don't overwrite
    "decimals": 0,
    "totalSupply": 0,
    "balance":0,
    "compilerVersion": version,
    "optimization": optimization,
    "contractName": name,
    // "tokenName":"",//don't overwrite
    "sourceCode": input
  }

  var targetSolc = soliCompCache[version];
  if(!targetSolc){
    try {
      // latest version doesn't need to be loaded remotely
      if (version == "latest") {
        targetSolc = solc;
        var output = targetSolc.compile(input, optimise); 
        testValidCode(output, data, bytecode, res);
      } else {
        solc.loadRemoteVersion(version, function(err, solcV) { 
          console.log("on loadRemoteVersion:"+version); 
          if (err) {
            console.error(err);
            res.write(JSON.stringify({"valid": false, "err": "loadRemoteVersion fail :"+err}));
            res.end();
            return;
          }
          else {
            targetSolc = solcV;
            soliCompCache[version] = targetSolc;//compiler cache
            var output = targetSolc.compile(input, optimise); 
            testValidCode(output, data, bytecode, res);
          }
        });
      }
      return;
    } catch (e) {
      console.error(e.stack);
    }
  }else{
    var output = targetSolc.compile(input, optimise); 
    testValidCode(output, data, bytecode, res);
  }
}

//check is token contract
//0：normal contract 2：ERC20 3：ERC223
var checkERC = function(abi){
  var abiObj = JSON.parse(abi);
  var isERC20 = false;
  var isERC223 = false;
  var exist = false;
  var different = false;
  var transerNum = 0;
  for(var i=0; i<ERC223ABI.length; i++){
    var element = ERC223ABI[i];
    if(element.name=="transfer"){
      transerNum++;
    }
    exist = false;
    for(var j=0; j<abiObj.length; j++){
      abiObjEle = abiObj[j];
      if(abiObjEle.name == element.name){
        exist = true;
        break;
      }
    }
    if(!exist){
      different = true;
      break;
    }
  }
  if(!different && transerNum>1){
    isERC223 = true;
  }

  if(!isERC223){
    different = false;
    for(var i=0; i<SMART_ERCABI.length; i++){
      ERC20Ele = SMART_ERCABI[i];
      exist = false;
      for(var j=0; j<abiObj.length; j++){
        abiObjEle =abiObj[j];
        if(ERC20Ele.name==abiObjEle.name){
          exist = true;
          break;
        }
      }
      if(!exist){
        different = true;
        break;
      }
    }
    if(!different){
      isERC20 = true;
    }
  }
  
  if(isERC223)
    return 3;
  else if(isERC20)
    return 2;
  
  return 0;
}

var testValidCode = function(output, data, bytecode, response) {
  var verifiedContracts = [];
  var targetContractName = data.contractName;

  if(targetContractName.indexOf(":")!=0)
    targetContractName = ":"+targetContractName;//compiled contract name has prefix char :
  var targetContract = output.contracts[targetContractName]

  var concatByteCode = "";
  for (var contractName in output.contracts) {
    // code and ABI that are needed by web3
    // console.log(contractName + ': ' + output.contracts[contractName].bytecode);
    concatByteCode += output.contracts[contractName].bytecode;
    verifiedContracts.push({"name": contractName, 
                            "abi": output.contracts[contractName].interface,
                            "bytecode": output.contracts[contractName].bytecode});
  }
  //console.log('bytecode by current compile: ' + concatByteCode);

  // console.log();
  // reject special msg 
  var testCode = bytecode.substring(10,);
  var endIndex = testCode.length;
  if(testCode.indexOf("7a7a72305820")>-1)
    endIndex = testCode.indexOf("7a7a72305820");
  else if(testCode.length>68){
    endIndex = 68
  }
  if(endIndex==-1)
    endIndex = testCode.length;
  testCode = testCode.substring(0,endIndex);
  //console.log("bytecode on blockchain:");
  //console.log(testCode);
  if (!output.contracts || !targetContract)
    data.valid = false;
  //else if (concatByteCode.indexOf(bytecode) > -1){
  else if(concatByteCode.indexOf(testCode) > -1){
    //write to db
    data.abi = targetContract.interface;
    data.byteCode = bytecode;
    var  ERCType = checkERC(data.abi);
    data.ERC = ERCType;
    var txFind = Transaction.findOne({to:null, contractAddress:data.address}).lean(true);
    txFind.exec(function (err, doc) {
      //get token info from blockchain
      var ContractStruct = eth.contract(JSON.parse(data.abi));
      data.balance = eth.getBalance(data.address);
      if(ERCType>0){//is token
        try{
          var Token = ContractStruct.at(data.address);
          data.decimals = Token.decimals();
          data.symbol = Token.symbol();
          data.totalSupply = Token.totalSupply();
          // data.owner = doc.from;
        } catch (e) {
          console.log(e.stack);
          response.write("{err:'"+ e.stack+"'}");
          response.end();
        }        
      }else{
        console.log("can not find token on blockchain. token address:"+data.address);
      }
      if(!err && doc){
        data.creationTransaction = doc.hash;
      }
      Contract.addContract(data);
      
      //write TokenTransfer to db and listening
      // if(ERCType>0)//token contract
      //   TokenTransferGrabber.PatchTransferTokens(data, true);
    })
    data.valid = true;
    console.log("verify complete Contract:"+data.address);
  }  else
    data.valid = false;

  data["verifiedContracts"] = verifiedContracts;
  response.write(JSON.stringify(data));
  response.end();
}


