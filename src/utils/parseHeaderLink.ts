import {HeaderLinks} from '../http-common';

export const parseLinkHeader = (linkHeader: string): HeaderLinks => {
  const linkHeadersArray: string[][] = linkHeader.split(', ').map((header: string) => header.split('; '));
  const linkHeadersMap: string[][] = linkHeadersArray.map((header: string[]) => {
    const thisHeaderRel: string = header[1].replace(/"/g, '').replace('rel=', '');
    const thisHeaderUrl: string = header[0].slice(1, -1);
    return [thisHeaderRel, thisHeaderUrl];
  });
  return Object.fromEntries(linkHeadersMap);
};
