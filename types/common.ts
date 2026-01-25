export type Genre = {
  id: number;
  name: string;
};

export type Actor = {
  id: number;
  name: string;
  profile_path: string | null;
  character?: string; // For cast members (optional, may not be present in all contexts)
};

export type CrewMember = {
  id: number;
  name: string;
  job: string; // Job title, e.g., "Director", "Producer"
  profile_path?: string; // Optional profile image path
};
