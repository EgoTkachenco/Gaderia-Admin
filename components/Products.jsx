import { Button } from '@nextui-org/react';
import React, { useMemo, useState } from 'react';
import { TableWrapper } from './table/table';
import { getCatalog, createCatalog } from '../api';
import useTableAPIRequest from './hooks/useTableAPIRequest';
import ProductModal from './ProductModal';

export const Products = () => {
  const { data, params, isFetch, onRequest } = useTableAPIRequest(getCatalog);
  const [activeProduct, setActiveProduct] = useState(null);
  const handleProduct = (product) =>
    createCatalog(product).then(() => {
      onRequest();
    });

  const formatedData = useMemo(
    () =>
      data?.map((item) => ({
        ...item,
        measurement: item.measurement + ' ' + item.type_measurement,
      })),
    [data]
  );

  return (
    <div className=" w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">All Products</h3>
        <Button color="primary" onClick={() => setActiveProduct({})}>
          Create
        </Button>
      </div>
      <div className="w-full">
        {!isFetch && (
          <TableWrapper columns={productModel} data={formatedData} />
        )}
        {isFetch && <div>Loading...</div>}
      </div>
      <ProductModal
        isOpen={activeProduct}
        onClose={() => setActiveProduct(null)}
        onSubmit={handleProduct}
      />
    </div>
  );
};

const productModel = [
  { name: 'ID', uid: 'id', type: 'text' },
  { name: 'Picture', uid: 'picture', type: 'picture', width: '150px' },
  { name: 'Header', uid: 'header', type: 'text', width: '250px' },
  {
    name: 'Description',
    uid: 'description',
    type: 'long-text',
    width: '250px',
  },
  { name: 'Count', uid: 'count', type: 'text' },
  { name: 'Price', uid: 'price', type: 'text' },
  { name: 'Discount', uid: 'price_discount', type: 'text' },
  { name: 'Measurement', uid: 'measurement', type: 'text' },
  { name: 'Type Product', uid: 'type_product', type: 'text' },
  { name: 'Type Apple', uid: 'type_apple', type: 'text' },
  { name: 'Type Juice', uid: 'type_juice', type: 'text' },
  { name: 'Type Vinegar', uid: 'type_vinegar', type: 'text' },
  { name: 'Type Packaging', uid: 'type_packaging', type: 'text' },
];
