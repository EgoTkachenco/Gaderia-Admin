import { Button } from '@nextui-org/react';
import React, { useMemo, useState } from 'react';
import { TableWrapper } from '../table/table';
import {
  getCatalog,
  createCatalog,
  updateCatalog,
  deleteCatalog,
} from '../../api';
import useTableAPIRequest from '../hooks/useTableAPIRequest';
import ProductModal from './ProductModal';
import Pagination from '../Pagination';

export const Products = () => {
  const {
    data,
    params,
    isFetch,
    onRequest,
    isNext,
    nextPage,
    prevPage,
    isPrev,
  } = useTableAPIRequest(getCatalog);
  const [activeProduct, setActiveProduct] = useState(null);
  const handleProduct = (product) => {
    if (!activeProduct.id) {
      return createCatalog(product).then(() => {
        onRequest();
      });
    } else {
      product.append('catalog_id', activeProduct.id);
      return updateCatalog(product).then(() => {
        onRequest();
      });
    }
  };

  const handleProductDelete = (id) => {
    debugger;
    deleteCatalog(id).then(() => {
      onRequest();
    });
  };

  const formatedData = useMemo(
    () =>
      data?.map((item) => ({
        ...item,
        measurement_label: item.measurement + ' ' + item.type_measurement,
      })),
    [data]
  );

  return (
    <div className=" w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Всі продукти</h3>
        <Button color="primary" onClick={() => setActiveProduct({})}>
          Додати
        </Button>
      </div>
      <div className="w-full">
        {!isFetch && (
          <>
            <TableWrapper
              columns={productModel}
              data={formatedData}
              onUpdate={(item) => setActiveProduct(item)}
              onDelete={(id) => handleProductDelete(id)}
            />
            <Pagination
              isNext={isNext}
              onNext={nextPage}
              onPrev={prevPage}
              isPrev={isPrev}
            />
          </>
        )}
        {isFetch && <div>Завантаження...</div>}
      </div>
      <ProductModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onSubmit={handleProduct}
      />
    </div>
  );
};

export const productModel = [
  { name: 'ID', uid: 'id', type: 'text' },
  { name: 'Картинка', uid: 'picture', type: 'picture', width: '150px' },
  { name: 'Назва', uid: 'header', type: 'text', width: '250px' },
  {
    name: 'Опис',
    uid: 'description',
    type: 'long-text',
    width: '250px',
  },
  { name: 'Кількість', uid: 'count', type: 'text' },
  { name: 'Ціна', uid: 'price', type: 'text' },
  { name: 'Знижка', uid: 'price_discount', type: 'text' },
  { name: 'Міра', uid: 'measurement_label', type: 'text' },
  { name: 'Тип продукту', uid: 'type_product', type: 'text' },
  { name: 'Тип яблука', uid: 'type_apple', type: 'text' },
  { name: 'Тип соку', uid: 'type_juice', type: 'text' },
  { name: 'Тип оцту', uid: 'type_vinegar', type: 'text' },
  { name: 'Тип пакування', uid: 'type_packaging', type: 'text' },
  { uid: 'actions', type: 'actions' },
];
