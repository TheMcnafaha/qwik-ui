import { type JSXNode, Component, PropsOf, Signal } from '@builder.io/qwik';
import { MyCheckbox } from './checkbox';
import { ChecklistContextWrapper } from './checklist-context-wrapper';

type CheckListProps = PropsOf<'ul'> & { ariaLabeledBy: string };
// type CheckBoxes=
/*
    This is an inline component. An example use case of an inline component to get the proper indexes with CSR. See issue #4757
    for more information.
*/
export const CheckList: Component<CheckListProps> = (props: CheckListProps) => {
  const checkArr: JSXNode[] = [];
  const hellSigs = [];
  const { children: myChildren, ...rest } = props;

  const childrenToProcess = (
    Array.isArray(myChildren) ? [...myChildren] : [myChildren]
  ) as Array<JSXNode>;

  while (childrenToProcess.length) {
    const child = childrenToProcess.shift();

    if (!child) {
      continue;
    }

    if (Array.isArray(child)) {
      childrenToProcess.unshift(...child);
      continue;
    }

    switch (child.type) {
      case MyCheckbox: {
        // the next line is not very clear, but you can think of it as arr.push() for objs (mutates)
        Object.assign(child.props, { _useCheckListContext: true });
        checkArr.push(child);
        hellSigs.push(child.props);
        break;
      }

      default: {
        console.log('oh now');
        if (child) {
          const anyChildren = Array.isArray(child.children)
            ? [...child.children]
            : [child.children];
          childrenToProcess.unshift(...(anyChildren as JSXNode[]));
        }

        break;
      }
    }
  }
  console.log(hellSigs);

  return (
    <>
      {checkArr.length}
      <ChecklistContextWrapper
        ariaLabeledBy={props.ariaLabeledBy}
        arrSize={hellSigs.length}
      >
        <ul class={props.class}>
          {checkArr.map((checkbox) => (
            <li>{checkbox}</li>
          ))}
        </ul>
      </ChecklistContextWrapper>
    </>
  );
};
