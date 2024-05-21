'use client';
import React, { FC, useEffect, useState } from 'react';
import CourseInformation from './CourseInformation';
import CourseOptions from './CourseOptions';
import CourseData from './CourseData';
import CourseContent from './CourseContent';
import CoursePreview from './CoursePreview';
import {
  useEditCourseMutation,
  useGetAllCoursesQuery,
  useGetCourseDetailsQuery,
} from '../../../../redux/features/courses/coursesApi';
import { toast } from 'react-hot-toast';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';

type Props = {
  id: string;
};

const EditCourse: FC<Props> = ({ id }) => {
  const [editCourse, { isSuccess, error }] = useEditCourseMutation();
  const { data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const editCourseData = data && data.courses.find((i: any) => i._id === id);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Course Updated successfully');
      redirect('/admin/courses');
    }
    if (error) {
      if ('data' in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const [active, setActive] = useState(0);

  useEffect(() => {
    if (editCourseData) {
      setCourseInfo({
        name: editCourseData.name,
        description: editCourseData.description,
        price: editCourseData.price,
        estimatedPrice: editCourseData?.estimatedPrice,
        tags: editCourseData.tags,
        level: editCourseData.level,
        categories: editCourseData.categories,
        demoUrl: editCourseData.demoUrl,
        thumbnail: editCourseData?.thumbnail?.url,
      });
      setBenefits(editCourseData.benefits);
      setPrerequisites(editCourseData.prerequisites);
      if (editCourseData?.sections)
        setCourseContentData(editCourseData?.sections);
    }
  }, [editCourseData]);

  const [courseInfo, setCourseInfo] = useState({
    name: '',
    description: '',
    price: '',
    estimatedPrice: '',
    tags: '',
    level: '',
    categories: '',
    demoUrl: '',
    thumbnail: '',
  });
  const [benefits, setBenefits] = useState([{ title: '' }]);
  const [prerequisites, setPrerequisites] = useState([{ title: '' }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      title: 'Untitled Section',
      videos: [
        {
          videoUrl: '',
          title: '',
          description: '',
          links: [
            {
              title: '',
              url: '',
            },
          ],
          suggestion: '',
          videoLength: 0,
        },
      ],
    },
  ]);

  const [courseData, setCourseData] = useState({});

  const handleSubmit = async () => {
    // Format benefits array
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    // Format prerequisites array
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    // Format course content array
    // const formattedCourseContentData = courseContentData.map(
    //   (courseContent) => ({
    //     videoUrl: courseContent.videoUrl,
    //     title: courseContent.title,
    //     description: courseContent.description,
    //     videoSection: courseContent.videoSection,
    //     links: courseContent.links.map((link) => ({
    //       title: link.title,
    //       url: link.url,
    //     })),
    //     suggestion: courseContent.suggestion,
    //     videoLength: courseContent.videoLength,
    //   })
    // );

    //   prepare our data object
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      categories: courseInfo.categories,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      sections: courseContentData,
      // courseContent: formattedCourseContentData,
    };

    setCourseData(data);
  };

  const handleCourseCreate = async (e: any) => {
    const data = courseData;
    await editCourse({ id: editCourseData?._id, data });
  };

  return (
    <div className='w-full flex min-h-screen'>
      <div className='w-[100%] px-4 md:px-10'>
        <div className='flex items-end justify-between'>
          <div>
            <h2 className='text-4xl mt-16 mb-2 text-black dark:text-white'>Course setup</h2>
            <p className='text-gray-400'>Edit the course</p>
          </div>
          <Button>Published</Button>
        </div>
        <div className='grid lg:grid-cols-2 gap-10'>
          <div className='mt-8'>
            <CourseInformation courseInfo={courseInfo} />
          </div>
          <div className='mt-8'>
            <CourseContent
              active={active}
              setActive={setActive}
              courseContentData={courseContentData}
              setCourseContentData={setCourseContentData}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
        {/* {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )} */}

        {/* {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )} */}

        {/* {active === 1 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}

        {active === 2 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
            isEdit={true}
          />
        )} */}
      </div>
      {/* <div className='mt-[100px] h-screen fixed z-[-1] top-18 right-0'>
        <CourseOptions active={active} setActive={setActive} />
      </div> */}
    </div>
  );
};

export default EditCourse;
