import React from 'react';
import { useSelector } from 'react-redux';

const Customers = () => {
 const customers = useSelector((state) => state.fileData.customers);

 return (
   <div className="bg-white rounded-lg shadow w-full overflow-x-auto">
     <div className="flex justify-between items-center p-4 text-sm font-medium text-gray-700 border-b min-w-max">
       <div className="flex-1 text-center truncate px-2 min-w-[150px]">Customer Name</div>
       <div className="flex-1 text-center truncate px-2 min-w-[150px]">Phone Number</div>
       <div className="flex-1 text-center truncate px-2 min-w-[150px]">Total Purchase Amount</div>
     </div>
     <div className="divide-y divide-gray-200">
       {customers?.map((customer, index) => (
         <div key={index} className="flex justify-between items-center p-4 text-sm text-gray-600 hover:bg-gray-50 min-w-max">
           <div className="flex-1 text-center truncate px-2 min-w-[150px]">{customer?.customerName || '-'}</div>
           <div className="flex-1 text-center truncate px-2 min-w-[150px]">{customer?.phoneNumber || '-'}</div>
           <div className="flex-1 text-center truncate px-2 min-w-[150px]">{customer?.totalPurchaseAmount || '0'}</div>
         </div>
       ))}
     </div>
   </div>
 );
};

export default Customers;