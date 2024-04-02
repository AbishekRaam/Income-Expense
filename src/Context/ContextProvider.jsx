import { collection, getDocs, onSnapshot } from "firebase/firestore";
import React , {useContext,createContext,useState,useEffect} from "react";
import { db } from "../firebase-config";
const StateContext=createContext();
export const ContextProvider=({children})=>{
  //States
const [income,setIncome] = useState([])
const [expense,setExpense] = useState([])
//UseEffects
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
  return (<StateContext.Provider value={{income,setIncome,expense,setExpense}}>
    {children}
</StateContext.Provider>)
}
export const useStateContext = () => useContext(StateContext);