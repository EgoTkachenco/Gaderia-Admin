import { Button, Checkbox, Input } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { TableWrapper } from './table/table';
// import { AddUser } from "./add-user";
import { getContacts, createCatalog } from '../api';
import useTableAPIRequest from './hooks/useTableAPIRequest';

export const Contacts = () => {
  const { data, params, isFetch, onRequest, setParams } = useTableAPIRequest(
    getContacts,
    {
      page: 0,
      limit: 10,
      is_view: true,
    }
  );
  const handleContactView = (contact_id) => {
    console.log(contact_id);
  };

  return (
    <div className=" w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">All Contacts</h3>
        <div>
          <Checkbox
            isSelected={params.is_view}
            onValueChange={() =>
              setParams({ page: 0, limit: 10, is_view: !params.is_view })
            }
          >
            Is viewed
          </Checkbox>
        </div>
      </div>
      <div className="w-full">
        <TableWrapper
          columns={[
            ...contactModel,
            {
              name: 'Actions',
              uid: 'actions',
              type: 'custom',
              render: (data) =>
                !data.is_view && (
                  <Button size="sm" onClick={() => handleContactView(data.id)}>
                    Set Viewed
                  </Button>
                ),
            },
          ]}
          data={data}
        />
      </div>
    </div>
  );
};

const contactModel = [
  { name: 'ID', uid: 'id', type: 'text' },
  { name: 'Client', uid: 'model_user', type: 'user' },
  { name: 'Comment', uid: 'comment', type: 'text' },
  { name: 'Viewed', uid: 'is_view', type: 'boolean' },
];
