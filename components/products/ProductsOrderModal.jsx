import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { getCatalog, updateCatalog } from '../../api';
import { ReactSortable } from 'react-sortablejs';

const ProductsOrderModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [data, setData] = useState(null);
  const onClose = () => setIsOpen(false);

  const onSubmit = async () => {
    const result = [];
    for (let i = 0; i < initialData.length; i++) {
      if (initialData[i].id !== data[i].id) {
        result.push({ id: data[i].id, order: i + 1 });
      }
    }

    try {
      for (let i = 0; i < result.length; i++) {
        const { id, order } = result[i];
        await updateCatalog({ catalog_id: id, id_sort: order });
      }
      onClose();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (isOpen) {
      getCatalog({ page: 0, limit: 999999 }).then((res) => {
        setInitialData(res.data.data);
        setData(res.data.data);
      });
    }
  }, [isOpen]);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Змінити порядок</Button>
      <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Налаштування порядку продуктів в каталозі
          </ModalHeader>
          <ModalBody>
            {data && (
              <ReactSortable
                list={data}
                setList={setData}
                className="max-h-96 overflow-auto"
              >
                {data.map((item, i) => (
                  <div className="p-2" key={item.id}>
                    {i + 1}
                    {'. '}
                    {item.header}
                  </div>
                ))}
              </ReactSortable>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onClick={onClose}>
              Закрити
            </Button>
            <Button color="primary" onClick={onSubmit}>
              Зберегти
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductsOrderModal;
