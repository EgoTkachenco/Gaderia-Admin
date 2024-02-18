import { Button } from '@nextui-org/react';
import React, { useMemo, useState } from 'react';
import { TableWrapper } from '../table/table';
import { getOrders, updateOrder } from '../../api';
import useTableAPIRequest from '../hooks/useTableAPIRequest';
import OrderModal, { STATUSES } from './OrderModal';
import { Select, SelectItem } from '@nextui-org/select';
import Pagination from '../Pagination';
import { MEASUREMENT_TYPES } from '../../constants';

export const Orders = () => {
  const {
    data,
    params,
    isFetch,
    onRequest,
    setParams,
    isNext,
    nextPage,
    prevPage,
    isPrev,
  } = useTableAPIRequest(getOrders, {
    // status: 'CANCELED',
    status: '',
  });
  const [activeOrder, setActiveOrder] = useState(null);
  const handleOrder = ({ status, ttn }) => {
    return updateOrder({ status, ttn, id: activeOrder.id }).then(() => {
      onRequest();
    });
  };

  return (
    <div className=" w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold whitespace-nowrap">
          Всі замовлення
        </h3>
        <Select
          style={{ width: 300, marginLeft: 'auto' }}
          isRequired
          items={[{ label: 'Всі', value: '' }, , ...STATUSES]}
          selectedKeys={[params.status]}
          onChange={(e) => {
            setParams({ ...params, status: e.target.value });
          }}
        >
          {(item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          )}
        </Select>
      </div>
      <div className="w-full">
        {!isFetch && (
          <>
            <TableWrapper
              columns={orderModel}
              data={data}
              onUpdate={(item) => setActiveOrder(item)}
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
      <OrderModal
        order={activeOrder}
        onClose={() => setActiveOrder(null)}
        onSubmit={handleOrder}
      />
    </div>
  );
};

const orderModel = [
  { name: 'ID', uid: 'id', type: 'text' },
  { name: 'ID замовлення', uid: 'order_id', type: 'text', width: '150px' },
  { name: 'Користувач', uid: 'user', type: 'user', width: '150px' },
  { name: 'Товари', uid: 'list', type: 'list' },
  { name: 'Доставна', uid: 'delivery', type: 'delivery', width: '150px' },
  { name: 'ТТН', uid: 'ttn', type: 'text', width: '150px' },
  {
    name: 'Метод оплати',
    uid: 'payment_method',
    type: 'text',
    width: '150px',
  },
  { name: 'Вартість', uid: 'price', type: 'price' },

  { uid: 'actions', type: 'actions' },
];
