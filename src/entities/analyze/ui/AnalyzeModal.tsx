import { FC } from 'react';

import { IAnalyze } from '../types';
import { Modal } from '../../../shared/components/modals';

interface IAnalyzeModalProps {
  analyze?: IAnalyze;
  onModalClose: VoidFunction;
}

const AnalyzeModal: FC<IAnalyzeModalProps> = ({ analyze, onModalClose }) => {
  return (
    <Modal
      title={analyze ? analyze.name : 'Добавить анализ'}
      onClose={onModalClose}
    >
      Hello
    </Modal>
  );
};

const ANALYZE_MODAL_TYPE = 'ANALYZE_MODAL_TYPE';

export { AnalyzeModal, ANALYZE_MODAL_TYPE };
