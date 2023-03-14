import Content from './Content';
import CourseTitle from './CourseTitle';
import Total from './Total';

const Course = ({ course }) => {
  const total = course.parts.reduce((s, p) => s + p.exercises, 0);

  return (
    <>
      <CourseTitle text={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </>
  );
};

export default Course;
