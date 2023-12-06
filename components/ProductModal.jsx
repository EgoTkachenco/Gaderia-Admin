import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Checkbox,
  Image,
} from '@nextui-org/react';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';

const new_product = {
  header: '',
  description: '',
  price: 0,
  type_measurement: 'KG',
  type_product: 'APPLE',
  measurement: '',
  is_discount: false,
  price_discount: 0,
  type_apple: 'GALA',
  photo: null,
};

const ProductModal = ({ isOpen, onClose, onSubmit }) => {
  const form = useForm({
    initialValues: new_product,

    validate: {
      header: (value) => (value ? null : 'Field Required'),
      description: (value) => (value ? null : 'Field Required'),
      price: (value) => (value ? null : 'Field Required'),
      type_measurement: (value) => (value ? null : 'Field Required'),
      type_product: (value) => (value ? null : 'Field Required'),
      measurement: (value) => (value ? null : 'Field Required'),
      type_apple: (value) => (value ? null : 'Field Required'),
    },
  });

  const onFormSubmit = () => {
    debugger;
    form.validate();
    if (form.isValid()) {
      const formData = new FormData(document.getElementById('product-form'));
      formData.append('photo', formData.get('file'));
      formData.delete('file');
      onSubmit(formData)
        .then(() => {
          onClose();
        })
        .catch((err) => form.setErrors(err.error));
    }
  };

  useEffect(() => {
    form.reset();
  }, [isOpen]);

  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">New Product</ModalHeader>
        <ModalBody>
          <form
            id="product-form"
            className="flex gap-4"
            onSubmit={onFormSubmit}
          >
            <div className="flex flex-col gap-4 flex-grow">
              <Input
                name="header"
                label="Header"
                placeholder="Enter header"
                {...form.getInputProps('header')}
                errorMessage={form.getInputProps('header').error}
                labelPlacement="outside"
              />

              <Input
                name="description"
                label="Description"
                placeholder="Enter description"
                {...form.getInputProps('description')}
                errorMessage={form.getInputProps('description').error}
                labelPlacement="outside"
              />

              <Input
                name="type_measurement"
                label="Measure Type"
                placeholder="Enter measurement type"
                {...form.getInputProps('type_measurement')}
                errorMessage={form.getInputProps('type_measurement').error}
                labelPlacement="outside"
              />

              <Input
                type="number"
                name="measurement"
                label="Measurement"
                placeholder="Enter measurement"
                {...form.getInputProps('measurement')}
                errorMessage={form.getInputProps('measurement').error}
                labelPlacement="outside"
              />
              <Input
                name="type_product"
                readOnly
                label="Product type"
                placeholder="Enter product type"
                {...form.getInputProps('type_product')}
                errorMessage={form.getInputProps('type_product').error}
                labelPlacement="outside"
              />

              <Input
                name="type_apple"
                label="Apple type"
                placeholder="Enter apple type"
                {...form.getInputProps('type_apple')}
                errorMessage={form.getInputProps('type_apple').error}
                labelPlacement="outside"
              />
            </div>
            <div className="flex flex-col gap-4 flex-grow">
              <Input
                type="number"
                name="price"
                label="Price"
                placeholder="Enter price"
                {...form.getInputProps('price')}
                errorMessage={form.getInputProps('price').error}
                labelPlacement="outside"
              />

              <div className="flex gap-4">
                <Checkbox
                  className="mt-4"
                  name="is_discount"
                  {...form.getInputProps('is_discount')}
                />

                <Input
                  disabled={!form.values.is_discount}
                  type="number"
                  name="price_discount"
                  label="Price discount"
                  placeholder="Enter price discount"
                  {...form.getInputProps('price_discount')}
                  errorMessage={form.getInputProps('price_discount').error}
                  labelPlacement="outside"
                />
              </div>

              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="file"
                >
                  Upload file
                </label>
                <input
                  className="block w-full mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file"
                  name="file"
                  type="file"
                  placeholder="Choose photo"
                  errorMessage={form.getInputProps('photo').error}
                  // {...form.getInputProps('photo')}
                  files={
                    form.getInputProps('photo').value
                      ? [form.getInputProps('photo').value]
                      : []
                  }
                  onChange={(e) => {
                    debugger;
                    form.setFieldValue('photo', e.target.files[0]);
                  }}
                />

                {form.getInputProps('photo')?.value && (
                  <Image
                    src={URL.createObjectURL(form.getInputProps('photo').value)}
                    alt="Picture"
                    width={200}
                    height={200}
                    style={{ objectFit: 'contain' }}
                  />
                )}
              </div>

              {/* <Input
                type="file"
                name="price_discount"
                label="Photo"
                placeholder="Choose photo"
                {...form.getInputProps('photo')}
                errorMessage={form.getInputProps('photo').error}
                labelPlacement="outside"
              /> */}
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onClick={onClose}>
            Close
          </Button>
          <Button color="primary" onClick={onFormSubmit}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProductModal;
