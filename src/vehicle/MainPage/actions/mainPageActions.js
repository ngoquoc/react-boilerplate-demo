import { createAction } from 'redux-actions';
import { Network } from 'utils';
export const fetchMostviewData = createAction(
  'FETCH_MOSTVIEW_DATA',
  async () => {
    const result = await Network().get('vehicle-ads/mostview/?page=1');
    return result;
  },
);
