import { styles } from '@/app/styles/style';
import SubHeading from '@/components/custom/heading/SubHeading';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  useCreateCourseMutation,
  useEditCourseMutation,
  useGetCourseDetailsQuery,
} from '@/redux/features/courses/coursesApi';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldArray, Formik } from 'formik';
import { LucideLayoutDashboard } from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiFillDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import * as Yup from 'yup';
import { z } from 'zod';

type Props = {
  courseInfo: any;
  // setCourseInfo: (courseInfo: any) => void;
  // active: number;
  // setActive: (active: number) => void;
};

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const formSchema = z.object({
  name: z.string().min(4).max(40),
  description: z.string().min(10).max(10000),
  tags: z.string(),
  categories: z.string(),
  level: z.enum(['Beginner', 'Intermediate', 'Expert']),
  demoUrl: z.string().url(),
  thumbnail: z.union([
    z
      .any()
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        'Only .jpg, .jpeg, .png and .webp formats are supported.'
      ),
    z.string().url(),
  ]),
  prerequisites: z.array(z.object({ title: z.string() })),
  benefits: z.array(z.object({ title: z.string() })),
});

const CourseInformation: FC<Props> = ({ courseInfo }) => {
  const [dragging, setDragging] = useState(false);
  const { data } = useGetHeroDataQuery('Categories', {});
  const [categories, setCategories] = useState([]);
  // const [createCourse, { isLoading, isSuccess, error }] =
  //   useCreateCourseMutation();
  const [editCourse, { isLoading, isSuccess, error }] = useEditCourseMutation();
  const { id }: any = useParams();
  const { data: courseData } = useGetCourseDetailsQuery(id, {
    skip: !id,
  });

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      tags: '',
      level: 'Beginner',
      categories: '',
      demoUrl: '',
      thumbnail: '',
      prerequisites: [{ title: '' }],
      benefits: [{ title: '' }],
    },
  });

  useEffect(() => {
    if (courseData) {
      const course = courseData.course;
      form.reset({
        name: course.name,
        description: course.description,
        tags: course.tags,
        level: course.level,
        categories: course.categories,
        demoUrl: course.demoUrl,
        thumbnail: course.thumbnail.url,
        benefits: course.benefits,
        prerequisites: course.prerequisites,
      });
      console.log(course, 'courese,');
    }
  }, [courseData]);

  // useEffect(() => {
  //   form.reset(initialValues);
  // }, [initialValues, form]);

  const benefitsFormControl = useFieldArray({
    control: form.control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'benefits', // unique name for your Field Array
  });
  const prerequisitesFormControl = useFieldArray({
    control: form.control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'prerequisites', // unique name for your Field Array
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values, 'values on submit');
    toast.success('submit clicked');
    try {
      await editCourse({ id, data: values });
      toast.success('Course detail saved successfully.');
    } catch (error) {
      console.log(error, 'error');
    }
  };

  console.log(form.getValues(), 'values');
  const [thumbnailDataUrl, setThumbnailDataUrl] = useState(null);

  return (
    <div>
      <SubHeading
        title='Customize your course'
        icon={<LucideLayoutDashboard fontSize={24} className='text-blue-400' />}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className={`${styles.label}`}
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>Course Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='MERN stack LMS platform with next 13'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <br />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder='Write something amazing...'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <br />
          <FormField
            control={form.control}
            name='tags'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Tags</FormLabel>
                <FormControl>
                  <Input
                    placeholder='MERN,Next 13,Socket io,tailwind css,LMS'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <br />

          <FormField
            control={form.control}
            name='categories'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Categories</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Category' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories &&
                      categories.map((item: any) => (
                        <SelectItem key={item._id} value={item.title}>
                          {item.title}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <br />
          <FormField
            control={form.control}
            name='level'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Level</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Beginner/Intermediate/Expert'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <br />
          <FormField
            control={form.control}
            name='demoUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Demo URL</FormLabel>
                <FormControl>
                  <Input placeholder='eer74fd' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <br />

          <FormField
            control={form.control}
            name='thumbnail'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Thumbnail</FormLabel>
                <FormControl>
                  <Input
                    placeholder='eer74fd'
                    type='file'
                    {...field}
                    value={field.value?.fileName}
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        const reader: any = new FileReader();
                        reader.onload = (e: any) => {
                          if (reader.readyState === 2)
                            setThumbnailDataUrl(reader.result);
                          field.onChange(reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </FormControl>
                <FormDescription className='mb-4'>
                  Select or upload a picture that shows what&apos;s in your
                  video. A good thumbnail stands out and draws viewers&apos;
                  attention.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <label
            htmlFor='file'
            className={`w-full min-h-[10vh] mt-4 dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? 'bg-blue-500' : 'bg-transparent'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img
                src={thumbnailDataUrl || courseInfo.thumbnail}
                alt='thumbnail'
                className='max-h-full w-full object-cover'
              />
            ) : (
              <span className='text-black dark:text-white'>
                Drag and drop your thumbnail here or click to browse
              </span>
            )}
          </label>

          <br />

          <FormLabel>
            What are the benefits for students in this course?
          </FormLabel>
          {benefitsFormControl.fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`benefits.${index}.title`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className='mt-2'
                      placeholder='You will be able to build a full stack LMS Platform...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <AiOutlinePlusCircle
            style={{
              margin: '10px 0px',
              cursor: 'pointer',
              width: '30px',
            }}
            onClick={() => benefitsFormControl.append({ title: '' })}
          />
          <br />

          <FormLabel>
            What are the prerequisites for starting this course?
          </FormLabel>
          {prerequisitesFormControl.fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`prerequisites.${index}.title`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className='flex items-center space-x-2'>
                      <Input
                        className='mt-2'
                        placeholder='You need basic knowledge of MERN stack'
                        {...field}
                      />
                      {prerequisitesFormControl.fields.length > 1 && (
                        <AiFillDelete
                          className='cursor-pointer'
                          onClick={() => prerequisitesFormControl.remove(index)}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <AiOutlinePlusCircle
            style={{
              margin: '10px 0px',
              cursor: 'pointer',
              width: '30px',
            }}
            onClick={() => {
              prerequisitesFormControl.append({ title: '' });
            }}
          />

          {/*
           */}

          <br />
          {/* <div className='bg-red-500'>
            {Object.values(form.formState.errors).map((item) => (
              <p key={item}> {item}</p>
            ))}
          </div> */}

          <div className='w-full flex items-center justify-end'>
            <Button type='submit'>Save</Button>
          </div>
          <br />
          <br />
        </form>
      </Form>
    </div>
  );
};

export default CourseInformation;

// ------------------
// import { styles } from '@/app/styles/style';
// import SubHeading from '@/components/custom/heading/SubHeading';
// import { Button } from '@/components/ui/button';
// import {
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Textarea } from '@/components/ui/textarea';
// import {
//   useCreateCourseMutation,
//   useEditCourseMutation,
//   useGetCourseDetailsQuery,
// } from '@/redux/features/courses/coursesApi';
// import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
// import { Field, FieldArray, Formik } from 'formik';
// import { LucideLayoutDashboard } from 'lucide-react';
// import { useParams, useSearchParams } from 'next/navigation';
// import React, { FC, useEffect, useState } from 'react';
// import toast from 'react-hot-toast';
// import { AiOutlinePlusCircle } from 'react-icons/ai';
// import * as Yup from 'yup';

// type Props = {
//   courseInfo: any;
//   setCourseInfo: (courseInfo: any) => void;
//   active: number;
//   setActive: (active: number) => void;
// };

// const validationSchema = Yup.object({
//   name: Yup.string().required(),
//   description: Yup.string().required(),
//   tags: Yup.string().required(),
//   level: Yup.string().required(),
//   categories: Yup.string().required(),
//   demoUrl: Yup.string().required(),
//   thumbnail: Yup.string().required(),
// });

// const CourseInformation: FC<Props> = ({
//   courseInfo,
//   setCourseInfo,
//   active,
//   setActive,
// }) => {
//   const [dragging, setDragging] = useState(false);
//   const { data } = useGetHeroDataQuery('Categories', {});
//   const [categories, setCategories] = useState([]);
//   // const [createCourse, { isLoading, isSuccess, error }] =
//   //   useCreateCourseMutation();
//   const [editCourse, { isLoading, isSuccess, error }] = useEditCourseMutation();
//   const { id } = useParams();
//   const { data: courseData } = useGetCourseDetailsQuery(id, {
//     skip: !id,
//   });

//   useEffect(() => {
//     if (data && data.layout?.categories) {
//       setCategories(data.layout.categories);
//     }
//   }, [data]);

//   const handleDragOver = (e: any) => {
//     e.preventDefault();
//     setDragging(true);
//   };

//   const handleDragLeave = (e: any) => {
//     e.preventDefault();
//     setDragging(false);
//   };

//   const handleDrop = (e: any) => {
//     e.preventDefault();
//     setDragging(false);

//     const file = e.dataTransfer.files?.[0];

//     if (file) {
//       const reader = new FileReader();

//       reader.onload = () => {
//         setCourseInfo({ ...courseInfo, thumbnail: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };
//   const [initialValues, setInitialValues] = useState({
//     name: '',
//     description: '',
//     tags: '',
//     level: '',
//     categories: '',
//     demoUrl: '',
//     thumbnail: '',
//     prerequisites: [],
//     benefits: [],
//   });

//   useEffect(() => {
//     if (courseData) {
//       const course = courseData.course;
//       setInitialValues({
//         ...initialValues,
//         name: course.name,
//         description: course.description,
//         tags: course.tags,
//         level: course.level,
//         categories: course.categories,
//         demoUrl: course.demoUrl,
//         thumbnail: course.thumbnail.url,
//         benefits: course.benefits,
//         prerequisites: course.prerequisites,
//       });
//     }
//   }, [courseData]);

//   return (
//     <div>
//       <SubHeading
//         title='Customize your course'
//         icon={<LucideLayoutDashboard fontSize={24} className='text-blue-400' />}
//       />
//       <Formik
//         enableReinitialize
//         initialValues={initialValues}
//         onSubmit={async (values) => {
//           try {
//             await editCourse({ id, data: values });
//             toast.success('Course detail saved successfully.');
//           } catch (error) {
//             console.log(error, 'error');
//           }
//         }}
//         validationSchema={validationSchema}
//       >
//         {({
//           errors,
//           values,
//           handleBlur,
//           handleChange,
//           isSubmitting,
//           handleSubmit,
//           setFieldValue,
//         }) => (
//           <form onSubmit={handleSubmit} className={`${styles.label}`}>
//             <div>
//               <label htmlFor=''>Course Name</label>
//               <Input
//                 type='text'
//                 name='name'
//                 className='mt-2'
//                 required
//                 value={values.name}
//                 id='name'
//                 placeholder='MERN stack LMS platform with next 13'
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />
//             </div>
//             <br />

//             <div>
//               <label className={`${styles.label}`}>Course Description</label>
//               <Textarea
//                 name='description'
//                 rows={8}
//                 placeholder='Write something amazing...'
//                 // className={`${styles.input} !h-min !py-2`}
//                 className={`!h-min !py-2 mt-2`}
//                 value={values.description}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />
//             </div>
//             <br />

//             {/* <div className='w-full flex justify-between'> */}
//             <div>
//               <label className={`${styles.label}`} htmlFor='email'>
//                 Course Tags
//               </label>
//               <Input
//                 type='text'
//                 required
//                 name='tags'
//                 className='mt-2'
//                 value={values.tags}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 id='tags'
//                 placeholder='MERN,Next 13,Socket io,tailwind css,LMS'
//               />
//             </div>
//             <br />

//             <div>
//               <label className={`${styles.label} w-[50%]`}>
//                 Course Categories
//               </label>
//               <Select className='mt-2'>
//                 <SelectTrigger>
//                   <SelectValue placeholder='Select Category' />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {categories &&
//                     categories.map((item: any) => (
//                       <SelectItem key={item._id} value={item.title}>
//                         {item.title}
//                       </SelectItem>
//                     ))}
//                 </SelectContent>
//               </Select>

//               {/* <select
//                 name='categories'
//                 className={`${styles.input}`}
//                 value={values.categories}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               >
//                 <option value=''>Select Category</option>
//                 {categories &&
//                   categories.map((item: any) => (
//                     <option value={item.title} key={item._id}>
//                       {item.title}
//                     </option>
//                   ))}
//               </select> */}
//             </div>
//             {/* </div> */}

//             <br />
//             {/* <div className='w-full flex justify-between'> */}
//             <div>
//               <label className={`${styles.label}`}>Course Level</label>
//               <Input
//                 className='mt-2'
//                 type='text'
//                 name='level'
//                 value={values.level}
//                 required
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 id='level'
//                 placeholder='Beginner/Intermediate/Expert'
//               />
//             </div>

//             <br />
//             <div>
//               <label className={`${styles.label} w-[50%]`}>Demo Url</label>
//               <Input
//                 className='mt-2'
//                 type='text'
//                 name='demoUrl'
//                 required
//                 value={values.demoUrl}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 id='demoUrl'
//                 placeholder='eer74fd'
//               />
//             </div>
//             {/* </div> */}
//             <br />

//             <div className='w-full'>
//               <input
//                 type='file'
//                 accept='image/*'
//                 id='file'
//                 className='hidden'
//                 onChange={(e) => {
//                   const file = e.target.files?.[0];
//                   if (file) {
//                     const reader = new FileReader();
//                     reader.onload = (e: any) => {
//                       if (reader.readyState === 2)
//                         setFieldValue('thumbnail', reader.result);
//                     };
//                     reader.readAsDataURL(file);
//                   }
//                 }}
//               />
//               <label
//                 htmlFor='file'
//                 className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
//                   dragging ? 'bg-blue-500' : 'bg-transparent'
//                 }`}
//                 onDragOver={handleDragOver}
//                 onDragLeave={handleDragLeave}
//                 onDrop={handleDrop}
//               >
//                 {courseInfo.thumbnail ? (
//                   <img
//                     src={courseInfo.thumbnail}
//                     alt='thumbnail'
//                     className='max-h-full w-full object-cover'
//                   />
//                 ) : (
//                   <span className='text-black dark:text-white'>
//                     Drag and drop your thumbnail here or click to browse
//                   </span>
//                 )}
//               </label>
//             </div>

//             <br />
//             <FieldArray
//               name='friends'
//               render={(arrayHelpers) => (
//                 <div>
//                   <label
//                     className={`${styles.label} text-[20px]`}
//                     htmlFor='email'
//                   >
//                     What are the benefits for students in this course?
//                   </label>
//                   <br />
//                   {values.benefits.map((benefit: any, index: number) => (
//                     <Input
//                       type='text'
//                       key={index}
//                       // name='Benefit'
//                       placeholder='You will be able to build a full stack LMS Platform...'
//                       required
//                       name={`benefits.${index}.title`}
//                       className='my-2'
//                       value={`${values.benefits[index]?.title || ''}`}
//                       onChange={handleChange}
//                     />
//                   ))}
//                   <AiOutlinePlusCircle
//                     style={{
//                       margin: '10px 0px',
//                       cursor: 'pointer',
//                       width: '30px',
//                     }}
//                     onClick={() => {
//                       setFieldValue('benefits', [
//                         ...values.benefits,
//                         { title: '' },
//                       ]);
//                     }}
//                   />
//                 </div>
//               )}
//             ></FieldArray>
//             <br />

//             <FieldArray
//               name='prerequisites'
//               render={() => (
//                 <div>
//                   <label
//                     className={`${styles.label} text-[20px]`}
//                     htmlFor='email'
//                   >
//                     What are the prerequisites for starting this course?
//                   </label>
//                   <br />
//                   {values.prerequisites.map(
//                     (prerequisites: any, index: number) => (
//                       <Input
//                         type='text'
//                         key={index}
//                         name={`prerequisites.${index}.title`}
//                         placeholder='You need basic knowledge of MERN stack'
//                         required
//                         className='my-2'
//                         value={values.prerequisites[index].title}
//                         onChange={handleChange}
//                       />
//                     )
//                   )}
//                   <AiOutlinePlusCircle
//                     style={{
//                       margin: '10px 0px',
//                       cursor: 'pointer',
//                       width: '30px',
//                     }}
//                     onClick={() => {
//                       setFieldValue('prerequisites', [
//                         ...values.prerequisites,
//                         { title: '' },
//                       ]);
//                     }}
//                   />
//                 </div>
//               )}
//             />

//             <br />
//             <div className='bg-red-500'>
//               {Object.values(errors).map((item) => (
//                 <p key={item}> {item}</p>
//               ))}
//             </div>

//             <div className='w-full flex items-center justify-end'>
//               <Button type='submit'>Save</Button>
//               {/* <input
//                 type='submit'
//                 value='Save'
//                 className='mr-2 w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer'
//               /> */}
//               {/* <input
//                 value='Next'
//                 onClick={() => setActive(active + 1)}
//                 className='w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer'
//               /> */}
//             </div>
//             <br />
//             <br />
//           </form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default CourseInformation;
