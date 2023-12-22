import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@nextui-org/react';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';

const UserModal = ({ user, onClose, onSubmit }) => {
  const isOpen = !!user;
  const form = useForm({
    initialValues: { full_name: '' },

    validate: {
      full_name: (value) => (value ? null : 'Field Required'),
    },
  });

  const onFormSubmit = () => {
    form.validate();
    if (form.isValid()) {
      onSubmit(form.values)
        .then(() => {
          onClose();
        })
        .catch((err) => {
          form.setErrors(err.response?.data?.error);
        });
    }
  };

  useEffect(() => {
    if (isOpen) form.setValues({ full_name: user.full_name });
    return () => {
      form.reset();
    };
  }, [isOpen]);

  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Update User</ModalHeader>
        <ModalBody>
          <form
            id="product-form"
            className="flex gap-4"
            onSubmit={onFormSubmit}
          >
            <div className="flex flex-col gap-4 w-2/4">
              <CInput form={form} id="full_name" name="Full name" isRequired />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onClick={onClose}>
            Close
          </Button>
          <Button color="primary" onClick={onFormSubmit}>
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;

const Row = ({ children }) => (
  <div className="flex gap-4 items-start">{children}</div>
);

const CInput = ({ form, id, name, isHalfWidth, ...props }) => {
  return (
    <Input
      {...getFieldProps(id, name, false, isHalfWidth)}
      value={form.getInputProps(id).value}
      onValueChange={(v) => form.getInputProps(id).onChange(v)}
      // isInvalid={!!form.getInputProps(id).error}
      errorMessage={form.getInputProps(id).error}
      {...props}
    />
  );
};

const getFieldProps = (id, name, isSelect = false, isHalfWidth = false) => ({
  id,
  name: id,
  className: isHalfWidth ? 'w-2/4' : '',
  label: name,
  placeholder: `${isSelect ? 'Select' : 'Enter'} ${name.toLowerCase()}`,
  labelPlacement: 'outside',
});
