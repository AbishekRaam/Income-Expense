import { collection, getDocs, onSnapshot,doc,getDoc } from "firebase/firestore";
import React , {useContext,createContext,useState,useEffect} from "react";
import {db, db2 , storage } from "../firebase-config";
import {getDownloadURL,ref,uploadBytes} from 'firebase/storage'
import Cookies from "js-cookie";
const StateContext=createContext();
export const ContextProvider=({children})=>{
  //States
const [income,setIncome] = useState([])
const [expense,setExpense] = useState([])
const [url,setUrl]=useState('')
//UseEffects
useEffect(()=>{
  const handleGet=async()=>{
 const docRef = doc(db2, "admin", JSON.parse(sessionStorage.getItem('uid')));
const docSnap = await getDoc(docRef)
if(docSnap.exists()){
Cookies.set('level',docSnap.data().level,{secure:'true',path:'/'})
Cookies.set('team',docSnap.data().team,{secure:'true',path:'/'})
Cookies.set('name',docSnap.data().name,{secure:'true',path:'/'})
Cookies.set('email',docSnap.data().email,{secure:'true',path:'/'})
Cookies.set('gender',docSnap.data().gender,{secure:'true',path:'/'})
Cookies.set('id',docSnap.data().employeeID,{secure:'true',path:'/'})
Cookies.set('phone',docSnap.data().phone,{secure:'true',path:'/'})
Cookies.set('role',docSnap.data().designation,{secure:'true',path:'/'})
Cookies.set('status',docSnap.data().status,{secure:'true',path:'/'})
const fileRef=ref(storage,'users/'+JSON.parse(sessionStorage.getItem('uid'))+'.jpg');
await getDownloadURL(fileRef).then((url) => {
  setUrl(url)
}).catch((err)=>{
  console.log(err);
})
}
  }
handleGet()
  },[sessionStorage.getItem('uid')])
useEffect(()=>{
    const getData=async()=>{
    onSnapshot(
      collection(db,'Income') ,(data)=>{
        setIncome(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    },(error)=>{
      console.log(error)
    })
    
    const data1 = await getDocs(collection(db,'Expense')).catch(err=>console.log(err))
    setExpense(data1.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getData()
  },[])
  return (<StateContext.Provider value={{income,setIncome,expense,setExpense,url}}>
    {children}
</StateContext.Provider>)
}
export const useStateContext = () => useContext(StateContext);