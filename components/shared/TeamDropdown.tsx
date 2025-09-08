import {
  ChevronUpDownIcon,
  FolderIcon,
  FolderPlusIcon,
  RectangleStackIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import useTeams from 'hooks/useTeams';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { maxLengthPolicies } from '@/lib/common';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const TeamDropdown = () => {
  const router = useRouter();
  const { teams } = useTeams();
  const { data } = useSession();
  const { t } = useTranslation('common');

  const currentTeam = (teams || []).find(
    (team) => team.slug === router.query.slug
  );

  const menus = [
    {
      id: 2,
      name: t('teams'),
      items: (teams || []).map((team) => ({
        id: team.id,
        name: team.name,
        href: `/teams/${team.slug}/settings`,
        icon: FolderIcon,
      })),
    },
    {
      id: 1,
      name: t('profile'),
      items: [
        {
          id: data?.user.id,
          name: data?.user?.name,
          href: '/settings/account',
          icon: UserCircleIcon,
        },
      ],
    },
    {
      id: 3,
      name: '',
      items: [
        {
          id: 'all-teams',
          name: t('all-teams'),
          href: '/teams',
          icon: RectangleStackIcon,
        },
        {
          id: 'new-team',
          name: t('new-team'),
          href: '/teams?newTeam=true',
          icon: FolderPlusIcon,
        },
      ],
    },
  ];

  return (
  <DropdownMenu>
        <DropdownMenuTrigger >
          {/* <Button variant="outline"> 
            {currentTeam?.name ||
          data?.user?.name?.substring(
            0,
            maxLengthPolicies.nameShortDisplay
          )}{' '}
        <ChevronUpDownIcon className="w-5 h-5" />
        </Button> */}
       <Button variant="outline" className='p-0 border-none bg-transparent hover:bg-transparent'> <img className="w-6 h-6 rounded-full" src={data?.user?.image?.substring(
            0,
            maxLengthPolicies.nameShortDisplay
          )}  alt='kk' height={1000} width={1000} />  </Button>    </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <ul
        tabIndex={0}
        className="dropdown-content dark:border-gray-600 shadow-md bg-base-100 w-full rounded px-2"
      >
        {menus.map(({ id, name, items }) => {
          return (
            <React.Fragment key={id}>
              {name && (
                <li
                  className="text-xs text-gray-500 py-1 px-2"
                  key={`${id}-name`}
                >
                  {name}
                </li>
              )}
              {items.map((item) => (
                <li
                  key={`${id}-${item.id}`}
                  onClick={() => {
                    if (document.activeElement) {
                      (document.activeElement as HTMLElement).blur();
                    }
                  }}
                >
                  <Link href={item.href}>
                    <div className="flex hover:bg-gray-100 hover:dark:text-black focus:bg-gray-100 focus:outline-none py-2 px-2 rounded text-sm font-medium gap-2 items-center">
                      <item.icon className="w-5 h-5" /> {item.name}
                    </div>
                  </Link>
                </li>
              ))}
              {name && <li className="divider m-0" key={`${id}-divider`} />}
            </React.Fragment>
          );
        })}
      </ul>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
     

     </DropdownMenu>
  );
};

export default TeamDropdown;

