import React from 'react';
import { BodyClass } from '@plone/volto/helpers';
import { ItemMetadataSnippet } from '@eeacms/volto-freshwater/components';

import './style.less';

const Sections = [
  {
    id: 'general',
    title: 'General',
  },
  {
    id: 'site_information',
    title: 'Site information',
  },
  {
    id: 'monitoring_maintenance',
    title: 'Monitoring maintenance',
  },
  {
    id: 'performance',
    title: 'Performance',
  },
  {
    id: 'design_and_implementations',
    title: 'Design and implementations',
  },
  {
    id: 'lessons_risks_implications',
    title: 'Lessons, risks, implications...',
  },
  {
    id: 'policy_general_governance',
    title: 'Policy, general governance and design targets',
  },
  {
    id: 'socio_economic',
    title: 'Socio-economic',
  },
  {
    id: 'biophysical_impacts',
    title: 'Biophysical impacts',
  },
];

const Section = (props) => {
  const { content, id, title } = props;
  const data = content[id]?.data || null;

  if (data === null) {
    return <></>;
  }

  return (
    <>
      <h3>{title}</h3>
      <div
        className={id}
        dangerouslySetInnerHTML={{ __html: content[id]?.data }}
      ></div>
    </>
  );
};

const CaseStudyView = (props) => {
  const { content } = props;

  return (
    <>
      <BodyClass className="case-study-view" />

      <div id="page-document" className="ui container">
        <div>
          <div className="metadata-header">
            {/* {content['@type'] && (
              <h3 className="item-type">{formatItemType(content['@type'])}</h3>
            )} */}
            <h1>{content.title}</h1>

            <ItemMetadataSnippet {...props} item={content} />

            {Sections.map((item) => {
              return <Section {...props} id={item.id} title={item.title} />;
              // return <>{item.id}</>;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseStudyView;
