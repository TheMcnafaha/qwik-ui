import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { CheckboxIndicator } from 'packages/kit-headless/src/components/checkbox/checkbox-indicator';
import { MyCheckbox } from 'packages/kit-headless/src/components/checkbox/checkbox';
import { CheckList } from 'packages/kit-headless/src/components/checkbox/checklist';
export default component$(() => {
  return (
    <>
      <h3 id="test123">Pick a cat</h3>
      <CheckList class="flex flex-col gap-3" ariaLabeledBy="test123">
        <MyCheckbox class="flex items-center gap-3 bg-slate-900 pr-2 text-white">
          <CheckboxIndicator class="w-fit bg-slate-600">
            <img
              src="https://cataas.com/cat?width=80&height=80"
              alt="cat"
              width={80}
              height={80}
            />
          </CheckboxIndicator>
          <p>No other stuff is needed here</p>
        </MyCheckbox>

        <MyCheckbox class="bg-slate-900 text-white">
          <div class="flex items-center gap-3">
            <CheckboxIndicator class="w-fit bg-slate-600">
              <img
                src="https://cataas.com/cat?width=80&height=80"
                alt="cat"
                width={80}
                height={80}
              />
            </CheckboxIndicator>
            <p>No other stuff is needed here</p>
          </div>
        </MyCheckbox>
      </CheckList>
    </>
  );
});
