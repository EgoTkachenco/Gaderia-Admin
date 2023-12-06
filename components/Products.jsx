import { Button, Input } from '@nextui-org/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { DotsIcon } from './icons/accounts/dots-icon';
import { ExportIcon } from './icons/accounts/export-icon';
import { InfoIcon } from './icons/accounts/info-icon';
import { TrashIcon } from './icons/accounts/trash-icon';
import { HouseIcon } from './icons/breadcrumb/house-icon';
import { UsersIcon } from './icons/breadcrumb/users-icon';
import { SettingsIcon } from './icons/sidebar/settings-icon';
import { TableWrapper } from './table/table';
// import { AddUser } from "./add-user";
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

  return (
    <div className=" w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">All Products</h3>
        <Button color="primary" onClick={() => setActiveProduct({})}>
          Create
        </Button>
      </div>
      <div className="w-full">
        <TableWrapper columns={productModel} data={data} />
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
  { name: 'Picture', uid: 'picture', type: 'picture' },
  { name: 'Header', uid: 'header', type: 'text' },
  { name: 'Description', uid: 'description', type: 'long-text' },
  { name: 'Count', uid: 'count', type: 'text' },
  { name: 'Price', uid: 'price', type: 'text' },
  { name: 'Price discount', uid: 'price_discount', type: 'text' },
  { name: 'Type measurement', uid: 'type_measurement', type: 'text' },
  { name: 'Measurement', uid: 'measurement', type: 'text' },
  { name: 'Type Product', uid: 'type_product', type: 'text' },
  { name: 'Type Apple', uid: 'type_apple', type: 'text' },
  // { name: '', uid: '', type: 'text' },
  // { name: '', uid: '', type: 'text' },
  // { name: 'Actions', uid: 'actions', type: 'actions' },
];
