import {
  Combobox,
  ComboboxControl,
  ComboboxIcon,
  ComboboxInput,
  ComboboxLabel,
  ComboboxListbox,
  ComboboxOption,
  ComboboxPopover,
  ComboboxTrigger,
  ResolvedOption,
} from '@qwik-ui/headless';

import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const selectedOptionIndexSig = useSignal<number>(-1);

  const objectExample = [
    { testValue: 'alice', testLabel: 'Alice', disabled: true },
    { testValue: 'joana', testLabel: 'Joana', disabled: true },
    { testValue: 'malcolm', testLabel: 'Malcolm', disabled: false },
    { testValue: 'zack', testLabel: 'Zack', disabled: true },
    { testValue: 'brian', testLabel: 'Brian', disabled: false },
    { testValue: 'ryan', testLabel: 'Ryan', disabled: false },
    { testValue: 'joe', testLabel: 'Joe', disabled: false },
    { testValue: 'randy', testLabel: 'Randy', disabled: false },
    { testValue: 'david', testLabel: 'David', disabled: true },
    { testValue: 'joseph', testLabel: 'Joseph', disabled: false },
  ];

  type MyData = {
    testValue: string;
    testLabel: string;
    disabled: boolean;
  };

  return (
    <Combobox
      options={objectExample}
      optionValueKey="testValue"
      optionLabelKey="testLabel"
      optionDisabledKey="disabled"
      bind:selectedIndex={selectedOptionIndexSig}
    >
      <ComboboxLabel class="font-semibold">Personal Trainers ⚡</ComboboxLabel>
      <ComboboxControl class="rounded-base relative flex items-center border">
        <ComboboxInput
          placeholder="Jim"
          class="px-d2 bg-background placeholder:text-muted-foreground rounded-base w-44 px-2 pr-6"
        />
        <ComboboxTrigger class="group absolute right-0 h-6 w-6">
          <ComboboxIcon class="stroke-white transition-transform duration-500 group-aria-expanded:-rotate-180" />
        </ComboboxTrigger>
      </ComboboxControl>
      <ComboboxPopover class="rounded-sm" gutter={8}>
        <ComboboxListbox
          class="rounded-base w-44 border-[1px] border-slate-400 px-4 py-2 dark:bg-slate-900 dark:text-white"
          optionRenderer$={(option: ResolvedOption, index: number) => {
            const myData = option.option as MyData;
            return (
              <ComboboxOption
                key={option.key}
                resolved={option}
                index={index}
                class="hover:bg-accent aria-disabled:text-muted-foreground aria-disabled:hover:bg-muted aria-selected:border-border aria-selected:bg-accent rounded-base group flex justify-between border border-transparent px-2 aria-disabled:font-light aria-selected:cursor-pointer"
              >
                <span>{myData.testLabel}</span>
                {selectedOptionIndexSig.value === index && <span>Selected</span>}
              </ComboboxOption>
            );
          }}
        />
      </ComboboxPopover>
    </Combobox>
  );
});
