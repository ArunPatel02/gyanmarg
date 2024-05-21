import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from '@/redux/features/layout/layoutApi';
import React, { useEffect, useState } from 'react';
import Loader from '../../Loader/Loader';
import { styles } from '@/app/styles/style';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { toast } from 'react-hot-toast';

type Props = {};

const EditCategories = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery('Categories', {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useEditLayoutMutation();
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    if (data && data.layout?.categories) {
      setCategories(data.layout.categories);
    }
    if (layoutSuccess) {
      refetch();
      toast.success('Categories updated successfully');
    }

    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, layoutSuccess, error, refetch]);

  const handleCategoriesAdd = (id: any, value: string) => {
    console.log('handleCategoriesAdd');
    setCategories((prevCategory: any) =>
      prevCategory.map((i: any) => (i._id === id ? { ...i, title: value } : i))
    );
  };

  const newCategoriesHandler = () => {
    console.log('newCategoriesHandler', categories);
    if (
      categories.length > 0 &&
      categories[categories.length - 1].title === ''
    ) {
      toast.error('Category title cannot be empty');
    } else {
      setCategories((prevCategory: any) => [...prevCategory, { title: '' }]);
    }
  };

  const areCategoriesUnchanged = (
    originalCategories: any[],
    newCategories: any[]
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoryTitleEmpty = (categories: any[]) => {
    return categories.some((q) => q.title === '');
  };

  const editCategoriesHandler = async () => {
    if (
      !areCategoriesUnchanged(data.layout?.categories, categories) &&
      !isAnyCategoryTitleEmpty(categories)
    ) {
      await editLayout({
        type: 'Categories',
        categories,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='mt-[120px] mx-8'>
          <h1 className={`${styles.title} mb-4 !text-start`}>All Categories</h1>
          <div className='grid sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  items-center gap-4'>
            {categories &&
              categories.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    className='flex px-4 items-center bg-gray-200 rounded-3xl'
                  >
                    <input
                      className={`${styles.input} !mt-0 !border-none !text-[20px]`}
                      value={item.title}
                      onChange={(e) =>
                        handleCategoriesAdd(item._id, e.target.value)
                      }
                      placeholder='Enter category title...'
                    />
                    <AiOutlineDelete
                      className='dark:text-white text-black text-[18px] cursor-pointer'
                      onClick={() => {
                        setCategories((prevCategory: any) =>
                          prevCategory.filter((i: any) => i._id !== item._id)
                        );
                      }}
                    />
                  </div>
                );
              })}

            <div className='flex text-black dark:text-white gap-2'>
              <IoMdAddCircleOutline
                className='dark:text-white text-black text-[25px] cursor-pointer'
                onClick={newCategoriesHandler}
              />
              Add
            </div>
          </div>

          <br />
          <br />
          {/* <div className='w-full flex'>
            <IoMdAddCircleOutline
              className='dark:text-white text-black text-[25px] cursor-pointer'
              onClick={newCategoriesHandler}
            />
          </div> */}
          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
            ${
              areCategoriesUnchanged(data.layout?.categories, categories) ||
              isAnyCategoryTitleEmpty(categories)
                ? '!cursor-not-allowed'
                : '!cursor-pointer !bg-[#42d383]'
            }
            !rounded absolute bottom-12 right-12`}
            onClick={
              areCategoriesUnchanged(data.layout?.categories, categories) ||
              isAnyCategoryTitleEmpty(categories)
                ? () => null
                : editCategoriesHandler
            }
          >
            Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;
