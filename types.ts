import type { Page } from '@playwright/test';
import { UniqueIdentifier } from '@dnd-kit/core';
import { Member, User, Server } from "@prisma/client";
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";
import { User } from '@sentry/nextjs';

// Types for Playwright request wrappers
export type RequestOptionsWithBody = Parameters<Page['request']['post']>[1];
export type RequestOptionsNoBody = Parameters<Page['request']['get']>[1];

export type Board = {
    id: number;
    uuid: string;
    created_at: Date;
    updated_at: Date;
    name: string;
    user_uuid: string;
    columns: Column[];
};

export type MultiInput = {
    value: string;
    id: string;
    isValid?: boolean;
    isTouched?: boolean;
    errorMsg?: string;
};

export type Columns = Record<
    UniqueIdentifier,
    {
        board_uuid: string;
        uuid: string;
        color: string;
        tasks: Task[];
    }
>;
/** Payload to create a new column */
export type NewColumn = {
    board_uuid?: string;
    name: string;
    color: string;
    position?: number;
};

export type Task = {
    name: string;
    subtasks: Subtask[];
    position: number;
    description: string;
    uuid: string;
    column_uuid: string;
};

export type NewTask = {
    name: string;
    description?: string;
    column_uuid: string;
    subtasks?: { name: string; uuid?: string; completed?: boolean }[];
};

export type Subtask = {
    name: string;
    uuid: string;
    completed: boolean;
};

export type Column = {
    id: number;
    uuid: string;
    created_at: Date;
    updated_at: Date;
    name: string;
    position: number;
    color: string;
    board_uuid: string;
    user_uuid: string;
    tasks: Task[];
};

export type MultiInputChangeEvent =
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLSelectElement>;
export type MultiInputFocusEvent =
    | React.FocusEvent<HTMLInputElement>
    | React.FocusEvent<HTMLTextAreaElement>
    | React.FocusEvent<HTMLSelectElement>;

    export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { user: User })[];
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & { server: NetServer & { io: SocketIOServer } };
};

export interface Album {
  id: string;
  name: string;
  description: string;
  year: number | null;
  type: string;
  playCount: number | null;
  language: string;
  explicitContent: boolean;
  artists: {
    primary: Artist[];
    featured: Artist[];
    all: Artist[];
  };
  url: string;
  image: ImageQuality[];
}

export interface Artist {
  id: string;
  name: string;
  role: string;
  type: string;
  image: ImageQuality[];
  url: string;
}

export interface ImageQuality {
  quality: string;
  url: string;
}

export interface SearchResponses<T> {
  success: boolean;
  data: {
    total: number;
    start: number;
    results: T[];
  };
}

export interface Playlist {
  id: string;
  name: string;
  type: string;
  image: ImageQuality[];
  url: string;
  songCount: number | null;
  language: string;
  explicitContent: boolean;
}

export interface Song {
  id: string
  name: string
  type: string
  year: string | null
  releaseDate: string | null
  duration: number | null
  label: string | null
  explicitContent: boolean
  playCount: number | null
  language: string
  hasLyrics: boolean
  lyricsId: string | null
  url: string
  copyright: string | null
  album: {
    id: string | null
    name: string | null
    url: string | null
  }
  artists: {
    primary: Artist[]
    featured: Artist[]
    all: Artist[]
  }
  image: ImageQuality[]
  downloadUrl: DownloadUrl[]
}

export interface Artist {
  id: string
  name: string
  role: string
  type: string
  image: ImageQuality[]
  url: string
}

export interface Album {
  id: string
  name: string
  description: string
  year: number | null
  type: string
  playCount: number | null
  language: string
  explicitContent: boolean
  artists: {
    primary: Artist[]
    featured: Artist[]
    all: Artist[]
  }
  songCount: number | null
  url: string
  image: ImageQuality[]
  songs: Song[]
}

export interface Playlist {
  id: string
  name: string
  description: string | null
  year: number | null
  type: string
  playCount: number | null
  language: string
  explicitContent: boolean
  songCount: number | null
  url: string
  image: ImageQuality[]
  songs: Song[]
  artists: Artist[]
}

export interface ImageQuality {
  quality: string
  url: string
}

export interface DownloadUrl {
  quality: string
  url: string
}

export interface SearchResponse {
  success: boolean
  data: {
    albums: { results: any[], position: number }
    songs: { results: Song[], position: number }
    artists: { results: Artist[], position: number }
    playlists: { results: any[], position: number }
    topQuery: { results: Song[], position: number }
  }
}