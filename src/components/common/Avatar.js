import  Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import React, { useMemo } from 'react';
import styles from './Avatar.module.scss';

// Avatar sizes
const largeWidth = '40px';
const smallWidth = '32px';
const extraLargeWidth = '60px';

const anchorOriginTop = { vertical: 'top', horizontal: 'right' };
const anchorOriginBottom = { vertical: 'bottom', horizontal: 'right' };

function AmigoAvatar({
  firstName,
  lastName,
  avatarImgUrl,
  avatarIcon,
  size = 'large',
  disabled,
  topRightAdornment,
  bottomRightAdornment,
  disableTooltip = false,
  className = '',
  key,
  bgColor,
}) {
  const { first, last } = useMemo(
    () => ({
      first: firstName?.charAt(0).toLocaleUpperCase(),
      last: lastName?.charAt(0).toLocaleUpperCase(),
    }),
    [firstName, lastName]
  );


  const avatarStyles = useMemo(
    () => ({
      width: size === 'extra_large' ? extraLargeWidth : size === 'large' ? largeWidth : smallWidth,
      height: size === 'extra_large' ? extraLargeWidth : size === 'large' ? largeWidth : smallWidth,
      backgroundColor: bgColor
    }),
    [size, bgColor]
  );

  return disableTooltip ? (
    <Badge badgeContent={topRightAdornment} anchorOrigin={anchorOriginTop} overlap='circular'>
      <Badge
        badgeContent={bottomRightAdornment}
        anchorOrigin={anchorOriginBottom}
        overlap='circular'
      >
        <Avatar
          className={`${disabled ? styles.disabledAvatar : styles.avatar} ${className}`}
          style={avatarStyles}
          src={avatarImgUrl}
          alt={`${firstName} ${lastName}`}
          key={key}
        >
          {avatarIcon ?? null}
          {first}
          {last}
        </Avatar>
      </Badge>
    </Badge>
  ) : (
    <Badge badgeContent={topRightAdornment} anchorOrigin={anchorOriginTop} overlap='circular'>
      <Badge
        badgeContent={bottomRightAdornment}
        anchorOrigin={anchorOriginBottom}
        overlap='circular'
      >
          <Avatar
            className={`${disabled ? styles.disabledAvatar : styles.avatar} ${className}`}
            style={avatarStyles}
            src={avatarImgUrl}
            alt={`${firstName} ${lastName}`}
            key={key}
            aria-hidden
          >
            {avatarIcon ?? null}
            {first}
            {last}
          </Avatar>
      </Badge>
    </Badge>
  );
}

export default AmigoAvatar;
