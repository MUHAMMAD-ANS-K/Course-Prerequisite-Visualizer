import { useEffect, useState } from "react"
import api from "./api";

export default function SuperUser(){
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        async function getUsers() {
            try{
                const response = await api.get("/users")
                console.log(response.data)
            }
            catch(error) {
                console.error(error)
            }
        }
        getUsers();
    }, [])
    return(
        <div className="superUser">

        </div>
    )
}