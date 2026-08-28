import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Modal from '../Modal/Modal';
import AddWordForm from '../WordForm/AddWordForm';
import { addWord, fetchWords } from '../../redux/words/operations';
import { selectFilters, selectPage } from '../../redux/words/slice';

const AddWordModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const page = useSelector(selectPage);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    const result = await dispatch(addWord(values));
    setIsSubmitting(false);

    if (addWord.rejected.match(result)) {
      toast.error(result.payload || 'Failed to add word. Please try again.');
      return; // keep modal open so the user can fix the data
    }

    dispatch(fetchWords({ ...filters, page }));
    onClose();
  };

  return (
    <Modal
      title="Add word"
      subtitle="Adding a new word to the dictionary is an important step in enriching the language base and expanding the vocabulary."
      tone="green"
      onClose={onClose}
    >
      <AddWordForm onSubmit={handleSubmit} onCancel={onClose} isSubmitting={isSubmitting} />
    </Modal>
  );
};

export default AddWordModal;
