import { cache } from "react";
import {
  createClient,
  type MicroCMSImage,
  type MicroCMSListContent,
  type MicroCMSListResponse,
  type MicroCMSObjectContent,
  type MicroCMSQueries,
} from "microcms-js-sdk";

const createMicroCMSClient = () => {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.APIKEY;

  if (!serviceDomain) {
    throw new Error("MICROCMS_SERVICE_DOMAIN is not set. Add it to your environment variables.");
  }

  if (!apiKey) {
    throw new Error("APIKEY is not set. Add it to your environment variables.");
  }

  return createClient({
    serviceDomain,
    apiKey,
  });
};

const getClient = (() => {
  let client: ReturnType<typeof createClient> | null = null;
  return () => {
    if (!client) {
      client = createMicroCMSClient();
    }
    return client;
  };
})();

export type ImageAsset = MicroCMSImage;

type AboutFields = {
  name: string;
  "name-en"?: string;
  "org-name"?: string;
  "org-name-en"?: string;
  description?: string;
  "work-content"?: string;
  "work-description"?: string;
  overview?: string;
  "overview-desc"?: string;
  icon?: ImageAsset;
};

export type About = MicroCMSObjectContent &
  AboutFields & {
    nameEn?: string;
    orgName?: string;
    orgNameEn?: string;
    workContent?: string;
    workDescription?: string;
    overviewDesc?: string;
  };

type ProjectFields = {
  title: string;
  description?: string;
  thumbnail?: ImageAsset;
  date?: string;
  genre?: string[];
  skill?: string[];
  images?: ImageAsset[];
  url?: string;
  github?: string;
};

type ProjectResponse = MicroCMSListContent & ProjectFields;

export type Project = ProjectResponse & {
  mainVisual?: ImageAsset;
};

const ensureArray = <T>(value: T[] | T | undefined | null): T[] => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

const normalizeProject = (project: ProjectResponse): Project => {
  const fallbackMain =
    project.thumbnail ??
    (project as ProjectResponse & { mainVisual?: ImageAsset }).mainVisual ??
    (project as ProjectResponse & { eyecatch?: ImageAsset }).eyecatch;

  const gallery = ensureArray(
    project.images ??
      (project as ProjectResponse & { gallery?: ImageAsset[] }).gallery ??
      (project as ProjectResponse & { additionalImages?: ImageAsset[] }).additionalImages
  );

  return {
    ...project,
    mainVisual: fallbackMain,
    images: gallery,
  };
};

const isNotFoundError = (error: unknown) => {
  if (typeof error !== "object" || error === null) {
    return false;
  }
  return "status" in error && (error as { status?: number }).status === 404;
};

export const getProjects = cache(async (queries?: MicroCMSQueries): Promise<Project[]> => {
  const client = getClient();
  const data: MicroCMSListResponse<ProjectFields> = await client.getList({
    endpoint: "project",
    queries: {
      orders: "-date",
      ...(queries ?? {}),
    },
  });

  return data.contents.map((content) => normalizeProject(content as ProjectResponse));
});

export const getProjectById = cache(async (id: string): Promise<Project | null> => {
  const client = getClient();

  try {
    const data = await client.getListDetail<ProjectFields>({
      endpoint: "project",
      contentId: id,
    });
    return normalizeProject(data as ProjectResponse);
  } catch (error) {
    if (isNotFoundError(error)) {
      return null;
    }
    throw error;
  }
});

type HeroImagesFields = {
  images: ImageAsset[];
};

export type HeroImages = MicroCMSObjectContent & HeroImagesFields;

export const getHeroImages = cache(async (): Promise<ImageAsset[]> => {
  const client = getClient();
  const data = await client.getObject<HeroImagesFields>({
    endpoint: "hero-images",
  });
  return ensureArray(data.images);
});

export const getAbout = cache(async (): Promise<About> => {
  const client = getClient();
  const about = await client.getObject<AboutFields>({
    endpoint: "about",
  });

  return {
    ...about,
    nameEn: about["name-en"],
    orgName: about["org-name"],
    orgNameEn: about["org-name-en"],
    workContent: about["work-content"],
    workDescription: about["work-description"],
    overviewDesc: about["overview-desc"],
  };
});
