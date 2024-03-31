import React from 'react'

const Tablecontainer = () => {
  return (
    <div className='container-sm w-75  border border-secondary mb-5'>
      <div className="p-3 text-center border-bottom border-secondary h4">All Data</div>
      <div className="d-flex justify-content-between p-3 border-bottom border-secondary">
        <span className='pt-1 h6'>Total Income</span>
        <span className='bg-primary p-1 text-white rounded'>2234.00</span>
      </div>
      <div className="d-flex justify-content-between p-3 border-bottom border-secondary">
        <span className='pt-1 h6'>Total Expenses</span>
        <span className='bg-danger p-1 text-white rounded'>500.00</span>
      </div>
      <div className="d-flex justify-content-between p-3 ">
        <span className='pt-1 h6'>Balance</span>
        <span className='bg-primary p-1 text-white rounded'>1500</span>
      </div>
    </div>
  )
}

export default Tablecontainer