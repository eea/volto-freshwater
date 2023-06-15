import React from 'react';

const CaseStudyFilter = (props) => {
  const {
    filterTitle,
    filters,
    activeFilters,
    setActiveFilters,
    filterName,
  } = props;

  const showInputs = (event) => {
    event.currentTarget.parentElement.classList.add('active');
    // debugger;
  };

  return (
    <div className="filter-wrapper">
      <button
        className="ui basic button facet-btn"
        onClick={(e) => showInputs(e)}
        handleKeyDown={() => {}}
      >
        <span>{filterTitle}</span>
        <i aria-hidden="true" className="icon ri-arrow-down-s-line"></i>
      </button>
      <div className="filter-inputs-wrapper">
        <div className="filter-inputs">
          {Object.entries(filters?.[filterName] || {}).map(
            ([value, label], index) => (
              <div className="filter-input" key={index}>
                <input
                  value={value}
                  type="checkbox"
                  onChange={(e) => {
                    const temp = JSON.parse(JSON.stringify(activeFilters));
                    if (e.target.checked) {
                      temp[filterName].push(e.target.value);
                    } else {
                      temp[filterName] = temp[filterName].filter((value) => {
                        if (value !== e.target.value) return value;
                        return null;
                      });
                    }
                    setActiveFilters(temp);
                  }}
                />
                <span>{label}</span>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default function CaseStudyFilters(props) {
  const { filters, activeFilters, setActiveFilters } = props;

  React.useEffect(() => {
    window.addEventListener('click', (event) => {
      const filters = document.getElementsByClassName('filter-wrapper');

      for (let i = 0; i < filters.length; i++) {
        if (!filters[i].contains(event.target)) {
          filters[i].classList.remove('active');
        }
      }
    });
  }, []);

  return (
    <>
      <CaseStudyFilter
        filterTitle="Light or In-depth"
        filterName="nwrm_type"
        filters={filters}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
      />

      <CaseStudyFilter
        filterTitle="NWRMs implemented"
        filterName="nwrms_implemented"
        filters={filters}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
      />

      <CaseStudyFilter
        filterTitle="Sectors"
        filterName="sectors"
        filters={filters}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
      />
    </>
  );
}
