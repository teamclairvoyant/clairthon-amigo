import React from 'react';
import { COPY } from '../../constant';
import Divider from "@mui/material/Divider";

/**
 * App Footer Component
 */
function Footer() {
  return (
    <footer className='pt-12 pb-2 bg-purple-50'>
      <Divider />
      <div className='pt-2 text-center font-semibold'>
        <p className='text-xs'>
            {COPY.CLV}
          <span>{` © ${new Date().getFullYear()} ${COPY.ALL_RIGHTS_RESERVED}`}</span>
        </p>
        <p className='pt-1 text-xs text-secondary'>{COPY.VERSION}</p>
      </div>
    </footer>
  );
}

export default Footer;
