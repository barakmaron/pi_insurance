import React, { useCallback, useEffect } from 'react';
import Modal from '../Modal/Modal';
import View from '../View/View';
import Form from '../Form/Form';
import useView from '../../Hooks/useView';
import Constants from '../../Constants';
import SendApiRequest from '../../services/ApiService';

const EmailFromModal = ({
    show,
    setShow
}) => {

    const view = useView();

    useEffect(() => {
        view.setSuccessful(false);
        view.setFailed(false);
    }, [view]);

    const submit_email = useCallback(async (event, form) => {
        event.preventDefault();
        try {
          const add_email = await SendApiRequest(`/api/email`, Constants.API_METHODS.POST, form);
          view.setSuccessful(true);
          view.setFailed(false);
          view.setMessage(Constants.user_messages.add_email);
          setShow(false);
        } catch (err) {
          view.setFailed(true);
          view.setSuccessful(false)
          view.setMessage(Constants.user_messages.add_email_failed);
        }
      }, [view, setShow]);

  return (<>
  { show && <Modal setClose={() => setShow(false)}>
        <Form inputs={Constants.email_form} action={submit_email}/>
        <View successful={view.successful} failed={view.failed} message={view.message} />
    </Modal>}
  </>);
}

export default EmailFromModal;
