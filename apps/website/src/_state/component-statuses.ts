import { ComponentStatus } from './component-status.type';

export interface ComponentsStatusesMap {
  [key: string]: ComponentStatus;
}

export type ComponentKitsStatuses = {
  styled: ComponentsStatusesMap;
  headless: ComponentsStatusesMap;
};

export const statusByComponent: ComponentKitsStatuses = {
  styled: {
    Accordion: ComponentStatus.Beta,
    Avatar: ComponentStatus.Draft,
    Alert: ComponentStatus.Beta,
    Badge: ComponentStatus.Beta,
    Breadcrumb: ComponentStatus.Draft,
    Button: ComponentStatus.Beta,
    Card: ComponentStatus.Beta,
    Checkbox: ComponentStatus.Draft,
    Combobox: ComponentStatus.Draft,
    Dropdown: ComponentStatus.Draft,
    Input: ComponentStatus.Draft,
    Label: ComponentStatus.Beta,
    Modal: ComponentStatus.Draft,
    Pagination: ComponentStatus.Draft,
    Popover: ComponentStatus.Draft,
    Progress: ComponentStatus.Draft,
    RadioGroup: ComponentStatus.Draft,
    Select: ComponentStatus.Draft,
    Separator: ComponentStatus.Beta,
    Skeleton: ComponentStatus.Beta,
    Tabs: ComponentStatus.Beta,
    Toggle: ComponentStatus.Draft,
    ToggleGroup: ComponentStatus.Draft,
    Textarea: ComponentStatus.Draft,
  },
  headless: {
    Carousel: ComponentStatus.Beta,
    Combobox: ComponentStatus.Beta,
    Checkbox: ComponentStatus.Draft,
    Dropdown: ComponentStatus.Draft,
    Label: ComponentStatus.Beta,
    Pagination: ComponentStatus.Draft,
    Progress: ComponentStatus.Beta,
    Select: ComponentStatus.Beta,
    Tabs: ComponentStatus.Beta,
    Toggle: ComponentStatus.Beta,
    'Toggle Group': ComponentStatus.Beta,
    Tooltip: ComponentStatus.Beta,
  },
};
