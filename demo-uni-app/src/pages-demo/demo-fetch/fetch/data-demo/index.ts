import { initRequest } from '@/utils/fetch';

import type { IDataDataDemo } from '../types';

import { fixDemoData } from '../fix-data';

export default function dataDemo(): Promise<IDataDataDemo> {
  return initRequest<IDataDataDemo>({
    url: 'https://mock.mengxuegu.com/mock/61922927f126df7bfd5b79ef/promise/promise3#!method=get',
    method: 'GET'
  })
    .then(fixDemoData)
    .catch((err) => {
      throw new Error(err);
    });
}
