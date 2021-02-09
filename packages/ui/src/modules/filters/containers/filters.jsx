import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import {
  Divider,
  Dropdown,
  Icon,
  Pagination,
  SegmentedControl,
  SegmentedControlItem,
  Toolbar,
  ToolbarLeft,
  ToolbarRight
} from 'yarn-design-system-react-components';
import { setFilters } from '../../../store/actions';
import { I18nContext } from '../../../locales/i18n';

const TYPE_FILTER_OPTIONS = [
  { value: '', placeholder: true },
  { value: 'clima', customProperties: { icon: 'ila' } },
  { value: 'cycling', customProperties: { icon: 'ila' } },
  { value: 'hiking', customProperties: { icon: 'ila' } },
  { value: 'rugby', customProperties: { icon: 'ila' } },
  { value: 'swimming', customProperties: { icon: 'ila' } }
];

const SORTING_FILTER_OPTIONS = [
  { value: '', placeholder: true },
  { value: 'asc', customProperties: { icon: 'arrow-chart-up' } },
  { value: 'desc', customProperties: { icon: 'arrow-chart-down' } }
];

export function FiltersContainer({ className }) {
  const _className = cn('filters', className);

  const t = useContext(I18nContext);
  const dispatch = useDispatch();
  const { filters: { horizontal, pagination, sorting, type } } = useSelector(({ filters }) => filters);
  const { page, totalPages } = pagination;
  const { property, direction } = sorting;

  const typeOptions = TYPE_FILTER_OPTIONS.map((option) => ({
    ...option,
    label: t(`filters.types.${ option.value || 'default' }`),
    selected: option.value === type
  }));

  const sortingOptions = SORTING_FILTER_OPTIONS.map((option) => ({
    ...option,
    label: t(`filters.sortings.${ option.value || 'default' }`),
    selected: option.value === direction
  }));

  function handleTypeChange({ options: type }) {
    dispatch(setFilters({ filters: { type } }));
  }

  function handleSortingChange({ options: direction }) {
    dispatch(setFilters({ filters: { sorting: { property, direction } } }));
  }

  function handlePageChange(page) {
    dispatch(setFilters({ filters: { pagination: { page, totalPages } } }));
  }

  function handleVisualizationChange() {
    dispatch(setFilters({ filters: { horizontal: !horizontal } }));
  }

  const typeFilter = (
    <Dropdown className="filters__type space-m-h-1 space-m-b-0"
        id="typeFilter"
        name="typeFilter"
        type="single"
        size="sm"
        leadingIcon="others-misc"
        placeholder="true"
        removeItemButton={ true }
        options={ typeOptions }
        onChange={ handleTypeChange } />
  );

  const sortingFilter = (
    <>
      <span className="label space-m-r-1">{ t('filters.sorting') }:</span>
      <Dropdown className="filters__sorting space-m-h-3 space-m-b-0"
          id="sortingFilter"
          name="sortingFilter"
          type="single"
          size="sm"
          leadingIcon="fetch"
          placeholder="true"
          removeItemButton={ true }
          options={ sortingOptions }
          onChange={ handleSortingChange } />
    </>
  );

  const paginationFilter = (
    <>
      <Pagination className="filters__pagination space-m-l-2 space-m-b-0"
          type="input"
          totalPages={ totalPages }
          selectedPage={ page }
          onChangePage={ handlePageChange } />
      <span className="label space-m-l-1 space-m-r-3">
        { t('filters.pagination', { totalPages }) }
      </span>
    </>
  );

  const visualizationFilter = (
    <SegmentedControl className="space-m-h-2" type="radio" size="sm" onChange={ handleVisualizationChange }>
      <SegmentedControlItem itemId="grid" type="icon" active={ !horizontal }>
        <Icon name="app-switch-top-bar" />
      </SegmentedControlItem>
      <SegmentedControlItem itemId="list" type="icon" active={ horizontal }>
        <Icon name="list-view" />
      </SegmentedControlItem>
    </SegmentedControl>
  );

  return (
    <Toolbar className={ _className }>
      <ToolbarLeft>
        <Icon className="space-m-h-2" name="filter" />
        <Divider type="vertical" />
        { typeFilter }
      </ToolbarLeft>
      <ToolbarRight>

        { sortingFilter }
        <Divider type="vertical" />
        { paginationFilter }
        <Divider type="vertical" />
        { visualizationFilter }
      </ToolbarRight>
    </Toolbar>
  );
}
