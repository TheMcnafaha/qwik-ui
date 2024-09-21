import { JSXOutput, component$, $, QRL, useTask$, useSignal } from '@builder.io/qwik';
import {
  PublicType,
  type ComponentParts,
  type SubComponent,
} from 'apps/website/auto-api';
import { APITable, type APITableProps } from './api-table';
type AutoAPIConfig = {
  topHeader?: QRL<(text: string) => JSXOutput>;
  subHeader?: QRL<(text: string) => JSXOutput>;
  props?: QRL<(text: string) => string>;
};

type AnatomyTableProps = {
  api?: ComponentParts;
  config: AutoAPIConfig;
};

type SubComponentProps = {
  subComponent: SubComponent;
  config: AutoAPIConfig;
};
type ParsedCommentsProps = {
  parsedProps: PublicType;
  config: AutoAPIConfig;
};
const currentHeader = $((_: string) => {
  //cannot send h2 from here because current TOC can only read md
  return null;
});

const currentSubHeader = $((text: string) => {
  let subHeader = text.replace(/(p|P)rops/, '');
  const hasCapital = /[a-z][A-Z]/.exec(subHeader)?.index;
  if (hasCapital != undefined) {
    subHeader =
      subHeader.slice(0, hasCapital + 1) + '.' + subHeader.slice(hasCapital + 1);
  }
  return (
    <>
      <h3 class="mb-6 mt-8 scroll-mt-20 text-xl font-semibold">{subHeader}</h3>
    </>
  );
});

const removeQuestionMarkFromProp = $((text: string) => {
  return text.replace('?', '');
});
const defaultConfig: AutoAPIConfig = {
  topHeader: currentHeader,
  subHeader: currentSubHeader,
  props: removeQuestionMarkFromProp,
};
export const AutoAPI = component$<AnatomyTableProps>(
  ({ api, config = defaultConfig }) => {
    if (api === undefined) {
      return null;
    }
    const key = Object.keys(api)[0];
    const topHeaderSig = useSignal<string | JSXOutput>(key);
    const subComponents = api[key].filter((e) => e[Object.keys(e)[0]].length > 0);
    useTask$(async () => {
      if (config.topHeader) {
        topHeaderSig.value = await config.topHeader(key as string);
      }
    });
    return (
      <>
        {topHeaderSig.value}
        {subComponents.map((e) => (
          <SubComponent subComponent={e} config={config} />
        ))}
      </>
    );
  },
);

const SubComponent = component$<SubComponentProps>(({ subComponent, config }) => {
  const subComponentKey = Object.keys(subComponent)[0];
  const comments = subComponent[subComponentKey];
  return (
    <>
      {comments.map((e) => (
        <>
          <ParsedComments parsedProps={e} config={config} />
        </>
      ))}
    </>
  );
});

const ParsedComments = component$<ParsedCommentsProps>(({ parsedProps, config }) => {
  const key = Object.keys(parsedProps)[0];
  const subHeaderSig = useSignal<string | JSXOutput>(key);
  useTask$(async () => {
    if (config.subHeader) {
      subHeaderSig.value = await config.subHeader(key as string);
    }
  });
  const appliedPropsSig = useSignal<null | APITableProps>(null);
  useTask$(async () => {
    const translation: APITableProps = {
      propDescriptors: parsedProps[key].map((e) => {
        return {
          name: e.prop,
          type: e.type,
          description: e.comment,
        };
      }),
    };
    if (config.props) {
      for (const props of translation.propDescriptors) {
        props.name = await config.props(props.name);
      }
    }
    appliedPropsSig.value = translation;
  });
  return (
    <>
      {subHeaderSig.value}
      {appliedPropsSig.value?.propDescriptors && (
        <APITable propDescriptors={appliedPropsSig.value?.propDescriptors} />
      )}
    </>
  );
});
