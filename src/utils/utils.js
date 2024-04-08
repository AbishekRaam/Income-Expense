export const getTotalAmount =(data)=>{
  let total=0;
  data.map( data=>{
    total=total+parseFloat(data.amount)
  })
  return total.toLocaleString('en-IN');
}

export const getToatalRevenue = (array) =>{
  let total=0;
  array.filter(data=>data.type === "Revenue")
  .map(data=>total+=parseFloat(data.income))

  return total.toLocaleString('en-IN');
} 

export const getTotalExpenses =(data)=>{
  let total=0;
  data.map( data=>{
    
    total=total+parseFloat(data.amount)
  })
  return total.toLocaleString('en-IN');
}

export const revenueChat=(array)=>{
  let total=0
  const incomeArray = array.filter(data=>data.type === "Revenue")
  .map(data=>total+=data.income)
  return incomeArray;
}

export default {getTotalAmount, getToatalRevenue, getTotalExpenses, revenueChat}

