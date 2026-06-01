import DateInviteFlow from "../../components/DateInviteFlow";

export default async function InvitePage({params,}: {params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <DateInviteFlow invitationId={id} />;
}