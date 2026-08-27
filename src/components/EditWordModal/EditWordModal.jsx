import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Modal from '../Modal/Modal';
import EditWordForm from '../WordForm/EditWordForm';
import { editWord } from '../../redux/words/operations';

const EditWordModal = ({ word, onClose }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    const result = await dispatch(editWord({ wordId: word.id, values }));
    setIsSubmitting(false);

    if (editWord.rejected.match(result)) {
      toast.error(result.payload || 'Failed to save changes. Please try again.');
      return; // keep modal open so the user can fix the data
    }

    onClose();
  };

  return (
    <Modal title="Edit word" onClose={onClose}>
      <EditWordForm word={word} onSubmit={handleSubmit} onCancel={onClose} isSubmitting={isSubmitting} />
    </Modal>
  );
};

export default EditWordModal;
