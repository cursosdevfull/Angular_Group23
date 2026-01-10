import { CanDeactivateFn } from '@angular/router';
import { Deactivate } from '../deactivate.interface';

export const protectGuard: CanDeactivateFn<Deactivate> = (component, currentRoute, currentState, nextState) => {
  return component.hasUnsavedChanges() ? confirm('You have unsaved changes. Do you really want to leave?') : true;
};
