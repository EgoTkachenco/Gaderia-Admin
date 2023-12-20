import { User, Tooltip, Chip, Image } from '@nextui-org/react';
import React from 'react';
import { DeleteIcon } from '../icons/table/delete-icon';
import { EditIcon } from '../icons/table/edit-icon';
import { EyeIcon } from '../icons/table/eye-icon';

export const RenderCell = ({ data, columnData, type, column }) => {
  const getWidthStyles = () => ({
    maxWidth: column?.width || 'unset',
    minWidth: column?.width || 'unset',
  });
  switch (type) {
    // case 'name':
    //   return (
    //     <User
    //       avatarProps={{
    //         src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
    //       }}
    //       name={cellValue}
    //     >
    //       {user.email}
    //     </User>
    //   );
    // case 'role':
    //   return (
    //     <div>
    //       <div>
    //         <span>{cellValue}</span>
    //       </div>
    //       <div>
    //         <span>{user.team}</span>
    //       </div>
    //     </div>
    //   );
    // case 'status':
    // return (
    //   <Chip
    //     size="sm"
    //     variant="flat"
    //     color={
    //       cellValue === 'active'
    //         ? 'success'
    //         : cellValue === 'paused'
    //         ? 'danger'
    //         : 'warning'
    //     }
    //   >
    //     <span className="capitalize text-xs">{cellValue}</span>
    //   </Chip>
    // );
    case 'boolean':
      return data ? 'true' : 'false';
    case 'actions':
      return (
        <div className="flex items-center gap-4 ">
          <div>
            <Tooltip content="Details">
              <button onClick={() => console.log('View user', user.id)}>
                <EyeIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Edit user" color="secondary">
              <button onClick={() => console.log('Edit user', user.id)}>
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip
              content="Delete user"
              color="danger"
              onClick={() => console.log('Delete user', user.id)}
            >
              <button>
                <DeleteIcon size={20} fill="#FF0080" />
              </button>
            </Tooltip>
          </div>
        </div>
      );
    case 'user':
      return (
        <div className="flex flex-col gap-2">
          <span>{data.full_name}</span>
          <span>{data.email}</span>
          <span>{data.number}</span>
        </div>
      );
    case 'picture':
      return (
        <div style={getWidthStyles()}>
          <Image
            src={data}
            alt="picture"
            width={150}
            height={150}
            style={{ objectFit: 'contain ' }}
          />
        </div>
      );
    case 'long-text':
      return (
        <div title={data} className="line-clamp-3" style={getWidthStyles()}>
          {data}
        </div>
      );
    case 'custom':
      return column.render(columnData);
    case 'text':
    default:
      return (
        <div className="line-clamp-1" style={getWidthStyles()}>
          {data}
        </div>
      );
  }
};
