import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] px-5 py-14 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="font-serif text-2xl">{profile.name}</p>
          <p className="mt-1 text-muted">{profile.title}, {profile.department}, DBATU Lonere</p>
        </div>
        <p className="max-w-md text-sm text-muted">
          Information is drawn from the 2026 biodata and public academic profiles. Items awaiting confirmation are marked. Metrics carry their source and retrieval date. Award certificate image: dbatu.ac.in.
        </p>
      </div>
    </footer>
  );
}
