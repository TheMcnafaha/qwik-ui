import { PropsOf, component$, useContext } from '@builder.io/qwik';
import { getProgressState } from './util';
import { ProgressContext } from './progress-context';

type ProgressIndicatorElement = PropsOf<'div'>;
export const ProgressIndicator = component$<ProgressIndicatorElement>((props) => {
  const { ...indicatorProps } = props;

  const { max, value } = useContext(ProgressContext);
  const translateX = value ? `translateX(-${100 - value}%)` : undefined;

  return (
    <div
      style={{ transform: translateX }}
      title="progress_indicator"
      data-progress={getProgressState(value, max)}
      data-value={value ?? undefined}
      data-max={max}
      {...indicatorProps}
    />
  );
});
