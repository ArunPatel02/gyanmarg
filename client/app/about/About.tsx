import React from 'react';
import { styles } from '../styles/style';

const About = () => {
  return (
    <div className='text-black dark:text-white'>
      <br />
      <h1 className={`${styles.title} 800px:!text-[45px]`}>
        What is <span className='text-gradient'>Eleaning?</span>
      </h1>

      <br />
      <div className='w-[95%] 800px:w-[85%] m-auto'>
        <p className='text-[18px] font-Poppins'>
          Welcome to GyanMarg, where education meets accessibility! At
          GyanMarg, we understand the challenges that learners face in
          navigating the vast sea of freely available educational content on
          platforms like YouTube and blogs. Our mission is to bridge the gap
          between the abundance of information and the need for structured
          learning experiences.
          <br />
          <br />
          <h2 className='text-xl font-Poppins font-extrabold'>What We Do:</h2>
          At GyanMarg, we curate and structure the best freely available
          content from sources like YouTube, Google, and other platforms into
          comprehensive courses. Our team works tirelessly to organize and
          present this content in a way that transforms scattered information
          into a well-structured and easily accessible learning experience. We
          believe that everyone, regardless of financial constraints, deserves
          access to quality education.
          <br />
          <br />
          <h2 className='text-xl font-Poppins font-extrabold'>Our Goal:</h2>
          Our primary goal is to democratize education by offering structured
          courses for free. We understand that not everyone can afford to
          purchase courses or enroll in expensive programs. GyanMarg is
          committed to providing a solution for those who aspire to learn but
          face financial limitations. Through our carefully curated courses, we
          aim to empower individuals to enhance their knowledge and skills
          without the burden of hefty fees.
          <br />
          <br />
          <h2 className='text-xl font-Poppins font-extrabold'>The Problem:</h2>
          In today&apos;s digital age, students often struggle to find the right
          educational content amidst the vast and unorganized landscape of
          freely available platforms. The lack of structure and guidance makes
          the learning journey cumbersome, leading to frustration and wasted
          time. GyanMarg addresses this issue by curating content and
          presenting it in an organized manner, making learning more efficient
          and enjoyable.
          <br />
          <br />
          <h2 className='text-xl font-Poppins font-extrabold'>Our Solution:</h2>
          GyanMarg serves as the compass in the vast sea of online education.
          We take the chaos out of learning by curating, structuring, and
          presenting educational content in an organized manner. Our courses
          provide a clear path for learners, guiding them through the learning
          process with ease. Whether you&apos;re a student looking to supplement your
          studies or an individual seeking to acquire new skills, GyanMarg is
          here to make your learning journey seamless and accessible.
          <br />
          <br />
          Join us at GyanMarg and embark on a learning adventure where
          knowledge knows no boundaries. Empower yourself with education,
          structured for you, and accessible to all!
        </p>
        <br />
        <span className='text-[22px]'>Abhishek Patel</span>
        <h5 className='text-[18px] font-Poppins'>
          Founder and CEO of GyanMarg
        </h5>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default About;
