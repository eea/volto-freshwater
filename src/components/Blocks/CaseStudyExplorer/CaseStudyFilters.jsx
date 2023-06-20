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
        <span>
          {filterTitle}
          <i aria-hidden="true" className="icon angle down"></i>
        </span>
      </button>
      <div className="filter-inputs-wrapper">
        {Object.entries(filters?.[filterName] || {}).length > 7 ? (
          <input
            type="text"
            className="filterInputText"
            onKeyUp={(e) => {
              const filterValue = e.currentTarget.value.toUpperCase();
              const inputs = e.currentTarget.nextSibling.children;
              // debugger;

              for (let i = 0; i < inputs.length; i++) {
                let inputValue = inputs[i].textContent || inputs[i].innerText;
                if (inputValue.toUpperCase().indexOf(filterValue) > -1) {
                  inputs[i].style.display = 'block';
                } else {
                  inputs[i].style.display = 'none';
                }
              }
            }}
            placeholder="Quick search"
            title="Type in a name"
          />
        ) : (
          ''
        )}

        <div className="filter-inputs">
          {Object.entries(filters?.[filterName] || {})
            .sort((item1, item2) => item1[1].localeCompare(item2[1]))
            .map(([value, label], index) => (
              <label for={label + index} className="filter-input" key={index}>
                <input
                  value={value}
                  type="checkbox"
                  id={label + index}
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
              </label>
            ))}
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
