import { AppShell } from '@layout/AppShell';
import { Center, Container, Group, Loader, Text } from '@mantine/core';
import { DataGrid } from '@module/DataGrid.jsx';
import { SubNavbar } from '@module/index.js';
import { formatDate } from '@util/formatDate.js';
import axios from 'axios';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

async function fetchCourses({ queryKey }) {
  const [_key, userId] = queryKey;
  const courses = await axios.get('/api/courses', {
    params: {
      user: userId,
    },
  });
  return courses.data;
}

async function fetchAllCourseStudent({ queryKey }) {
  const [_key, activeCourseId] = queryKey;
  const students = await axios.get(`/api/courses/${activeCourseId}/students`);
  return students.data;
}

const Dashboard = () => {
  const [activeCourseId, setActiveCourseId] = useState('');
  const activeMainLink = useSelector((state) => state.navLink.value);
  const { id: userId } = useSelector((state) => state.user.value);
  const { data: courses, refetch: refetchCourseList } = useQuery(
    ['courses', userId],
    fetchCourses,
    {
      retry: false,
    },
  );
  const {
    data: students,
    refetch: refetchStudentList,
    isSuccess,
    isIdle,
    isLoading,
  } = useQuery(['students', activeCourseId], fetchAllCourseStudent, {
    enabled: !!activeCourseId,
    retry: false,
  });

  const links = courses?.map(({ id, nameCourse }) => (
    <Link
      // href={`/dashboard/${slugify(nameCourse.toLowerCase())}`}
      href=""
      key={id}
      passHref
    >
      <Text
        className={
          'border-box dark:(text-dark-50 bg-dark-500 text-white) px-16px text-14px mr-16px h-44px leading-11 hover:(bg-gray-100 text-black) block rounded-tr-md rounded-br-md py-0 font-medium text-gray-700 no-underline' +
          (activeCourseId === id &&
            'dark:(border-l-blue-700 bg-blue-700) !hover:(border-l-blue-500) !hover:(bg-blue-500) !hover:(text-white) border-l-blue-500 bg-blue-500 text-white')
        }
        onClick={() => {
          setActiveCourseId(id);
          refetchStudentList();
        }}
      >
        {nameCourse}
      </Text>
    </Link>
  ));

  const columns = useMemo(() => {
    if (isSuccess) {
      // Use first data to get num of columns
      const columns = Object.keys(students[0]?.student);
      return columns.map((colName) => {
        return {
          Header: colName,
          accessor: colName,
        };
      });
    }
  }, [students, isSuccess]);

  const data = useMemo(() => {
    if (isSuccess) {
      // map data base on 'columns' not from data, because in 'columns' we may
      // remove some columns
      return students.map(({ student }) => {
        const { dob } = student;
        dob = formatDate(new Date(dob));
        return { ...student, dob };
      });
    }
  }, [students, isSuccess]);

  return (
    <Group grow direction="col" spacing={0}>
      <SubNavbar activeMainLink={activeMainLink} links={links}></SubNavbar>
      <Container p="md" className="w-1/2" fluid>
        {isSuccess && <DataGrid columns={columns} data={data} />}
        {isLoading && (
          <Center className="w-1/1">
            <Loader className="h-48px w-48px" />
          </Center>
        )}
      </Container>
    </Group>
  );
};

Dashboard.getLayout = function getLayout(page) {
  return <AppShell>{page}</AppShell>;
};

export default Dashboard;
