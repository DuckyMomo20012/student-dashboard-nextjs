import { Cell, Header } from '@element/DataGrid/index.js';
import { AppShell } from '@layout/AppShell';
import {
  Box,
  Center,
  Group,
  Loader,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';
import { DataGrid, SubNavbar } from '@module/index.js';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';

async function fetchCourses({ queryKey }) {
  const [_key, userName] = queryKey;
  const majorCourseList = await axios.get('/api/courses', {
    params: {
      username: userName,
    },
  });
  return majorCourseList.data;
}

async function fetchAllStudentOneCourse(courseId) {
  const students = await axios.get(`/api/courses/${courseId}/students`);
  return students.data;
}

const Dashboard = () => {
  const [activeCourseId, setActiveCourseId] = useState('');
  const activeMainLink = useSelector((state) => state.navLink.value);
  const [students, setStudents] = useState(null);
  const [userName, setUserName] = useState(null);
  const { data: session, status: sessionStatus } = useSession();
  const { data: majorCourseList, refetch: refetchCourses } = useQuery(
    ['majorCourses', userName],
    fetchCourses,
    {
      retry: false,
      enabled: false,
    },
  );
  useEffect(() => {
    const {
      user: { name: userNameSession },
    } = session;
    setUserName(userNameSession);
    refetchCourses();
  }, [session, userName, refetchCourses]);

  const mutation = useMutation((courseId) => {
    return fetchAllStudentOneCourse(courseId);
  });

  async function handleActiveCourseClick(activeCourseId) {
    setActiveCourseId(activeCourseId);
    const students = await mutation.mutateAsync(activeCourseId);
    setStudents(students);
  }

  const links = majorCourseList?.map((major) => {
    const { id: majorId, nameMajor, courses } = major;
    const subItemList = courses.map(({ id, nameCourse }) => {
      return {
        idSubItem: id,
        labelSubItem: nameCourse,
      };
    });
    return {
      idItem: majorId,
      labelItem: nameMajor,
      subItemList,
    };
  });

  const columns = useMemo(() => {
    if (mutation.isSuccess) {
      // Use first data to get num of columns
      const columnNums = Object.keys(students[0]?.student);
      let columns = columnNums.map((colName) => {
        if (colName === 'dob') {
          return {
            accessor: colName,
            columnType: 'date',
            Cell,
            Header,
          };
        }
        return {
          accessor: colName,
          columnType: 'text',
          Cell,
          Header,
        };
      });
      columns = [
        ...columns,
        {
          accessor: 'menu',
          columnType: 'menu',
          Header,
          disableResizing: true,
          minWidth: 0,
          width: 0,
        },
      ];
      return columns;
    }
  }, [students, mutation.isSuccess]);

  const data = useMemo(() => {
    if (mutation.isSuccess) {
      // map data base on 'columns' not from data, because in 'columns' we may
      // remove some columns
      return students.map(({ student }) => {
        return { ...student };
      });
    }
  }, [students, mutation.isSuccess]);

  return (
    <Group className="flex-nowrap items-stretch" direction="row" spacing={0}>
      <SubNavbar
        activeSubLink={activeCourseId}
        heading={activeMainLink}
        links={links}
        onActiveSubLinkClick={handleActiveCourseClick}
      />
      <Stack className="relative flex-grow" justify="start">
        {mutation.isSuccess && (
          <Box className="p-20px absolute inset-0">
            <DataGrid columns={columns} data={data} />
          </Box>
        )}
        {mutation.isLoading && (
          <Center className="w-1/1 h-1/1">
            <Stack>
              <Text>Loading data...</Text>
              <Center>
                <Loader className="h-48px w-48px" />
              </Center>
            </Stack>
          </Center>
        )}
      </Stack>
    </Group>
  );
};

Dashboard.getLayout = function getLayout(page) {
  return <AppShell>{page}</AppShell>;
};

Dashboard.auth = true;

export default Dashboard;
