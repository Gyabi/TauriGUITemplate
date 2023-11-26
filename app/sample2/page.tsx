"use client";

import { invoke } from "@tauri-apps/api/tauri";

const Sample2Page = () => {
  
  const handleClick = () => {
    invoke("brent_root");
  }

  return (
    <div>
      <h1>Sample2</h1>
      <button onClick={handleClick}>Click me</button>
    </div>
  )
}

export default Sample2Page;