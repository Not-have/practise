import { initRequest } from '@/utils/fetch';
import type { IDataDataListDemo } from '../types';
import { fixDemoListData } from '../fix-data';

export default function dataDemoList(): Promise<IDataDataListDemo[]> {
  return initRequest({
    url: 'https://mock.mengxuegu.com/mock/60434bccf340b05bceda3906/practise-nuxtjs/list'
  })
    .then(fixDemoListData)
    .catch((err) => {
      throw new Error(err);
    });
}
