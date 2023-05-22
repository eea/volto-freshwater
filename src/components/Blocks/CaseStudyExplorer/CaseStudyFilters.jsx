export default function CaseStudyFilters(props) {
  const { filters, activeFilters, setActiveFilters } = props;
  return (
    <>
      <h4>Light or In-depth</h4>
      {Object.entries(filters?.nwrm_type || {}).map(([value, label], index) => (
        <p key={index}>
          <span>{label}</span>
          <input
            value={value}
            type="checkbox"
            onChange={(e) => {
              // const value =
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
        </p>
      ))}
      <h4>NWRMs implemented</h4>
      {Object.entries(filters?.nwrms_implemented || {}).map(([value, label], index) => (
        <p key={index}>
          <span>{label}</span>
          <input
            value={value}
            type="checkbox"
            onChange={(e) => {
              // const value =
              const temp = JSON.parse(JSON.stringify(activeFilters));
              if (e.target.checked) {
                temp.nwrms_implemented.push(e.target.value);
              } else {
                temp.nwrms_implemented = temp.nwrms_implemented.filter((value) => {
                  if (value !== e.target.value) return value;
                  return null;
                });
              }
              setActiveFilters(temp);
            }}
          />
        </p>
      ))}
    </>
  );
}
