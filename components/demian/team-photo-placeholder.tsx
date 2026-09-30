export const futureTeamPhotoPath = "/images/team/demian-insurance-agency-team.jpg";

export function TeamPhotoPlaceholder({ className = "" }: { className?: string }) {
  return (
    <figure className={`team-photo-placeholder ${className}`.trim()}>
      <div className="team-photo-placeholder-frame" aria-hidden="true">
        <span className="team-photo-placeholder-index">Team / 01</span>
        <div className="team-photo-placeholder-mark"><i /><i /><i /></div>
        <strong>Team photography<br />coming soon</strong>
      </div>
      <figcaption>Future Demian Insurance Agency team photo</figcaption>
    </figure>
  );
}
