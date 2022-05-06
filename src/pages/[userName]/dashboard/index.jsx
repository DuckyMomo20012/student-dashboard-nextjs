import { Box, Center, Group, Loader, Stack, Text } from '@mantine/core';
import { DataGrid, SubNavbar } from '@module/index.js';
import { updateColumn, updateData } from '@store/slice/tableSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';

import { AppShell } from '@layout/AppShell';
import axios from 'axios';
import { useSession } from 'next-auth/react';

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
  const [students, setStudents] = useState(null);
  const [userName, setUserName] = useState(null);
  const [courseLinks, setCourseLinks] = useState([]);
  const activeMainLink = useSelector((state) => state.activeNavLink.value);
  const dispatch = useDispatch();
  const { data: session } = useSession();
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

  const data = useSelector((state) => state.table.data);
  const columns = useSelector((state) => state.table.columns);

  useEffect(() => {
    if (mutation.isSuccess) {
      // Use first data to get num of columns
      const numColumn = Object.keys(students[0]?.student);
      const columnProps = numColumn.map((colName) => {
        let attr = {
          accessor: colName,
          columnType: 'text',
        };
        if (colName === 'dob') {
          attr = { ...attr, columnType: 'date' };
        }
        return attr;
      });
      columnProps.push({
        accessor: 'menu',
        columnType: 'menu',
        disableResizing: true,
        isDragDisabled: true,
        minWidth: 84,
        width: 0,
      });

      const dataStudent = students.map(({ student }) => ({ ...student }));

      dispatch(updateData(dataStudent));
      dispatch(updateColumn(columnProps));
    }
  }, [students, mutation.isSuccess, dispatch]);

  useEffect(() => {
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

    setCourseLinks(links);
  }, [majorCourseList]);

  async function handleActiveCourseClick(activeLink) {
    setActiveCourseId(activeLink);
    const dataStudent = await mutation.mutateAsync(activeLink);
    setStudents(dataStudent);
  }

  return (
    <Group className="flex-nowrap items-stretch" direction="row" spacing={0}>
      <SubNavbar
        activeSubLink={activeCourseId}
        heading={activeMainLink}
        links={courseLinks}
        onActiveSubLinkClick={handleActiveCourseClick}
      />
      <Stack className="relative flex-grow" justify="start">
        {mutation.isSuccess && (
          <Box className="absolute inset-0">
            <DataGrid columns={columns} data={data} />
          </Box>
        )}
        {mutation.isLoading && (
          <Center className="h-full w-full">
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
