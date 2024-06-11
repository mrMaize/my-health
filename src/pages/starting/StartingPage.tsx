import { FC } from 'react';

import { CenteredPage } from '../../layouts';
import { Panel } from '../../shared/components';
import { AddMedicalResultsPopover } from '../../widgets/medicalResults/MedicalResultPopover';
import { ValidatedForm1 } from '../../widgets/validatedForm1/ValidatedForm1';
import { ValidatedFormYup } from '../../widgets/validatedFormYup/ui/ValidatedFormYup';
import { ValidatedReactHookForm } from '../../widgets/validatedReachHookForm/ui/validatedReactHookForm';

const StartingPage: FC = () => {
  return (
    <CenteredPage>
      <Panel width={500} height={700}>
        {/* <AddMedicalResultsPopover /> */}

        {/* <ValidatedForm1 /> */}

        {/* <ValidatedReactHookForm /> */}

        <ValidatedFormYup />
      </Panel>
    </CenteredPage>
  );
};

export default StartingPage;
