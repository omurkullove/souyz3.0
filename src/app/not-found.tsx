import { redirect } from '@/navigation';
import { FC } from 'react';

interface IProps {}

const NotFound: FC<IProps> = () => {
    return redirect('/');
};

export default NotFound;
