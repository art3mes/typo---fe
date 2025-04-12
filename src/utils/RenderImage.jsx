import classNames from 'classnames';
import darkIcon from '../assets/dark.png';
import createRoom from '../assets/create.png';
import joinRoom from '../assets/join.png';
import live from '../assets/live.png';
import refresh from '../assets/refresh.png';
import reset from '../assets/reset.png';

const images = {
    darkMode: darkIcon,
    create: createRoom,
    join: joinRoom,
    live: live,
    refresh: refresh,
    reset: reset,
};

const RenderImage = ({ name, className = '', alt = '' }) => {
    const imgSrc = images[name];

    if (!imgSrc) return null;

    return (
        <img
            src={imgSrc}
            alt={alt || name}
            className={classNames('w-6 h-6 object-contain', className)}
        />
    );
};

export default RenderImage;
