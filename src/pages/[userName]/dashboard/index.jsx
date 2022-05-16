import { Box, Button, Center, Group, Loader, Stack, Text } from '@mantine/core';
import { DataGrid, SubNavbar } from '@module/index.js';
import { updateColumn, updateData } from '@store/slice/tableSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';

import { AppShell } from '@layout/AppShell';
import axios from 'axios';
import { update } from 'lodash';
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

async function updateAllStudentOneCourse(courseId, dataStudent) {
  const updateStudents = await axios.put(`/api/courses/${courseId}/students`, {
    dataStudent,
  });
  return updateStudents.data;
}

const Dashboard = () => {
  const [activeCourseId, setActiveCourseId] = useState('');
  const [students, setStudents] = useState(null);
  const [userName, setUserName] = useState(null);
  const [courseLinks, setCourseLinks] = useState([]);
  const activeMainLink = useSelector((state) => state.activeNavLink.value);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { data: majorCourseList } = useQuery(
    ['majorCourses', userName],
    fetchCourses,
    {
      retry: false,
      enabled: !!userName,
    },
  );
  useEffect(() => {
    const {
      user: { name: userNameSession },
    } = session;
    setUserName(userNameSession);
  }, [session]);
  const mutationStudent = useMutation((courseId) => {
    return fetchAllStudentOneCourse(courseId);
  });

  const mutationUpdate = useMutation(({ courseId, dataStudent }) => {
    return updateAllStudentOneCourse(courseId, dataStudent);
  });

  const dataTable = useSelector((state) => state.table.data);
  const columnTable = useSelector((state) => state.table.columns);

  useEffect(() => {
    if (mutationStudent.isSuccess) {
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
  }, [students, mutationStudent.isSuccess, dispatch]);

  useEffect(() => {
    const links = majorCourseList?.map((major) => {
      const { idMajor, nameMajor, courses } = major;
      const subItemList = courses.map(({ idCourse, nameCourse }) => {
        return {
          idSubItem: idCourse,
          labelSubItem: nameCourse,
        };
      });
      return {
        idItem: idMajor,
        labelItem: nameMajor,
        subItemList,
      };
    });

    setCourseLinks(links);
  }, [majorCourseList]);

  async function handleActiveCourseClick(activeLink) {
    setActiveCourseId(activeLink);
    const dataStudent = await mutationStudent.mutateAsync(activeLink);
    setStudents(dataStudent);
  }

  async function handleUpdateDataClick() {
    await mutationUpdate.mutateAsync({
      courseId: activeCourseId,
      dataStudent: dataTable,
    });
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
        {mutationStudent.isSuccess && (
          <Stack className="absolute inset-0">
            <Group position="center">
              <Button
                className="items-center"
                loading={mutationUpdate.isLoading}
                onClick={handleUpdateDataClick}
              >
                Update data
              </Button>
            </Group>
            <DataGrid columns={columnTable} data={dataTable} />
          </Stack>
        )}
        {mutationStudent.isLoading && (
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
