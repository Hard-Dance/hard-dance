// TODO: Confirm type
export type Event = {
  id: string;
  title: string;
  datestart: string; // TODO: Should this be date or string?
  dateend: string;
  location: string;
  hosts: string[];
  is_online: boolean;
  featured: boolean;
  image: string;
  isForegroundBlack?: boolean;
  video?: boolean;
  flag: string;
};
