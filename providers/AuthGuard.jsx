import { Icon } from '@iconify/react';
import {
  Center,
  Group,
  Loader,
  Modal,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const AuthGuard = ({ children }) => {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession({
    // Set this to true will redirect directly
    // required: true,
    // onUnauthenticated() {
    //   router.push('/auth/login');
    // },
  });

  useEffect(() => {
    // console.log('session', session);
    if (status !== 'loading') {
      setOpened(true);
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <Center className="w-1/1 h-1/1">
        <Stack>
          <Text>Loading user...</Text>
          <Center>
            <Loader className="h-48px w-48px" />
          </Center>
        </Stack>
      </Center>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <>
        <Modal
          onClose={() => {
            setOpened(false);
            router.push('/auth/login');
          }}
          opened={opened}
          withCloseButton={false}
        >
          <Group>
            <ThemeIcon color="red" radius="xl" size="xl" variant="light">
              <Icon icon="ic:baseline-error-outline" width="24" />
            </ThemeIcon>
            <Text>You are not logged in</Text>
          </Group>
        </Modal>
      </>
    );
  }

  return children;
};

export { AuthGuard };