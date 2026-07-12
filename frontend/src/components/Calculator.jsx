import { React, useState, useEffect } from 'react'
import './Calculator.css'
import './../../public/calc.js'
import AppTray from './AppTray.jsx';
import Module from './../../public/calc.js';
const Calculator = () => {
    const [exp, setExp] = useState("");
    const [ans, setAns] = useState("");
    const [wasm, setWasm] = useState("");
    function handleBtn(btn) {
        switch (btn) {

            case "+": setExp(exp.concat("+"));
                break;
            case "-": setExp(exp.concat("-"));
                break;
            case "x": setExp(exp.concat("x"));
                break;
            case "/": setExp(exp.concat("÷"));
                break;
            case "ac": { setExp(""); setAns(""); }
                break;
            case "bksp": setExp(exp.slice(0, -1));
                break;
            case "%": setExp(exp.concat("%"));
                break;
            case ".": setExp(exp.concat("."));
                break;
            case "=": {
                console.log(`calculate: ${exp}`)
                if (wasm) setAns(wasm._answer());

            };
                break;
            default: setExp(exp + btn);
        }
    }
    useEffect(() => {
        console.log(exp);

    }, [exp]);
    useEffect(() => {
        async function webAssembly() {
            const wasm = await Module();
            setWasm(wasm);
        }
        webAssembly()

    }, []
    );


    return (
        <AppTray>
            <div className="mainframe">

                <div className="screen">
                    <div className="exp">
                        {exp}
                    </div>
                    <div className="res">
                        {ans}
                    </div>
                </div>
                <div className="cbtns">

                    <button type="button" className="cbtn ac" onClick={() => handleBtn("ac")}>AC</button>
                    <button type="button" className="cbtn del" onClick={() => handleBtn("bksp")}>⌫</button>
                    <button type="button" className="cbtn percent" onClick={() => handleBtn("%")}>%</button>
                    <button type="button" className="cbtn divide" onClick={() => handleBtn("/")}>÷</button>
                    <button type="button" className="cbtn seven" onClick={() => handleBtn("7")}>7</button>
                    <button type="button" className="cbtn eight" onClick={() => handleBtn("8")}>8</button>
                    <button type="button" className="cbtn nine" onClick={() => handleBtn("9")}>9</button>
                    <button type="button" className="cbtn multiply" onClick={() => handleBtn("x")}>×</button>
                    <button type="button" className="cbtn four" onClick={() => handleBtn("4")}>4</button>
                    <button type="button" className="cbtn five" onClick={() => handleBtn("5")}>5</button>
                    <button type="button" className="cbtn six" onClick={() => handleBtn("6")}>6</button>
                    <button type="button" className="cbtn minus" onClick={() => handleBtn("-")}>−</button>
                    <button type="button" className="cbtn one" onClick={() => handleBtn("1")}>1</button>
                    <button type="button" className="cbtn two" onClick={() => handleBtn("2")}>2</button>
                    <button type="button" className="cbtn three" onClick={() => handleBtn("3")}>3</button>
                    <button type="button" className="cbtn plus" onClick={() => handleBtn("+")}>+</button>

                    <button type="button" className="cbtn zero" onClick={() => handleBtn("0")}>0</button>
                    <button type="button" className="cbtn dot" onClick={() => handleBtn(".")}>.</button>
                    <button type="button" className="cbtn equals" onClick={() => handleBtn("=")}>=</button>

                </div>
            </div>
        </AppTray>
    )
}

export default Calculator