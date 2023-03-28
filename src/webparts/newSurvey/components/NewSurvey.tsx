import * as React from 'react';
import CurrentTime from './CurrentTime/CurrentTime';
import CurrentUser from './CurrentUser/CurrentUser';
// import styles from './NewSurvey.module.scss';
import { INewSurveyProps } from './INewSurveyProps';
import MySurveyForm from './MySurveyForm/MySurveyForm';
// import { escape } from '@microsoft/sp-lodash-subset';

const NewSurvey = (props: INewSurveyProps) => {
  const {
    userDisplayName,
    userDisplayEmail,
    context,
  } = props;
  return (
    <section>
      <CurrentUser
        userDisplayName={userDisplayName}
        userDisplayEmail={userDisplayEmail}
      />
      <CurrentTime />
      <MySurveyForm
        context={context}
        userDisplayEmail={userDisplayEmail}
      />
    </section>
  )
}

export default NewSurvey