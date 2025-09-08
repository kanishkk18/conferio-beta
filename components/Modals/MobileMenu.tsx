import React, { Dispatch, FC, SetStateAction } from 'react';
import BoardList from '../BoardList/BoardList';

const MobileMenu: FC<{
    setMenuIsOpen: Dispatch<SetStateAction<boolean>>;
}> = (props) => {
    const closeMenuHandler = () => {
        props.setMenuIsOpen(false);
    };

    return (
        <div className="flex flex-col">
            <BoardList handleBoardSelect={closeMenuHandler} />
        </div>
    );
};

export default MobileMenu;
