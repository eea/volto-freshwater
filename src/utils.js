import React from 'react';
import config from '@plone/volto/registry';
import { flattenToAppURL } from '@plone/volto/helpers';

export const getPath = (url) =>
  url.startsWith('http') ? new URL(url).pathname : url;

export const getScaleUrl = (url, size) =>
  (url || '').includes(config.settings.apiPath)
    ? `${flattenToAppURL(url.replace('/api', ''))}/@@images/image/${size}`
    : `${url.replace('/api', '')}/@@images/image/${size}`;

export const useCopyToClipboard = (text) => {
  const [copyStatus, setCopyStatus] = React.useState('inactive');
  const copy = React.useCallback(() => {
    navigator.clipboard.writeText(text).then(
      () => setCopyStatus('copied'),
      () => setCopyStatus('failed'),
    );
  }, [text]);

  React.useEffect(() => {
    if (copyStatus === 'inactive') {
      return;
    }

    const timeout = setTimeout(() => setCopyStatus('inactive'), 3000);

    return () => clearTimeout(timeout);
  }, [copyStatus]);

  return [copyStatus, copy];
};
