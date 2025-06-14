import React from 'react';

interface SubHeaderProps {
  leftImageSrc?: string;
  rightImageSrc?: string;
  altLeft?: string;
  altRight?: string;
}

const SubHeader: React.FC<SubHeaderProps> = ({
  leftImageSrc = '/images/MuddyDuck/MuddyDuck.jpg',
  rightImageSrc = '/images/CleverGirl/CleverGirl.jpg',
  altLeft = 'Left Icon',
  altRight = 'Right Icon',
}) => {
  return (
    <div className="w-full h-[90px] flex items-center justify-center gap-4 p-0 bg-[#242424] mt-5">
      <img
        src={leftImageSrc}
        alt={altLeft}
        className="w-16 h-16 lg:w-24 lg:h-24 object-contain"
      />
      <h2
        className="font-sans text-[2rem] lg:text-[4rem] text-[#eeee24] text-center leading-none whitespace-nowrap"
        style={{ fontFamily: 'Grundee, sans-serif' }}
      >
        Muddy Duck Productions
      </h2>
      <img
        src={rightImageSrc}
        alt={altRight}
        className="w-16 h-16 lg:w-24 lg:h-24 object-contain"
      />
    </div>
  );
};

export default SubHeader;
