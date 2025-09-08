import { Error, LetterAvatar, Loading } from '@/components/shared';
import { Team, TeamMember } from '@prisma/client';
import useCanAccess from 'hooks/useCanAccess';
import useTeamMembers, { TeamMemberWithUser } from 'hooks/useTeamMembers';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import toast from 'react-hot-toast';
import { InviteMember } from '@/components/invitation';
import UpdateMemberRole from './UpdateMemberRole';
import { defaultHeaders } from '@/lib/common';
import type { ApiResponse } from 'types/index';
import ConfirmationDialog from '../shared/ConfirmationDialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const Members = ({ team }: { team: Team }) => {
  const { data: session } = useSession();
  const { t } = useTranslation('common');
  const { canAccess } = useCanAccess();
  const [visible, setVisible] = useState(false);
  const [selectedMember, setSelectedMember] =
    useState<TeamMemberWithUser | null>(null);
  const [confirmationDialogVisible, setConfirmationDialogVisible] =
    useState(false);

  const { isLoading, isError, members, mutateTeamMembers } = useTeamMembers(
    team.slug
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error message={isError.message} />;
  }

  if (!members) {
    return null;
  }

  const removeTeamMember = async (member: TeamMember | null) => {
    if (!member) {
      return;
    }

    const sp = new URLSearchParams({ memberId: member.userId });

    const response = await fetch(
      `/api/teams/${team.slug}/members?${sp.toString()}`,
      {
        method: 'DELETE',
        headers: defaultHeaders,
      }
    );

    const json = (await response.json()) as ApiResponse;

    if (!response.ok) {
      toast.error(json.error.message);
      return;
    }

    mutateTeamMembers();
    toast.success(t('member-deleted'));
  };

  const canUpdateRole = (member: TeamMember) => {
    return (
      session?.user.id != member.userId && canAccess('team_member', ['update'])
    );
  };

  const canRemoveMember = (member: TeamMember) => {
    return (
      session?.user.id != member.userId && canAccess('team_member', ['delete'])
    );
  };

  const cols = [t('name'), t('email'), t('role')];
  if (canAccess('team_member', ['delete'])) {
    cols.push(t('actions'));
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <div className="space-y-3">
          <h2 className="text-xl font-medium leading-none tracking-tight">
            {t('members')}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('members-description')}
          </p>
        </div>
        <Button variant="default" onClick={() => setVisible(!visible)}>
          {t('add-member')}
        </Button>
      </div>

       <Table>
      <TableCaption>A list of your team members.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[200px]">Name</TableHead>
          <TableHead className="min-w-[250px]">Email</TableHead>
          <TableHead className="min-w-[200px]">Role</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableCell>
              <div className="flex items-center space-x-2">
                <LetterAvatar name={member.user.name} />
                <span>{member.user.name}</span>
              </div>
            </TableCell>
            <TableCell>{member.user.email}</TableCell>
            <TableCell>
              {canUpdateRole(member) ? (
                <UpdateMemberRole team={team} member={member} />
              ) : (
                <span>{member.role}</span>
              )}
            </TableCell>
            <TableCell>
              {canRemoveMember(member) && (
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => {
                    setSelectedMember(member);
                    setConfirmationDialogVisible(true);
                  }}
                >
                  {t("remove")}
                </button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

      <ConfirmationDialog
        visible={confirmationDialogVisible}
        onCancel={() => setConfirmationDialogVisible(false)}
        onConfirm={() => removeTeamMember(selectedMember)}
        title={t('confirm-delete-member')}
      >
        {t('delete-member-warning', {
          name: selectedMember?.user.name,
          email: selectedMember?.user.email,
        })}
      </ConfirmationDialog>
      <InviteMember visible={visible} setVisible={setVisible} team={team} />
    </div>
  );
};

export default Members;
