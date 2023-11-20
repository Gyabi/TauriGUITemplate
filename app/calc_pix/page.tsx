"use client";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

const CalcPix = () => {
    const [w, setW] = useState(10);
    const [h, setH] = useState(10);
    const [result, setResult] = useState(0);

    const execCalc = () => {
        invoke("calc_pix", { width:w, height:h }).then((res) => {
            setResult(res as number);
        });
    }

    return (
        <div className="bg-gray-800 h-full w-full flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md">
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Width</label>
                <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={w}
                    onChange={(e) => setW(Number(e.target.value))}
                />
                </div>

                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Height</label>
                <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={h}
                    onChange={(e) => setH(Number(e.target.value))}
                />
                </div>

                <button
                className="bg-blue-500 w-full text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                onClick={execCalc}
                >
                Calc
                </button>

                {result !== null && (
                <div className="mt-4">
                    <p className="text-lg font-semibold">Result: {result} row</p>
                </div>
                )}
            </div>
        </div>
    );
}

export default CalcPix;