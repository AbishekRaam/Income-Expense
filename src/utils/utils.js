export const getTotalAmount =(data)=>{
  let total=0;
  data.map( data=>{
    total=total+parseInt(data.amount.replace(/,/g, ''))
  })
  return total.toLocaleString('en-IN');
}

export const getToatalRevenue = (array) =>{
  let total=0;
  array.filter(data=>data.type === "Revenue")
  .map(data=>total+=parseInt(data.amount.replace(/,/g, '')))

  return total.toLocaleString('en-IN');
} 

//format amount
export const formatAmount = (value)=>{
  let numValue = value.replace(/[^\d]/g, '');
  return Number(numValue).toLocaleString('en-IN');
}


