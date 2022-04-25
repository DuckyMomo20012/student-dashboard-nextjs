import { AppShell } from '@layout/AppShell';
import {
  Accordion,
  Center,
  Container,
  Group,
  Loader,
  Text,
} from '@mantine/core';
import { DataGrid } from '@module/DataGrid.jsx';
import { SubNavbar } from '@module/index.js';
import { formatDate } from '@util/formatDate.js';
import axios from 'axios';
import { useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';

async function fetchCourses({ queryKey }) {
  const [_key, userId] = queryKey;
  const majorCourseList = await axios.get('/api/courses', {
    params: {
      user: userId,
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
  const { id: userId } = useSelector((state) => state.user.value);
  const { data: majorCourseList, refetch: refetchCourseList } = useQuery(
    ['majorCourses', userId],
    fetchCourses,
    {
      retry: false,
    },
  );

  const [students, setStudents] = useState(null);

  const mutation = useMutation((courseId) => {
    return fetchAllStudentOneCourse(courseId);
  });

  async function handleActiveCourseClick(idSubItem) {
    setActiveCourseId(idSubItem);
    const students = await mutation.mutateAsync(idSubItem);
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
      const columns = Object.keys(students[0]?.student);
      return columns.map((colName) => {
        return {
          Header: colName,
          accessor: colName,
        };
      });
    }
  }, [students, mutation.isSuccess]);

  const data = useMemo(() => {
    if (mutation.isSuccess) {
      // map data base on 'columns' not from data, because in 'columns' we may
      // remove some columns
      return students.map(({ student }) => {
        const { dob } = student;
        dob = formatDate(new Date(dob));
        return { ...student, dob };
      });
    }
  }, [students, mutation.isSuccess]);

  return (
    <Group grow direction="col" spacing={0}>
      <SubNavbar
        heading={activeMainLink}
        links={links}
        activeSubLink={activeCourseId}
        onActiveSubLinkClick={handleActiveCourseClick}
      ></SubNavbar>
      <Container p="md" className="w-1/2" fluid>
        {mutation.isSuccess && <DataGrid columns={columns} data={data} />}
        {mutation.isLoading && (
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
