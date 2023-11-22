"use client";

import { invoke } from "@tauri-apps/api/tauri";
import {save, message} from "@tauri-apps/api/dialog";
import { stringify } from "querystring";

const SamplePage = () => {
    const file_name = "sample";
    const samples: Data[] = [
        {
            sample: "sample",
            sample2: "sample2",
            sample3: "sample3"
        },
        {
            sample: "sample4",
            sample2: "sample5",
            sample3: "sample6",
        },
        {
            sample: "sample7",
            sample2: "sample8",
            sample3: "sample9",
        }
    ]

    const onClickAAA = async () => {
        // 保存するpathをダイアログから取得
        const path = await save({
            defaultPath: file_name,
            filters: [
                {
                    name: "Text Files",
                    extensions: ["csv"]
                }
            ]
        }); 

        // 取得したpathを引数にして、tauriのAPIを呼び出す
        await invoke("sample_method", {path: path, datas: samples})
        .then((res) => {
            message(
                "success"
            );
        })
        .catch((err) => {
            message(
                stringify(err)
            );
        });
    }

    return (
        <div>
            <h1>Sample Page</h1>
            <button onClick={async()=>{await onClickAAA()}}>
                <p>Click me</p>
            </button>
        </div>
    );

}

export default SamplePage;


type Data = {
    sample: string,
    sample2: string,
    sample3: string
}