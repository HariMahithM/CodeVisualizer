import Editor from "@monaco-editor/react";
import { useState } from "react";

function App() {

  const [code, setCode] = useState(`public class Main {
  public static void main(String[] args) {

      int a = 5;
      int b = a + 2;

      System.out.println(b);

  }
}`);
const runCode = async () => {

  const res = await fetch("http://localhost:5000/run",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({code})
  });

  const data = await res.json();

  console.log(data.steps);

}

  return (
    <div style={{height:"85vh",display:"flex",width:"50vw",flexDirection:"column"}}>

      <div style={{flex:1}}>
        <Editor
          height="100%"
          defaultLanguage="java"
          value={code}
          theme="vs-dark"
          onChange={(value)=>setCode(value)}
        />
      </div>

      <button
        style={{
          height:"60px",
          fontSize:"20px",
          background:"#4CAF50",
          color:"white",
          border:"none"
        }}
        onClick={runCode}
      >
        Run Code
      </button>

    </div>
  );
}

export default App;