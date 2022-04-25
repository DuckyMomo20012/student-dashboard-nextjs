import { DOMAIN } from '@constant/index.js';
import { AppShell } from '@layout/AppShell';
import { Center, Container, Group, Loader } from '@mantine/core';
import { DataGrid } from '@module/DataGrid.jsx';
import { SubNavbar } from '@module/index.js';
import { formatDate } from '@util/formatDate.js';
import axios from 'axios';
import { useMemo, useState } from 'react';
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

const Dashboard = ({ userName, courses }) => {
  const [activeCourseId, setActiveCourseId] = useState('');
  const activeMainLink = useSelector((state) => state.navLink.value);
  const { data: majorCourseList, refetch: refetchCourseList } = useQuery(
    ['majorCourses', userName],
    fetchCourses,
    {
      retry: false,
      initialData: courses,
    },
  );

  const [students, setStudents] = useState(null);

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

export async function getStaticPaths() {
  return {
    // We don't have to fetch all users, because we only use one user
    paths: [],
    // Since we don't statically generate pages, so we will wait for 'html' to
    // be generated
    fallback: 'blocking',
  };
}

export async function getStaticProps({ userName }) {
  const res = await axios.get(`${DOMAIN}/api/courses`, {
    params: {
      username: userName,
    },
  });
  const courses = res.data;
  return {
    props: {
      courses,
    },
  };
}
