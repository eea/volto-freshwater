import React from 'react';

export default function FeatureDisplay({ feature }) {
  return feature ? (
    <div id="csepopup">
      <div>
        <strong>{feature.title}</strong>
      </div>
      <div>
        <span>Light or In-depth: </span>
        <span>{feature.nwrm_type}</span>
      </div>
      <div>
        <span>NWRMs implemented: </span>
        <ul>
          {feature.nwrms_implemented.map((item, index) => {
            return (
              <li key={index}>
                <a target="_blank" rel="noreferrer" href={item['path']}>
                  {item['title']}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <span>Sectors: </span>
        <span>{feature.sectors.join(', ')}</span>
      </div>
      {/* <span
        dangerouslySetInnerHTML={{
          __html: feature.adaptation_options_links.replace('<>', '; '),
        }}
      ></span> */}
    </div>
  ) : null;
}