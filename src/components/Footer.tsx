import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] px-5 py-14 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="font-serif text-2xl">{profile.name}</p>
          <p className="mt-1 text-muted">{profile.title}, {profile.department}, DBATU Lonere</p>
        </div>
      </div>
    </footer>
  );
}
