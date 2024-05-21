import { styles } from '@/app/styles/style';
import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  AiFillCiCircle,
  AiFillDelete,
  AiOutlinePlusCircle,
} from 'react-icons/ai';
import { BsArrowBarDown, BsLink45Deg, BsPencil } from 'react-icons/bs';
import {
  MdDragHandle,
  MdDragIndicator,
  MdOutlineKeyboardArrowDown,
} from 'react-icons/md';
// import Button from '../../atoms/buttons/Button';
import { BiPencil } from 'react-icons/bi';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  useAddSectionMutation,
  useUpdateSectionMutation,
} from '@/redux/features/section/sectionApi';
import {
  useAddVideoMutation,
  useDeleteVideoMutation,
  useReorderVideosMutation,
} from '@/redux/features/video/videoApi';
import { apiSlice } from '@/redux/features/api/apiSlice';
import { useDispatch } from 'react-redux';
import { RiDragMove2Fill, RiDraggable } from 'react-icons/ri';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import AlertDialogModal from '@/components/modals/AlertDialogModal';
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
  CardHeader,
  CardContent,
} from '@/components/ui/card';
import { FaListCheck } from 'react-icons/fa6';
import CustomTooltip from '@/components/custom/tooltip/Tooltip';
import SubHeading from '@/components/custom/heading/SubHeading';
import VideoEditModal from '../../atoms/modal/VideoEditModal';
type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

type AddSectionProps = {
  data: any;
  handleClose: () => void;
};

const AddSection = ({ data, handleClose }: AddSectionProps) => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const [addSection] = useAddSectionMutation();

  return (
    <div className='mb-6'>
      <Input
        placeholder='Enter your section title...'
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <Button
        className='mt-3 me-4'
        variant='default'
        // disabled={!input || isLoading}
        onClick={async () => {
          try {
            const response: any = await addSection({
              courseId: data._id,
              title: input,
            });
            handleClose();
            toast.success(response.message || 'Video added successfully');
            dispatch(apiSlice.util.invalidateTags(['ALL_COURSES']));
            setInput('');
          } catch (error) {}
        }}
      >
        Create
      </Button>
      <Button variant='ghost' onClick={handleClose}>
        Cancel
      </Button>
    </div>
  );
};

const CourseContent: FC<Props> = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleSubmit: handlleCourseSubmit,
}) => {
  const { id: courseId }: any = useParams();

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const [sectionTitle, setSectionTitle] = useState('');

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    setActive(active + 1);
    handlleCourseSubmit();
  };

  const [isAddSection, setIsAddSection] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (courseContentData?.length === 0) setIsAddSection(true);
  }, [courseContentData]);

  return (
    <div
    // className='w-[80%] m-auto mt-24 p-3'
    >
      <div className='flex justify-between items-center'>
        <SubHeading
          title='Course sections'
          icon={<FaListCheck fontSize={24} className='text-blue-400' />}
        />

        <div className='flex items-center justify-between mb-6'>
          <p
            className=' mt-2 mx-auto flex items-center text-[16px] dark:text-white text-black cursor-pointer'
            onClick={(e: any) => setIsAddSection(true)}
          >
            <AiOutlinePlusCircle fontSize={24} className='mr-2' />
            Add new Section
          </p>
        </div>
      </div>

      {isAddSection && (
        <AddSection
          data={{ _id: courseId }}
          handleClose={() => setIsAddSection(false)}
        />
      )}
      <form
        onSubmit={handleSubmit}
        className='grid lg:grid-cols-1 grid-cols-1 gap-4'
      >
        {courseContentData?.map((item: any, sectionIdx: number) => {
          return (
            <SectionCard
              key={sectionIdx}
              // courseContentData={courseContentData}
              // setCourseContentData={setCourseContentData}
              // active={active}
              // setActive={setActive}
              // handlleCourseSubmit={handlleCourseSubmit}
              item={item}
              // sectionIdx={sectionIdx}
            />
          );
        })}
      </form>
    </div>
  );
};

const EditSectionTitle = ({
  data,
  handleClose,
}: {
  data: any;
  handleClose: () => void;
}) => {
  const [text, setText] = useState(data.title);
  const [updateSection, { isLoading }] = useUpdateSectionMutation();

  useEffect(() => {
    setText(data.title);
  }, [data.title]);

  return (
    <div className='flex items-start'>
      <Input
        className='min-w-[250px]'
        placeholder='Enter your section title...'
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <Button
        className='ms-2'
        variant='default'
        disabled={!text || isLoading}
        onClick={async () => {
          try {
            const response = await updateSection({
              id: data._id,
              title: text,
            }).unwrap();
            toast.success(response.message);
          } catch (error: any) {
            console.log(error);
            toast.success(error.message);
          }
        }}
      >
        Save
      </Button>
    </div>
  );
};

const AddVideoTitle = ({
  data,
  handleClose,
}: {
  data: any;
  handleClose: () => void;
}) => {
  const [input, setInput] = useState('');
  const [addVideo, { isLoading }] = useAddVideoMutation();

  return (
    <div className='!my-6'>
      <Input
        placeholder='Enter your video title...'
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <Button
        className='mt-2'
        variant='default'
        disabled={!input || isLoading}
        onClick={async () => {
          try {
            const response: any = await addVideo({
              sectionId: data._id,
              title: input,
            });
            // setOpenAddVideo(false);
            toast.success(response.message || 'Video added successfully');
            // dispatch(apiSlice.util.invalidateTags(['ALL_COURSES']));
            handleClose();
          } catch (error) {}
        }}
      >
        Create
      </Button>
    </div>
  );
};

type SectionCardProps = {
  item: any;
};

const SectionCard: FC<SectionCardProps> = ({ item }) => {
  const [openAddVideo, setOpenAddVideo] = useState(false);
  const [addVideo, { isLoading }] = useAddVideoMutation();

  const [sectionTitleEdit, setSectionTitleEdit] = useState(false);

  return (
    <>
      <Card className={`w-full mt-2`}>
        <CardHeader>
          <div className='flex justify-between items-start'>
            {sectionTitleEdit ? (
              <EditSectionTitle
                data={item}
                handleClose={() => setSectionTitleEdit(false)}
              />
            ) : (
              <h5 className='text-lg font-medium text-white'>{item.title}</h5>
            )}
            {openAddVideo || sectionTitleEdit ? (
              <Button
                variant='ghost'
                onClick={() => {
                  setOpenAddVideo(false);
                  setSectionTitleEdit(false);
                }}
              >
                Cancel
              </Button>
            ) : (
              <div className='flex items-center gap-2'>
                <div
                  className={`${
                    item.published ? 'bg-green-500' : 'bg-red-500 px-2'
                  } rounded-lg shadow-md px-2 text-sm text-center`}
                >
                  {item.published ? 'Published' : 'Draft'}
                </div>
                <CustomTooltip title='Add New Video'>
                  <AiOutlinePlusCircle
                    className='flex items-center text-[18px] dark:text-white text-black cursor-pointer'
                    onClick={(e: any) => setOpenAddVideo(true)}
                  />
                </CustomTooltip>
                <CustomTooltip title='Edit Section'>
                  <BiPencil
                    className={`dark:text-white text-[20px] text-black cursor-pointer`}
                    onClick={() => {
                      setSectionTitleEdit(item.title);
                    }}
                  />
                </CustomTooltip>
                <AlertDialogModal handleContinue={() => {}}>
                  <AiFillDelete
                    className={`${
                      isLoading ? 'animate-spin' : ''
                    } dark:text-white text-[20px] text-black cursor-pointer`}
                  />
                </AlertDialogModal>
              </div>
            )}
          </div>

          {openAddVideo && (
            <AddVideoTitle
              data={item}
              handleClose={() => setOpenAddVideo(false)}
            />
          )}
        </CardHeader>
        <CardContent className='mt-5'>
          <VideoList videos={item?.videos || []} sectionId={item._id} />
        </CardContent>
        {/* <CardFooter>
          <p className='text-sm text-gray-300'>
            <span className='text-red-500'>Note</span> : Please ensure that the
            designated video and section are published promptly. Your attention
            to this matter is greatly appreciated.
          </p>
        </CardFooter> */}
      </Card>
    </>
  );
};

type VideoListProps = {
  videos: any;
  sectionId: string;
};
const VideoList: FC<VideoListProps> = ({ videos: items, sectionId }) => {
  const [videos, setVideos] = useState([]);
  const [reorderVideos] = useReorderVideosMutation();

  useEffect(() => {
    setVideos(items);
  }, [items]);

  const getPos = (id: string) =>
    videos.findIndex((item: any) => item._id === id);

  const handleDragEnd = ({ active, over }: any) => {
    if (active.id === over.id) return;
    setVideos((prev) => {
      const originalPos = getPos(active.id);
      const newPos = getPos(over.id);
      const updatedVideos = arrayMove(prev, originalPos, newPos);
      reorderVideos({
        id: sectionId,
        data: { videos: updatedVideos.map((v: any) => v._id) },
      });
      return updatedVideos;
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      // collisionDetection={closestCorners}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={videos.map((item: any) => item._id)}
        strategy={verticalListSortingStrategy}
      >
        {videos.map((video: any) => (
          <VideoListItem
            title={video.title}
            id={video._id}
            key={video._id}
            published={video.published}
            video={video}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

interface IVideoListItem {
  title: string;
  id: string;
  published: boolean;
  video: any;
}

const VideoListItem = ({ title, id, published, video }: IVideoListItem) => {
  const router = useRouter();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const [deleteVideo, { isLoading }] = useDeleteVideoMutation();

  return (
    <>
      <div
        className={`bg-slate-900 w-100 p-2 flex justify-between mb-2 rounded-md shadow-md cursor-default`}
        style={style}
      >
        <div className='flex items-center gap-2'>
          <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className='cursor-grab'
          >
            <MdDragIndicator />
          </div>
          <h5 className='ml-1'>{title}</h5>
        </div>

        <div className='flex items-center ml-4'>
          <div
            className={`${
              published ? 'bg-green-500' : 'bg-red-500 px-2'
            } rounded-lg me-2 shadow-md px-2 text-sm`}
          >
            {published ? 'Published' : 'Draft'}
          </div>
          <VideoEditModal data={video} id={id}>
            <BiPencil
              className={`dark:text-white text-[20px] mr-2 text-black cursor-pointer`}
              // onClick={() => {
              //   router.push(`/admin/videos/${id}`);
              // }}
            />
          </VideoEditModal>
          <AlertDialogModal
            handleContinue={() => {
              deleteVideo(id);
            }}
          >
            {' '}
            <AiFillDelete
              className={`${
                isLoading ? 'animate-spin' : ''
              } dark:text-white text-[20px] mr-2 text-black cursor-pointer`}
            />
          </AlertDialogModal>
        </div>
      </div>
    </>
  );
};

export default CourseContent;
