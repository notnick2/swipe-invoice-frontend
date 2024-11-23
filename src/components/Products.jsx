import React from 'react';
import { useSelector } from 'react-redux';

const Products = () => {
 const products = useSelector((state) => state.fileData.products);


 return (
   <div className="bg-white rounded-lg shadow w-full overflow-x-auto">
     <div className="flex justify-between items-center p-4 text-sm font-medium text-gray-700 border-b min-w-max">
       <div className="flex-1 text-center truncate px-2 min-w-[120px]">Name</div>
       <div className="flex-1 text-center truncate px-2 min-w-[120px]">Quantity</div>
       <div className="flex-1 text-center truncate px-2 min-w-[120px]">Unit Price</div>
       <div className="flex-1 text-center truncate px-2 min-w-[120px]">Tax</div>
       <div className="flex-1 text-center truncate px-2 min-w-[120px]">Price with Tax</div>
     </div>
     <div className="divide-y divide-gray-200">
       {products?.map((product, index) => (
         <div key={index} className="flex justify-between items-center p-4 text-sm text-gray-600 hover:bg-gray-50 min-w-max">
           <div className="flex-1 text-center truncate px-2 min-w-[120px]">{product?.name || '-'}</div>
           <div className="flex-1 text-center truncate px-2 min-w-[120px]">{product?.quantity || '0'}</div>
           <div className="flex-1 text-center truncate px-2 min-w-[120px]">{product?.unitPrice || '0'}</div>
           <div className="flex-1 text-center truncate px-2 min-w-[120px]">{product?.tax || '0'}</div>
           <div className="flex-1 text-center truncate px-2 min-w-[120px]">{product?.priceWithTax || '0'}</div>
         </div>
       ))}
     </div>
   </div>
 );
};

export default Products;