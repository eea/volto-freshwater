import React, { useEffect } from 'react';
import { BodyClass } from '@plone/volto/helpers';
import {
  ItemMetadataSnippet,
  CaseStudyExplorer,
} from '@eeacms/volto-freshwater/components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './style.less';

const MeasureView = (props) => {
  const { content } = props;

  // Compare alphanumeric strings, used for sorting both lexicographically and numerically
  const compareAlphanumericStrings = (firstInput, secondInput) => {
    const regex = /(\d+)|(\D+)/g;
    const firstInputArray = String(firstInput).match(regex);
    const secondInputArray = String(secondInput).match(regex);

    while (firstInputArray.length > 0 && secondInputArray.length > 0) {
      const partA = firstInputArray.shift();
      const partB = secondInputArray.shift();

      if (partA !== partB) {
        const isNumberA = /^\d+$/.test(partA);
        const isNumberB = /^\d+$/.test(partB);

        if (isNumberA && isNumberB) {
          return Number(partA) - Number(partB);
        } else if (isNumberA) {
          return -1;
        } else if (isNumberB) {
          return 1;
        } else {
          return partA.localeCompare(partB);
        }
      }
    }

    return firstInputArray.length - secondInputArray.length;
  };

  useEffect(() => {
    // Add a class with the coresponding level from the table
    const fieldItems = document.querySelectorAll('.field--name-field-level');
    fieldItems.forEach((fieldItem) => {
      const innerText = fieldItem.textContent;

      if (innerText === 'High') {
        fieldItem.classList.add('high');
      }
      if (innerText === 'Medium') {
        fieldItem.classList.add('medium');
      }
      if (innerText === 'Low') {
        fieldItem.classList.add('low');
      }
    });

    const table = document.querySelector(
      '#paragraph-nwrm_benefits_w_level tbody',
    );
    const rows = Array.from(table.rows);

    let previousLevel = null;

    // Rearrange rows from the table based on their level. (The rows with the level 'High' appear first, then 'Medium,' and then 'Low.')
    rows.sort((a, b) => {
      // Sort rows by levels
      const levelA = a.querySelector('.field--name-field-level').textContent;
      const levelB = b.querySelector('.field--name-field-level').textContent;
      const textA = a.querySelector('.field--name-field-nwrm-benefits-2')
        .textContent;
      const textB = b.querySelector('.field--name-field-nwrm-benefits-2')
        .textContent;

      if (levelA === levelB) {
        // If levels are the same, sort alphabetically by text
        return compareAlphanumericStrings(textA, textB);
      } else if (levelA === 'High') {
        return -1;
      } else if (levelB === 'High') {
        return 1;
      } else if (levelA === 'Medium') {
        return -1;
      } else if (levelB === 'Medium') {
        return 1;
      } else {
        return 0; // Default case: 'Low' or any other value
      }
    });

    rows.forEach((row) => {
      table.appendChild(row);
      const level = row.querySelector('.field--name-field-level').textContent;

      if (level !== previousLevel) {
        const levelCell = row.querySelector('.field--name-field-level');
        levelCell.classList.add('show-level');
        previousLevel = level;
      }
    });
  }, []);

  return (
    <>
      <BodyClass className="measure-view" />

      <div id="page-document" className="ui container">
        <div>
          <div className="metadata-header">
            <h1>{content.title}</h1>

            <ItemMetadataSnippet {...props} item={content} />

            <div>
              <div
                class="field__item"
                dangerouslySetInnerHTML={{
                  __html: content.measure_summary.data,
                }}
              ></div>
            </div>

            <br />
            <div class="fullwidthZ">
              <div class="images-container">
                <div class="image-flexbox">
                  <div>
                    {content.items.map(
                      (item) =>
                        item['@type'] === 'Image' && (
                          <div class="image-wrapper">
                            <div>
                              <a href={item['@id'] + '/@@images/image'}>
                                <LazyLoadImage
                                  src={item['@id'] + '/@@images/image/preview'}
                                  title={item.title}
                                  alt={item.title}
                                />
                              </a>
                            </div>
                            <div>
                              <div class="image-title">{item.title}</div>
                              {item.description.includes('http') ? (
                                <div>
                                  <a href={item.description.split(': ')[1]}>
                                    Source
                                  </a>
                                </div>
                              ) : (
                                <div class="image-source">
                                  Source: {item.description.split(': ')[1]}
                                </div>
                              )}
                            </div>
                          </div>
                        ),
                    )}
                  </div>
                  <div>
                    <div class="field--label-inline">
                      <div class="field__label">NWRM code</div>
                      <div class="field__item">{content.measure_code}</div>
                    </div>

                    <div class="field--label-inline">
                      <div class="field__label">Sector</div>
                      <div class="field__item">{content.measure_sector}</div>
                    </div>

                    {content.other_sector && (
                      <>
                        <br />
                        <div class="field--label-inline">
                          <div class="field__label">Other sector(s)</div>
                          <div class="field__item">{content.other_sector}</div>
                        </div>
                      </>
                    )}

                    <div>
                      <div class="field--label-inline">
                        <div class="field__label">Complete description</div>
                        <div class="field__item">
                          {content.items.map(
                            (item) =>
                              item['@type'] === 'File' && (
                                <a
                                  href={item['@id'] + '/@@images/file'}
                                  rel="noreferrer"
                                  target="_blank"
                                >
                                  {item.title}
                                </a>
                              ),
                          )}
                        </div>
                      </div>
                    </div>

                    <br />
                  </div>
                </div>
              </div>
            </div>

            <br />
            <div>
              <h3>Benefits</h3>
              <div
                class="field__item"
                dangerouslySetInnerHTML={{
                  __html: content.possible_benefits.data,
                }}
              ></div>
            </div>

            <br />
            {content.case_studies && (
              <div>
                <h3>Case studies</h3>
                <div class="field__item">
                  <ul>
                    {content.case_studies.map((item) => (
                      <li key={item['@id']}>
                        <a href={item['@id']}>{item.title}</a>
                      </li>
                    ))}{' '}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        <CaseStudyExplorer caseStudies={content.case_studies} />
      </div>
    </>
  );
};

export default MeasureView;
