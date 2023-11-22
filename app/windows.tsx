import { IconType } from 'react-icons/lib';
import { AiFillDashboard } from 'react-icons/ai';
import { CiSettings } from "react-icons/ci";
import { CiCalculator2 } from "react-icons/ci";

type Window = {
    name: string;
    href: string;
    icon: IconType;
}

export const windows: Window[] = [
    {
        name: 'CalcPix',
        href: '/calc_pix',
        icon: CiCalculator2
    },
    {
        name: 'Sample',
        href: '/sample',
        icon: CiCalculator2
    },
]

export const specialWindows: Window[] = [
    {
        name: 'Setting',
        href: '/setting',
        icon: CiSettings
    }
]