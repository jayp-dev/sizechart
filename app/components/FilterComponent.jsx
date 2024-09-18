import { TextField, ChoiceList, RangeSlider } from '@shopify/polaris';

export const FilterComponent = ({
    filters,
    queryValue,
    onQueryChange,
    onQueryClear,
    appliedFilters,
    handleFiltersClearAll,
}) => {
    return (
        <>
            {filters.map((filter) => (
                <div key={filter.key}>
                    {filter.label}
                    {filter.filter}
                </div>
            ))}
            <TextField
                value={queryValue}
                onChange={onQueryChange}
                onClearButtonClick={onQueryClear}
                placeholder="Search..."
            />
            {/* <button onClick={handleFiltersClearAll}>Clear All Filters</button> */}
            <div>{appliedFilters.map((applied) => applied.label)}</div>
        </>
    );
};
