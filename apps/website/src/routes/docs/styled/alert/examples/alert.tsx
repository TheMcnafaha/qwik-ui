import { component$ } from '@builder.io/qwik';
import { Alert } from '~/components/ui';
import { LuAlertTriangle } from '@qwikest/icons/lucide';

export default component$(() => {
  return (
    <Alert.Root look="alert">
      <LuAlertTriangle class="h-4 w-4" />
      <Alert.Title>Error</Alert.Title>
      <Alert.Description>
        Your session has expired. Please log in again.
      </Alert.Description>
    </Alert.Root>
  );
});
