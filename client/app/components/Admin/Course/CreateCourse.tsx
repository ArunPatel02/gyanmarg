'use client';
import React, { useEffect, useState } from 'react';
import CourseInformation from './CourseInformation';
import CourseOptions from './CourseOptions';
import CourseData from './CourseData';
import CourseContent from './CourseContent';
import CoursePreview from './CoursePreview';
import {
  useCreateCourseMutation,
  useGetCourseDetailsQuery,
} from '../../../../redux/features/courses/coursesApi';
import { toast } from 'react-hot-toast';
import { redirect, useParams, useRouter } from 'next/navigation';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import { styles } from '@/app/styles/style';
import { FieldArray, Formik } from 'formik';
import * as Yup from 'yup';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormControl, FormDescription } from '@/components/ui/form';

type Props = {};

// const CreateCourse = (props: Props) => {
//   const [createCourse, { isLoading, isSuccess, error }] =
//     useCreateCourseMutation();

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success('Course created successfully');
//       redirect('/admin/courses');
//     }
//     if (error) {
//       if ('data' in error) {
//         const errorMessage = error as any;
//         toast.error(errorMessage.data.message);
//       }
//     }
//   }, [isSuccess, error]);

//   const [active, setActive] = useState(0);
//   const [courseInfo, setCourseInfo] = useState({
//     name: '',
//     description: '',
//     price: '',
//     estimatedPrice: '',
//     tags: '',
//     level: '',
//     categories: '',
//     demoUrl: '',
//     thumbnail: '',
//   });
//   const [benefits, setBenefits] = useState([{ title: '' }]);
//   const [prerequisites, setPrerequisites] = useState([{ title: '' }]);
//   const [courseContentData, setCourseContentData] = useState([
//     {
//       title: 'Untitled Section',
//       videos: [
//         {
//           videoUrl: '',
//           title: '',
//           description: '',
//           videoLength: '',
//           links: [
//             {
//               title: '',
//               url: '',
//             },
//           ],
//           suggestion: '',
//         },
//       ],
//     },
//   ]);

//   const [courseData, setCourseData] = useState({});

//   const handleSubmit = async () => {
//     // Format benefits array
//     const formattedBenefits = benefits.map((benefit) => ({
//       title: benefit.title,
//     }));
//     // Format prerequisites array
//     const formattedPrerequisites = prerequisites.map((prerequisite) => ({
//       title: prerequisite.title,
//     }));

//     // Format course content array
//     // const formattedCourseContentData = courseContentData.map(
//     //   (courseContent) => ({
//     //     videoUrl: courseContent.videoUrl,
//     //     title: courseContent.title,
//     //     description: courseContent.description,
//     //     videoLength: courseContent.videoLength,
//     //     videoSection: courseContent.videoSection,
//     //     links: courseContent.links.map((link) => ({
//     //       title: link.title,
//     //       url: link.url,
//     //     })),
//     //     suggestion: courseContent.suggestion,
//     //   })
//     // );

//     //   prepare our data object
//     const data = {
//       name: courseInfo.name,
//       description: courseInfo.description,
//       categories: courseInfo.categories,
//       price: courseInfo.price,
//       estimatedPrice: courseInfo.estimatedPrice,
//       tags: courseInfo.tags,
//       thumbnail: courseInfo.thumbnail,
//       level: courseInfo.level,
//       demoUrl: courseInfo.demoUrl,
//       totalVideos: courseContentData.length,
//       benefits: formattedBenefits,
//       prerequisites: formattedPrerequisites,
//       // courseData: formattedCourseContentData,
//       sections: courseContentData,
//     };
//     setCourseData(data);
//   };

//   const handleCourseCreate = async (e: any) => {
//     const data = courseData;

//     console.log(data, 'courseFinal Data');
//     if (!isLoading) {
//       await createCourse(data);
//     }
//   };

//   return (
//     <div className='w-full flex min-h-screen'>
//       <div className='w-[80%]'>
//         {active === 0 && (
//           <CourseInformation
//             courseInfo={courseInfo}
//             setCourseInfo={setCourseInfo}
//             active={active}
//             setActive={setActive}
//           />
//         )}

//         {active === 1 && (
//           <CourseData
//             benefits={benefits}
//             setBenefits={setBenefits}
//             prerequisites={prerequisites}
//             setPrerequisites={setPrerequisites}
//             active={active}
//             setActive={setActive}
//           />
//         )}

//         {active === 2 && (
//           <CourseContent
//             active={active}
//             setActive={setActive}
//             courseContentData={courseContentData}
//             setCourseContentData={setCourseContentData}
//             handleSubmit={handleSubmit}
//           />
//         )}

//         {active === 3 && (
//           <CoursePreview
//             active={active}
//             setActive={setActive}
//             courseData={courseData}
//             handleCourseCreate={handleCourseCreate}
//           />
//         )}
//       </div>
//       {/* <div className='w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0'>
//         <CourseOptions active={active} setActive={setActive} />
//       </div> */}
//     </div>
//   );
// };

const validationSchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  tags: Yup.string().required(),
  level: Yup.string().required(),
  categories: Yup.string().required(),
  demoUrl: Yup.string().required(),
  thumbnail: Yup.string().required(),
});

const CreateCourse = () => {
  const [dragging, setDragging] = useState(false);
  const { data } = useGetHeroDataQuery('Categories', {});
  const [categories, setCategories] = useState([]);
  const [createCourse, { isLoading, isSuccess, error }] =
    useCreateCourseMutation();

  useEffect(() => {
    if (data && data.layout?.categories) {
      setCategories(data.layout.categories);
    }
  }, [data]);

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        // setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  const [initialValues, setInitialValues] = useState({
    name: '',
    description: '',
    tags: '',
    level: '',
    categories: '',
    demoUrl: '',
    thumbnail: '',
    prerequisites: [],
    benefits: [],
  });
  const router = useRouter();

  // useEffect(() => {
  //   if (courseData) {
  //     const course = courseData.course;
  //     setInitialValues({
  //       ...initialValues,
  //       name: course.name,
  //       description: course.description,
  //       tags: course.tags,
  //       level: course.level,
  //       categories: course.categories,
  //       demoUrl: course.demoUrl,
  //       thumbnail: course.thumbnail.url,
  //       benefits: course.benefits,
  //       prerequisites: course.prerequisites,
  //     });
  //   }
  // }, [courseData]);

  return (
    <div className='w-[80%] m-auto mt-24'>
      <Formik
        // enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values) => {
          console.log(values, 'values');
          try {
            const course = await createCourse(values).unwrap();
            console.log(course, 'res');
            toast.success('Course created successfully');
            router.push(`/admin/edit-course/${course._id}`);
          } catch (error) {
            console.log(error, 'error');
          }
        }}
        validationSchema={validationSchema}
      >
        {({
          errors,
          values,
          handleBlur,
          handleChange,
          isSubmitting,
          handleSubmit,
          setFieldValue,
        }: any) => (
          <form onSubmit={handleSubmit} className={`${styles.label}`}>
            <div>
              <label htmlFor=''>Course Name</label>
              <Input
                type='text'
                name='name'
                required
                value={values.name}
                id='name'
                placeholder='MERN stack LMS platform with next 13'
                className={`${styles.input}`}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <br />
            <div className='mb-5'>
              <label className={`${styles.label}`}>Course Description</label>
              <Textarea
                name='description'
                cols={30}
                rows={8}
                placeholder='Write something amazing...'
                className={`${styles.input} !h-min !py-2`}
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <br />
            <div className='w-full flex justify-between'>
              <div className='w-[45%]'>
                <label className={`${styles.label}`} htmlFor='email'>
                  Course Tags
                </label>
                <Input
                  type='text'
                  required
                  name='tags'
                  value={values.tags}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id='tags'
                  placeholder='MERN,Next 13,Socket io,tailwind css,LMS'
                  className={`${styles.input}`}
                />
              </div>
              <div className='w-[50%]'>
                <label className={`${styles.label} w-[50%]`}>
                  Course Categories
                </label>
                <Select
                  onValueChange={(value) => {
                    console.log(value);
                    setFieldValue('categories', value);
                  }}
                  defaultValue={values.categories}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select Category' />
                  </SelectTrigger>
                  <SelectContent>
                    {categories &&
                      categories.map((item: any) => (
                        <SelectItem key={item._id} value={item.title}>
                          {item.title}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {/* <select
                  name='categories'
                  className={`${styles.input}`}
                  value={values.categories}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value=''>Select Category</option>
                  {categories &&
                    categories.map((item: any) => (
                      <option value={item.title} key={item._id}>
                        {item.title}
                      </option>
                    ))}
                </select> */}
              </div>
            </div>
            <br />
            <div className='w-full flex justify-between'>
              <div className='w-[45%]'>
                <label className={`${styles.label}`}>Course Level</label>
                <Input
                  type='text'
                  name='level'
                  value={values.level}
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id='level'
                  placeholder='Beginner/Intermediate/Expert'
                  className={`${styles.input}`}
                />
              </div>
              <div className='w-[50%]'>
                <label className={`${styles.label} w-[50%]`}>Demo Url</label>
                <Input
                  type='text'
                  name='demoUrl'
                  required
                  value={values.demoUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id='demoUrl'
                  placeholder='https://www.youtube.com/watch?v=xxxxxxxxxx'
                  className={`${styles.input}`}
                />
              </div>
            </div>
            <br />
            <div className='w-full'>
              <input
                type='file'
                accept='image/*'
                id='file'
                className='hidden'
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e: any) => {
                      if (reader.readyState === 2)
                        setFieldValue('thumbnail', reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <label
                htmlFor='file'
                className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
                  dragging ? 'bg-blue-500' : 'bg-transparent'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {values.thumbnail ? (
                  <img
                    src={values.thumbnail}
                    alt='thumbnail'
                    className='max-h-full w-full object-cover'
                  />
                ) : (
                  <span className='text-black dark:text-white'>
                    Drag and drop your thumbnail here or click to browse
                  </span>
                )}
              </label>
            </div>

            <div className='m-auto mt-24 block'>
              <FieldArray
                name='friends'
                render={(arrayHelpers) => (
                  <div>
                    <label
                      className={`${styles.label} text-[20px]`}
                      htmlFor='email'
                    >
                      What are the benefits for students in this course?
                    </label>
                    <br />
                    {values.benefits.map((benefit: any, index: number) => (
                      <Input
                        type='text'
                        key={index}
                        // name='Benefit'
                        placeholder='You will be able to build a full stack LMS Platform...'
                        required
                        name={`benefits.${index}.title`}
                        className={`${styles.input} my-2`}
                        value={`${values.benefits[index]?.title || ''}`}
                        onChange={handleChange}
                      />
                    ))}
                    <AiOutlinePlusCircle
                      style={{
                        margin: '10px 0px',
                        cursor: 'pointer',
                        width: '30px',
                      }}
                      onClick={() => {
                        setFieldValue('benefits', [
                          ...values.benefits,
                          { title: '' },
                        ]);
                      }}
                    />
                  </div>
                )}
              ></FieldArray>

              <FieldArray
                name='prerequisites'
                render={() => (
                  <div>
                    <label
                      className={`${styles.label} text-[20px]`}
                      htmlFor='email'
                    >
                      What are the prerequisites for starting this course?
                    </label>
                    <br />
                    {values.prerequisites.map(
                      (prerequisites: any, index: number) => (
                        <Input
                          type='text'
                          key={index}
                          name={`prerequisites.${index}.title`}
                          placeholder='You need basic knowledge of MERN stack'
                          required
                          className={`${styles.input} my-2`}
                          value={values.prerequisites[index].title}
                          onChange={handleChange}
                        />
                      )
                    )}
                    <AiOutlinePlusCircle
                      style={{
                        margin: '10px 0px',
                        cursor: 'pointer',
                        width: '30px',
                      }}
                      onClick={() => {
                        setFieldValue('prerequisites', [
                          ...values.prerequisites,
                          { title: '' },
                        ]);
                      }}
                    />
                  </div>
                )}
              />
              {/* <div className='w-full flex items-center justify-between'>
                <div
                  className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer'
                  onClick={() => prevButton()}
                >
                  Prev
                </div>
                <div
                  className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer'
                  onClick={() => handleOptions()}
                >
                  Next
                </div>
              </div> */}
            </div>

            <br />
            <div className='bg-red-500'>
              {Object.values(errors).map((item: any) => (
                <p key={item}> {item}</p>
              ))}
            </div>

            <div className='w-full flex items-center justify-end'>
              <button
                type='submit'
                value='Create'
                className='mr-2 w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer'
              />
            </div>
            <br />
            <br />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CreateCourse;
