export interface TimelineItemData {
  id: number;
  date: string;
  title: string;
  description: string;
  photoKey: string;
}

export interface ReasonItemData {
  id: number;
  text: string;
}

export interface EnvelopeData {
  id: number;
  title: string;
  icon: string;
  note: string;
}

export interface PromiseItemData {
  id: number;
  text: string;
}

export interface SongTrack {
  id: number;
  title: string;
  artist: string;
  albumArtKey: string;
  src?: string;
}
