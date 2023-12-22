import { Button } from '@nextui-org/react';
import React, { useMemo, useState } from 'react';
import { TableWrapper } from '../table/table';
import { getOrders, updateOrder } from '../../api';
import useTableAPIRequest from '../hooks/useTableAPIRequest';
import OrderModal, { STATUSES } from './OrderModal';
import { Select, SelectItem } from '@nextui-org/select';

export const Orders = () => {
  const { data, params, isFetch, onRequest, setParams } = useTableAPIRequest(
    getOrders,
    {
      status: 'CANCELED',
    }
  );
  const [activeOrder, setActiveOrder] = useState(null);
  const handleOrder = ({ status, ttn }) => {
    return updateOrder({ status, ttn, id: activeOrder.id }).then(() => {
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
        <h3 className="text-xl font-semibold whitespace-nowrap">All Orders</h3>
        <Select
          style={{ width: 300, marginLeft: 'auto' }}
          isRequired
          items={STATUSES}
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
          <TableWrapper
            columns={orderModel}
            data={formatedData}
            onUpdate={(item) => setActiveOrder(item)}
          />
        )}
        {isFetch && <div>Loading...</div>}
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
  { name: 'Order ID', uid: 'order_id', type: 'text', width: '150px' },
  { name: 'User', uid: 'user', type: 'user', width: '150px' },
  { name: 'List', uid: 'list', type: 'list' },
  { name: 'Delivery', uid: 'delivery', type: 'delivery', width: '150px' },
  { name: 'TTN', uid: 'ttn', type: 'text', width: '150px' },
  {
    name: 'Payment method',
    uid: 'payment_method',
    type: 'text',
    width: '150px',
  },
  { name: 'Amount', uid: 'price', type: 'price' },

  { uid: 'actions', type: 'actions' },
];
