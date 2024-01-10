import axios from "axios";
import { ChangeEvent, useState } from "react";

function Home() {
type ashu={
  title: string
}

  const   [titleData , setTitle]= useState<ashu>({title:""})

 const inputChangeHandler = (e : ChangeEvent<HTMLInputElement>)=>setTitle({...titleData,title:e.target.value})

 async function addSecrethandler(data:ashu){
  // if(title.length >= 1){
    try {
      const response = await axios.post("http://localhost:2100/api/todo/addtodo" , data)
    console.log(response)
    } catch (error) {
      console.log(error)
    }
    
  // }


 }

  return (
    <div className="container mt-5">
      <div className="mx-5">
        <div className="input-group mb-3   ">
          <input
          onChange={(e)=>inputChangeHandler(e)}
            type="text"
            className="form-control border  border-primary border-2"
            placeholder="Add a new secret "
            aria-label="Add a new secret "
            aria-describedby="basic-addon2"
          />
          <span className="input-group-text btn btn-primary" id="basic-addon2"onClick={()=>addSecrethandler(titleData)} > 
            Add Secret
          </span>
        </div>

        <div className="w-50 me-auto float-start">
          <ul className="list-group">
            <li className="list-group-item active" aria-current="true">
              An active item
            </li>
            <li className="list-group-item">A second item</li>
            <li className="list-group-item">A third item</li>
            <li className="list-group-item">A fourth item</li>
            <li className="list-group-item">And a fifth one</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export { Home };
