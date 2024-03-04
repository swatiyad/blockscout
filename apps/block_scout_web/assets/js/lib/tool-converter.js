class TronEvmconverter {
    //TRC to EVM
    static trcToEvm(trcAddress){
        return parseInt(trcAddress.replace(/^41/, ''),16).toString(16).padStart(40,'0');
    }
    //EVM to TRC
    static evmToTrc(evmAddress){
        return '41' + parseInt(evmAddress.replace(/^0x/, ''), 16).toString(16).padStart(40,'0');
    }
}

const trcAddress ='';
const evmAddress = '';

const convertedEvm = TronEvmconverter.trcToEvm(trcAddress);
const convertedTrc = TronEvmconverter.evmToTrc(evmAddress);
console.log('TRC to EVm and Evm to Trc:', `${convertedEvm} | ${convertedTrc}`); 


export const func = ()=>{
    console.log('hello world');
}

const toolBtn1 = document.getElementById("toolBtn1");
toolBtn1.addEventListener("click",()=>{
    console.log('tool bton 1 clicked!');
})

document.addEventListener("DOMContentLoaded", async function () {
console.log('hello world');
})