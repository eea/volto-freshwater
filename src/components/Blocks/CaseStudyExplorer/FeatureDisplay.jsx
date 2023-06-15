import React from 'react';

export default function FeatureDisplay({ feature }) {
  return feature ? (
    <div id="csepopup">
      <h3>
        <strong>
          <a target="_blank" rel="noreferrer" href={feature.path}>
            {feature.title}
          </a>
        </strong>
      </h3>
      <div>
        <h4>Light or In-depth</h4>
        <span>{feature.nwrm_type}</span>
      </div>
      <div>
        <h4>NWRMs implemented</h4>
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
        <h4>Sectors </h4>
        <ul>
          {feature.sectors.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>

        {/* <span>{feature.sectors.join(', ')}</span> */}
      </div>
      {/* <span
        dangerouslySetInnerHTML={{
          __html: feature.adaptation_options_links.replace('<>', '; '),
        }}
      ></span> */}
    </div>
  ) : null;
}
