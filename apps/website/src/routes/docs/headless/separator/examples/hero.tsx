import { component$ } from '@builder.io/qwik';
import { Separator } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <>
      <div>
        <div>
          <div>
            <h1 class="text-lg">Qwik UI Headless</h1>
            <p class="text-sm">Accessible, Unstyled Qwik UI Components</p>
          </div>
          <Separator orientation="horizontal" class="my-1 h-px bg-slate-50" />
          <menu class="flex gap-2">
            <li>
              <a class="border-none" href="/docs/headless/introduction/">
                Introduction
              </a>
            </li>
            <Separator orientation="vertical" class="mx-1 w-px bg-slate-50" />
            <li>
              {' '}
              <a class="border-none" href="/docs/headless/install/">
                Installation
              </a>
            </li>
            <Separator orientation="vertical" class="mx-1 w-px bg-slate-50" />
            <li>
              <a class="border-none" href="/docs/headless/contributing/">
                Contributing
              </a>
            </li>
          </menu>
        </div>
      </div>
    </>
  );
});
