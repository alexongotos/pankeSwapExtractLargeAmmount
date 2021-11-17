import {
    createTransactionEvent,
    HandleBlock,
    HandleTransaction
  } from "forta-agent"
  import agent from "./agent"
  
  describe("extracted", () => {
    let handleTransaction: HandleTransaction
  
    const createTxEventWithdata = (data:string) => createTransactionEvent({
      transaction:{
        hash:"0xb48ff57326966812864ddfbf57e9a5540d334d9f6e7c42804b44bd1d37b63199",
        to:"0x10ED43C718714eb63d5aA57B78B54704E256024E",
        from:"123",
        nonce:1,
        gas:"",
        gasPrice:"",
        value:"",
        data:data,
        r:"",
        s:"",
        v:""

        
      },
      type:undefined,
      network:undefined,
      receipt: {
        status:true,
        root:"",
        gasUsed:"",
        cumulativeGasUsed:"",
        logsBloom:"",
        logs:{} as any,
        contractAddress:"0x18b2a687610328590bc8f2e5fedde3b582a49cda",
        blockHash:"",
        blockNumber:1,
        transactionHash:"",
        transactionIndex:1

      },
      block:{}as any


    })
  
    beforeAll(() => {
      handleTransaction = agent.handleTransaction
    })
  
    describe("lagre amount extracted", () => {
      it("amount extracted", async () => {
        const txEvent = createTxEventWithdata("0x18cbafe5000000000000000000000000000000000000f684df56c3e01ff0979b189e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000002d106122657de4acb9f05f60be1d8c8753e3d24a00000000000000000000000000000000000000000000000000000000617a714c00000000000000000000000000000000000000000000000000000000000000020000000000000000000000005d2bf248a2a31da2bdc8fd0b0b6c3cee71f7175a000000000000000000000000bb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c")
  
        const findings = await handleTransaction(txEvent)
  
        expect(findings.length).toBe(1)
      })
      
  
    })
  })