let btns = Array.from(document.querySelectorAll("#btns>div"));
let inputTop = document.querySelector("#input>span:nth-child(1)");
let inputBottom = document.querySelector("#input>span:nth-child(2)");



class Calculator {

    constructor (
        private _lastBtn:string,
        private _fullStr:string = "",
        private _currentNumber:string = "",
    ){
    }

    public lastBtn(theBtn: string):void {
        this._lastBtn = theBtn;
        this.handleBtns()
    }

    private createFullStr(last:string):void {
        this._fullStr += last
    }

    private createFullNumber(last:string):void {
        this._currentNumber += last
    }

    private ifElseForOparators(oparator:string):void {
        if ((this._fullStr[(this._fullStr).length-1] != "+" ) 
            && (this._fullStr[(this._fullStr).length-1] != "-") 
            && (this._fullStr[(this._fullStr).length-1] != "×" ) 
            && (this._fullStr[(this._fullStr).length-1] != "÷")) {
                this.createFullStr(oparator)
                this._currentNumber = ""
        }else{                   
                this._fullStr = this._fullStr.slice(0, -1)+ this._lastBtn
        }

        if (inputTop) {
            inputTop.innerHTML = this._fullStr
        }else{
            throw Error
        }
    }

    private replace(top:string, bottom:string):void {
        if (inputTop && inputBottom) {
            inputTop.innerHTML = top
            if (bottom.length>8) {
                inputBottom.innerHTML = bottom.slice(0,8)
            }else{
                inputBottom.innerHTML = bottom
            }
        }else{
            throw Error
        }
    }

    private handleBtns():void {
        switch (this._lastBtn) {
            case "C":
                this.replace("0","0")
                this._fullStr = "";
                this._currentNumber = "";
                break;
            // case "+/-":
            //     if (this._currentNumber[0]!="-"){
            //         this._currentNumber = "-" + this._currentNumber
            //     }else {
            //         this._currentNumber = this._fullStr.slice(1)
            //         console.log(this._currentNumber);    
            //     }
            //     this.replace(this._fullStr,this._currentNumber)
            //     break;
            case "DEL":
                this._fullStr = this._fullStr.slice(0, -1);
                this._currentNumber = this._currentNumber.slice(0, -1)
                console.log(this._currentNumber);
                
                if (this._currentNumber==="") {
                    this._currentNumber += "0"
                }
                if (this._fullStr==="") {
                    this._fullStr += "0"
                }
                this.replace(this._fullStr,this._currentNumber)
                if (this._currentNumber=="0") {
                    this._currentNumber = ""
                }
                if (this._fullStr=="0") {
                    this._fullStr = ""
                }
                break;
            case "=":
                if ((this._fullStr[(this._fullStr).length-1] != "+" ) 
                    && (this._fullStr[(this._fullStr).length-1] != "-") 
                    && (this._fullStr[(this._fullStr).length-1] != "×" ) 
                    && (this._fullStr[(this._fullStr).length-1] != "÷")) {
                        let resultTemp:any = this._fullStr
                        resultTemp = resultTemp.replaceAll("÷", "/")
                        resultTemp = resultTemp.replaceAll("×", "*")
                        console.log(resultTemp);
                        
                        this.replace(this._fullStr, (eval(resultTemp)).toString())
                        this._fullStr = (eval(resultTemp)).toString()
                }
                break;
            case "+":                
                this.ifElseForOparators("+")
                break;
            case "-":
                this.ifElseForOparators("-")
                break;
            case "×":
                this.ifElseForOparators("×")
                break;
            case "÷":
                this.ifElseForOparators("÷")
                break;
            default:
                this.createFullStr(this._lastBtn)
                this.createFullNumber(this._lastBtn)
                this.replace(this._fullStr, this._currentNumber)
                break;
        }
    }

    
}

let newCal = new Calculator("1")
btns.map((elem)=>{
    elem.addEventListener("click",()=>{
        newCal.lastBtn(elem.innerHTML);
    })
});

