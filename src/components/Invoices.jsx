import React from 'react';
import { useSelector } from 'react-redux';

const Invoices = () => {
 const invoices = useSelector((state) => state.fileData.invoices);


 return (
   <div className="bg-white rounded-lg shadow w-full overflow-x-auto">
     <div className="flex justify-between items-center p-4 text-sm font-medium text-gray-700 border-b min-w-max">
       <div className="flex-1 text-center truncate px-2 min-w-[120px]">Serial Number</div>
       <div className="flex-1 text-center truncate px-2 min-w-[120px]">Customer Name</div>
       <div className="flex-1 text-center truncate px-2 min-w-[120px]">Product Name</div>
       <div className="flex-1 text-center truncate px-2 min-w-[120px]">Quantity</div>
       <div className="flex-1 text-center truncate px-2 min-w-[120px]">Tax</div>
       <div className="flex-1 text-center truncate px-2 min-w-[120px]">Total Amount</div>
       <div className="flex-1 text-center truncate px-2 min-w-[120px]">Date</div>
     </div>
     <div className="divide-y divide-gray-200">
       {invoices?.map((invoice, index) => (
         <div key={index} className="flex justify-between items-center p-4 text-sm text-gray-600 hover:bg-gray-50 min-w-max">
           <div className="flex-1 text-center truncate px-2 min-w-[120px]">{invoice?.serialNumber || '-'}</div>
           <div className="flex-1 text-center truncate px-2 min-w-[120px]">{invoice?.customerName || '-'}</div>
           <div className="flex-1 text-center truncate px-2 min-w-[120px]">{invoice?.productName || '-'}</div>
           <div className="flex-1 text-center truncate px-2 min-w-[120px]">{invoice?.quantity || '0'}</div>
           <div className="flex-1 text-center truncate px-2 min-w-[120px]">{invoice?.tax || '0'}</div>
           <div className="flex-1 text-center truncate px-2 min-w-[120px]">{invoice?.totalAmount || '0'}</div>
           <div className="flex-1 text-center truncate px-2 min-w-[120px]">{invoice?.date || '-'}</div>
         </div>
       ))}
     </div>
   </div>
 );
};

export default Invoices;