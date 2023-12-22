import React, { useMemo, useState } from 'react';
import { TableWrapper } from '../table/table';
import { getUsers, updateUser, deleteUser } from '../../api';
import useTableAPIRequest from '../hooks/useTableAPIRequest';
import UserModal from './UserModal';

export const Users = () => {
  const { data, params, isFetch, onRequest } = useTableAPIRequest(getUsers);
  const [activeUser, setActiveUser] = useState(null);
  const handleUser = (user) => {
    return updateUser({ ...user, id: activeUser.id }).then(() => {
      onRequest();
    });
  };

  const handleUserDelete = (id) => {
    deleteUser(id).then(() => {
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
        <h3 className="text-xl font-semibold">All Users</h3>
      </div>
      <div className="w-full">
        {!isFetch && (
          <TableWrapper
            columns={userModel}
            data={formatedData}
            onUpdate={(item) => setActiveUser(item)}
            onDelete={(id) => handleUserDelete(id)}
          />
        )}
        {isFetch && <div>Loading...</div>}
      </div>
      <UserModal
        user={activeUser}
        onClose={() => setActiveUser(null)}
        onSubmit={handleUser}
      />
    </div>
  );
};

const userModel = [
  { name: 'ID', uid: 'id', type: 'text' },
  { name: 'Company', uid: 'company', type: 'company', width: '150px' },
  { name: 'User', uid: 'user', type: 'user', width: '250px' },
  {
    name: 'Role',
    uid: 'role',
    type: 'text',
    width: '150px',
  },
  { name: 'Bank', uid: 'bank', type: 'bank' },
  { name: 'Address', uid: 'address', type: 'full_address' },
  { uid: 'actions', type: 'actions' },
];
