export const getTotalAmount=(data,key)=>{
let total=0;
data.map((data)=>{
    total+=parseInt(data[key].replace(/,/g, ''))
})
return total
}

export const getRevenue=(data)=>{
    let total=0;
data.map((data)=>{
    if(data.type==='Revenue') total+=parseInt(data.income)
})
return total
}