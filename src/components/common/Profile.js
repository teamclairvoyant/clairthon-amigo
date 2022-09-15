import React from 'react';
import AmigoAvatar from '../common/Avatar';

function Profile(props) {
  const {
    firstName,
    lastName,
    imageUrl,
    icon,
    size = 'large',
    className,
    renderFullName,
    fullNameSize = 'lg',
    disableTooltip = false,
    bgColor,
  } = props;

  return (
    <>
        <div className={className}>
          <AmigoAvatar
            firstName={firstName}
            lastName={lastName}
            avatarImgUrl={imageUrl}
            avatarIcon={icon}
            size={size}
            disableTooltip={disableTooltip}
            className={className}
            bgColor={bgColor}
          />
        </div>
      {renderFullName && (
        <span className={`ml-3 text-${fullNameSize}`}>{`${firstName} ${lastName}`}</span>
      )}
    </>
  );
}

export default Profile;
