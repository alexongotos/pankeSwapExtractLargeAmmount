import BigNumber from 'bignumber.js';
import { 
  TransactionEvent, 
  Finding, 
  HandleTransaction, 
  FindingSeverity, 
  FindingType,
  createTransactionEvent,
  getJsonRpcUrl,
  

} from 'forta-agent'
import Web3 from 'web3';

import {
  PANCAKESWAP_ROUTER_ABI,
  PANCAKESWAP_ROUTER_ADDRESS

} from "./consts"
import iTxInput from './iTXInput';

const abiDecoder = require('abi-decoder');
abiDecoder.addABI(PANCAKESWAP_ROUTER_ABI)
const web3 = new Web3(getJsonRpcUrl())
const handleTransaction: HandleTransaction = async (txEvent: TransactionEvent) => {
  const findings: Finding[] = [];
  if (txEvent.transaction.to === PANCAKESWAP_ROUTER_ADDRESS){
    let amount:BigNumber = new BigNumber("0")
    const decodedSig:iTxInput = abiDecoder.decodeMethod(txEvent.transaction.data)

    if (decodedSig.name === "swapExactTokensForETH" ) {
      for (let param of decodedSig.params){
        if (param.name==="amountIn"){
           amount = new BigNumber(param.value)
        }
      }
      if (amount.isGreaterThan("1000000000000000000000000000")){
        findings.push(
          Finding.fromObject({
            name: "LARGE VOLUME EXSTRACT DETECTET ",
            description: `Detect large swap extract for eth `,
            alertId: "FORTA-140",
            severity: FindingSeverity.High,
            type: FindingType.Exploit,
            metadata:{
              eventName:decodedSig.name,
              value: amount.toString()
            }
    
          })
         )

      }
      

    }
  }    
    

  return findings;
}

export default {
  handleTransaction
}