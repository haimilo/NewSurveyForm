import { WebPartContext } from '@microsoft/sp-webpart-base';
export interface INewSurveyProps {
  description: string;
  userDisplayName: string;
  userDisplayEmail: string;
  context: WebPartContext;
}
