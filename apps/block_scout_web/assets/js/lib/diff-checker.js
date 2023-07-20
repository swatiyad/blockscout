
import axios from "axios";
import { diff_match_patch } from "diff-match-patch";
import beautify from 'js-beautify';

// const dmp = new diff_match_patch();

let contractSource1;
let contractSource2;

document.querySelector('.txtContAddresbtn1').onclick = async function() {
  const val1 = document.querySelector('#txtContAddres1').value;
  const sourceDest = document.querySelector('.src-1');
  const divdiff = document.querySelector('.divDiff');
 const sourceCode =  await axios.get(`https://testnet.xuvscan.com/node-api/getSourceCode?address=${val1}`);
 const code = sourceCode.data.data;
 
 if(code.length==0){
  sourceDest.textContent = "Contract Address does not exists.";
  sourceDest.style.color="red"
 }else{
  const formattedCode1 = beautify(code[0].contract_source_code, {
    indent_size: 2,
    space_in_empty_paren: true,
    preserve_newlines: true,
    wrap_line_length: 80,
    end_with_newline: true,
  });
  sourceDest.textContent = formattedCode1;
  // sourceDest.style.maxHeight="500px";
  // sourceDest.style.overFlowY="auto";
  divdiff.style.display = "block";
  divdiff.style.textAlign = "start"
  contractSource1 = code[0].contract_source_code
 }
 
};

document.querySelector('.txtContAddresbtn2').onclick = async function() {
  const val2 = document.querySelector('#txtContAddres2').value;
  const sourceDest2 = document.querySelector('.src-2');
  const divdiff = document.querySelector('.divDiff');
 const sourceCode2 =  await axios.get(`https://testnet.xuvscan.com/node-api/getSourceCode?address=${val2}`);
 const code = sourceCode2.data.data;
 if(code.length==0){
  sourceDest2.textContent = "Contract Address does not exists.";
  sourceDest2.style.color="red"
 }else{
  const formattedCode2 = beautify(code[0].contract_source_code, {
    indent_size: 2,
    space_in_empty_paren: true,
    preserve_newlines: true,
    wrap_line_length: 80,
    end_with_newline: true,
  });
  sourceDest2.textContent = formattedCode2;
  // sourceDest2.style.maxHeight="500px";
  // sourceDest2.style.overFlowY="auto";
  divdiff.style.display = "block";
  divdiff.style.textAlign = "start"
  contractSource2 = code[0].contract_source_code;
  
 }
};

document.querySelector('.divDiff').onclick = function(){

  const dmp = new diff_match_patch();
  const differences = dmp.diff_main(contractSource1, contractSource2);
  dmp.diff_cleanupSemantic(differences);
  
  differences.forEach((part) => {
    const changeType = part[0]; // 0: Unchanged, 1: Added, -1: Removed
    const text = part[1];
    const formattedOutput = beautify(`[${changeType === 1 ? 'added' : changeType === -1 ? 'removed' : 'unchanged'}] ${text}`, {
      indent_size: 2,
      space_in_empty_paren: true,
      preserve_newlines: true,
      wrap_line_length: 80,
      end_with_newline: true,
    });

    document.querySelector("#diffoutput").innerHTML = formattedOutput;
    console.log(`[${changeType === 1 ? 'added' : changeType === -1 ? 'removed' : 'unchanged'}] ${text}`);
  });
  document.querySelector('.diffoutputDiv').style.display = "block";
  document.querySelector('.divDiff').style.display = "none";
  document.querySelector('.btnback').style.display = "block"
}

document.querySelector('.btnback').onclick = function(){
window.location.reload();
}

