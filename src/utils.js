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

export const formatItemType = (item) => {
  const type =
    item
      .replace('_', ' / ')
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ') || '';
  return type;
};

export const doStringifySearchquery = (querystring) => {
  const params = new URLSearchParams(querystring);
  let obj = {};
  for (var key of params.keys()) {
    obj[key] = params.getAll(key);
  }
  return JSON.stringify(obj);
};

export const deStringifySearchquery = (searchparamstring) => {
  const obj = JSON.parse(searchparamstring);
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(obj)) {
    for (const el of value) {
      params.append(key, el);
    }
  }
  return params.toString();
};
