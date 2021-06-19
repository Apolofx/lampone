import { exec } from "child_process";

function SetPrettier(){
    exec('npm install -D prettier')   
    // exec('npm install -D prettier')   
    // exec('npm install -D prettier')   
}

export {SetPrettier}