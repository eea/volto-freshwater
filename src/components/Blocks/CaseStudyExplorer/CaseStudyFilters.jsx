export default function CaseStudyFilters(props) {
  const { filters, activeFilters, setActiveFilters } = props;
  const showInputs = (event, elementId) => {
    var inputsWrapper = document.getElementById(elementId);

    if (!inputsWrapper) return;

    var width = event.target.clientWidth;
    var display = inputsWrapper.style.display;

    if (display === 'block') {
      inputsWrapper.style.display = 'none';
    } else {
      inputsWrapper.style.display = 'block';
      inputsWrapper.style.width = width + 'px';
    }
  };

  return (
    <>
      <div className="filter-wrapper">
        <h4 onClick={(e) => showInputs(e, 'type-filter')}>Light or In-depth</h4>
        <div className="filter-inputs-wrapper" id="type-filter">
          {Object.entries(filters?.nwrm_type || {}).map(
            ([value, label], index) => (
              <div className="filter-input" key={index}>
                <span>{label}</span>
                <input
                  value={value}
                  type="checkbox"
                  onChange={(e) => {
                    const temp = JSON.parse(JSON.stringify(activeFilters));
                    if (e.target.checked) {
                      temp.nwrm_type.push(e.target.value);
                    } else {
                      temp.nwrm_type = temp.nwrm_type.filter((value) => {
                        if (value !== e.target.value) return value;
                        return null;
                      });
                    }
                    setActiveFilters(temp);
                  }}
                />
              </div>
            ),
          )}
        </div>
      </div>
      <div className="filter-wrapper">
        <h4 onClick={(e) => showInputs(e, 'nwrms-impl-filter')}>
          NWRMs implemented
        </h4>
        <div>
          <div className="filter-inputs-wrapper" id="nwrms-impl-filter">
            {Object.entries(filters?.nwrms_implemented || {}).map(
              ([value, label], index) => (
                <div className="filter-input" key={index}>
                  <span>{label}</span>
                  <input
                    value={value}
                    type="checkbox"
                    onChange={(e) => {
                      const temp = JSON.parse(JSON.stringify(activeFilters));
                      if (e.target.checked) {
                        temp.nwrms_implemented.push(e.target.value);
                      } else {
                        temp.nwrms_implemented = temp.nwrms_implemented.filter(
                          (value) => {
                            if (value !== e.target.value) return value;
                            return null;
                          },
                        );
                      }
                      setActiveFilters(temp);
                    }}
                  />
                </div>
              ),
            )}
          </div>
        </div>
      </div>
      <div className="filter-wrapper">
        <h4 onClick={(e) => showInputs(e, 'sectors-filter')}>Sectors</h4>
        <div>
          <div className="filter-inputs-wrapper" id="sectors-filter">
            {Object.entries(filters?.sectors || {}).map(
              ([value, label], index) => (
                <div className="filter-input" key={index}>
                  <span>{label}</span>
                  <input
                    value={value}
                    type="checkbox"
                    onChange={(e) => {
                      const temp = JSON.parse(JSON.stringify(activeFilters));
                      if (e.target.checked) {
                        temp.sectors.push(e.target.value);
                      } else {
                        temp.sectors = temp.sectors.filter((value) => {
                          if (value !== e.target.value) return value;
                          return null;
                        });
                      }
                      setActiveFilters(temp);
                    }}
                  />
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </>
  );
}
