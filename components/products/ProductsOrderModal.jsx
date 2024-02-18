import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { getCatalog } from '../../api';
import { ReactSortable } from 'react-sortablejs';

const ProductsOrderModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [data, setData] = useState(null);
  const onClose = () => setIsOpen(false);

  const onSubmit = () => {
    const result = {};
    for (let i = 0; i < initialData.length; i++) {
      if (initialData[i].id !== data[i].id) result[data[i].id] = i + 1;
    }
    console.log(result);
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
