import { exec, execSync } from "child_process";

function SetPrettier(){
    execSync('npm install -D prettier',{stdio:[0,1,2]})   
    // exec('npm install -D prettier')   
    // exec('npm install -D prettier')   
}

export {SetPrettier}