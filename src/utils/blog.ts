import type { PaginateFunction } from 'astro';
import { getCollection, render } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Post } from '~/types';
import { APP_BLOG } from 'astrowind:config';
import { cleanSlug, trimSlash, BLOG_BASE, POST_PERMALINK_PATTERN, CATEGORY_BASE, TAG_BASE } from './permalinks';

const generatePermalink = async ({
  id,
  slug,
  publishDate,
  category,
}: {
  id: string;
  slug: string;
  publishDate: Date;
  category: string | undefined;
}) => {
  const year = String(publishDate.getFullYear()).padStart(4, '0');
  const month = String(publishDate.getMonth() + 1).padStart(2, '0');
  const day = String(publishDate.getDate()).padStart(2, '0');
  const hour = String(publishDate.getHours()).padStart(2, '0');
  const minute = String(publishDate.getMinutes()).padStart(2, '0');
  const second = String(publishDate.getSeconds()).padStart(2, '0');

  const permalink = POST_PERMALINK_PATTERN.replace('%slug%', slug)
    .replace('%id%', id)
    .replace('%category%', category || '')
    .replace('%year%', year)
    .replace('%month%', month)
    .replace('%day%', day)
    .replace('%hour%', hour)
    .replace('%minute%', minute)
    .replace('%second%', second);

  return permalink
    .split('/')
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
};

const getNormalizedPost = async (post: CollectionEntry<'post'>): Promise<Post> => {
  const { id, data } = post;
  const { Content, remarkPluginFrontmatter } = await render(post);

  const {
    publishDate: rawPublishDate = new Date(),
    updateDate: rawUpdateDate,
    title,
    excerpt,
    image,
    tags: rawTags = [],
    category: rawCategory,
    author,
    draft = false,
    metadata = {},
  } = data;

  const slug = cleanSlug(id); // cleanSlug(rawSlug.split('/').pop());
  const publishDate = new Date(rawPublishDate);
  const updateDate = rawUpdateDate ? new Date(rawUpdateDate) : undefined;

  const category = rawCategory
    ? {
        slug: cleanSlug(rawCategory),
        title: rawCategory,
      }
    : undefined;

  const tags = rawTags.map((tag: string) => ({
    slug: cleanSlug(tag),
    title: tag,
  }));

  const isSpanish = id.startsWith('es/');
  const permalinkSlug = isSpanish ? cleanSlug(id.substring(3)) : slug;
  let permalink = await generatePermalink({ id, slug: permalinkSlug, publishDate, category: category?.slug });
  if (isSpanish) {
    permalink = 'es/' + permalink;
  }

  return {
    id: id,
    slug: slug,
    permalink,

    publishDate: publishDate,
    updateDate: updateDate,

    title: title,
    excerpt: excerpt,
    image: image,

    category: category,
    tags: tags,
    author: author,

    draft: draft,

    metadata,

    Content: Content,
    // or 'content' in case you consume from API

    readingTime: remarkPluginFrontmatter?.readingTime,
  };
};

// 2026-10-01 (AdSense review readiness): consolidated near-duplicate listicles.
// These slugs are superseded by 4 canonical posts and 301-redirected in
// astro.config.ts. Source .md files are kept in git; remove a slug here to
// re-publish it.
const CONSOLIDATED_LISTICLE_SLUGS = new Set<string>([
  "25-best-games-to-play-when-bored-at-school-unblocked-for-chromebook-in-2026",,
  "25-best-unblocked-games-for-school-chromebook-2026-instant-play-no-download",,
  "25-best-unblocked-games-for-school-chromebook-2026-play-mini-games-instantly",,
  "25-best-unblocked-mini-games-for-school-chromebook-in-2026",,
  "30-best-unblocked-games-for-school-chromebook-2026-that-actually-work",,
  "best-unblocked-games-2026-play-free-mini-games-on-school-chromebook",,
  "best-unblocked-games-for-school-chromebook-2026-play-instantly",,
  "best-unblocked-games-for-school-chromebooks-2026-play-instantly",,
  "games-to-play-when-bored-at-school-2026-best-unblocked-browser-games-for-chromebook-no-download",,
  "top-trending-unblocked-games-2026-for-school-chromebooks-free-play",,
  "top-unblocked-games-2026-play-free-on-school-chromebooks",,
  "top-10-unblocked-games-for-school",,
  "15-best-games-to-play-when-bored-at-school-in-2026-unblocked-and-free",,
  "20-best-games-to-play-when-bored-at-school-in-2026",,
  "25-best-games-to-play-when-bored-at-school-in-2026-free-no-download",,
  "top-15-games-to-play-when-bored-at-school-in-2026",,
  "25-best-free-browser-games-no-download-2026-play-instantly-when-bored",,
  "best-browser-games-2026-top-mini-games-to-play-when-bored",,
  "best-browser-games-to-play-when-bored-2026-no-download-instant-play",,
  "best-browser-games-to-play-when-bored-in-2026-free-html5-mini-games",,
  "best-browser-games-to-play-when-bored-in-2026-no-download-instant-fun",,
  "best-browser-games-to-play-when-bored-in-2026-no-download-instant-play",,
  "best-browser-games-to-play-when-bored-in-2026-no-download-required",,
  "best-games-to-play-when-bored-no-download-browser-games-2026",,
  "best-games-to-play-when-bored-in-2026-top-html5-browser-games-for-school-and-work",,
  "best-html5-browser-games-to-play-when-bored-in-2026",,
  "best-html5-games-to-play-instantly-without-download-in-2026",,
  "top-trending-mini-games-2026-best-html5-browser-games-to-play-when-bored",,
  "top-trending-mini-games-to-play-when-bored-in-2026-instant-browser-games",
]);

const load = async function (): Promise<Array<Post>> {
  const posts = await getCollection('post');
  const normalizedPosts = posts.map(async (post) => await getNormalizedPost(post));

  const results = (await Promise.all(normalizedPosts))
    .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())
    .filter((post) => !post.draft && !CONSOLIDATED_LISTICLE_SLUGS.has(post.slug));

  return results;
};

let _posts: Array<Post>;

/** */
export const isBlogEnabled = APP_BLOG.isEnabled;
export const isRelatedPostsEnabled = APP_BLOG.isRelatedPostsEnabled;
export const isBlogListRouteEnabled = APP_BLOG.list.isEnabled;
export const isBlogPostRouteEnabled = APP_BLOG.post.isEnabled;
export const isBlogCategoryRouteEnabled = APP_BLOG.category.isEnabled;
export const isBlogTagRouteEnabled = APP_BLOG.tag.isEnabled;

export const blogListRobots = APP_BLOG.list.robots;
export const blogPostRobots = APP_BLOG.post.robots;
export const blogCategoryRobots = APP_BLOG.category.robots;
export const blogTagRobots = APP_BLOG.tag.robots;

export const blogPostsPerPage = APP_BLOG?.postsPerPage;

/** */
export const fetchPosts = async (): Promise<Array<Post>> => {
  if (!_posts) {
    _posts = await load();
  }

  return _posts;
};

/** */
export const findPostsBySlugs = async (slugs: Array<string>): Promise<Array<Post>> => {
  if (!Array.isArray(slugs)) return [];

  const posts = await fetchPosts();

  return slugs.reduce(function (r: Array<Post>, slug: string) {
    posts.some(function (post: Post) {
      return slug === post.slug && r.push(post);
    });
    return r;
  }, []);
};

/** */
export const findPostsByIds = async (ids: Array<string>): Promise<Array<Post>> => {
  if (!Array.isArray(ids)) return [];

  const posts = await fetchPosts();

  return ids.reduce(function (r: Array<Post>, id: string) {
    posts.some(function (post: Post) {
      return id === post.id && r.push(post);
    });
    return r;
  }, []);
};

/** */
export const findLatestPosts = async ({ count }: { count?: number }): Promise<Array<Post>> => {
  const _count = count || 4;
  const posts = await fetchPosts();

  return posts ? posts.slice(0, _count) : [];
};

/** */
export const getStaticPathsBlogList = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogListRouteEnabled) return [];
  const posts = await fetchPosts();

  const enPosts = posts.filter((p) => !p.id.startsWith('es/'));
  const esPosts = posts.filter((p) => p.id.startsWith('es/'));

  const enPaths = paginate(enPosts, {
    params: { blog: BLOG_BASE || undefined },
    pageSize: blogPostsPerPage,
  });

  const esPaths = paginate(esPosts, {
    params: { blog: `es/${BLOG_BASE}` },
    pageSize: blogPostsPerPage,
  });

  return [...enPaths, ...esPaths];
};

/** */
export const getStaticPathsBlogPost = async () => {
  if (!isBlogEnabled || !isBlogPostRouteEnabled) return [];
  return (await fetchPosts()).flatMap((post) => ({
    params: {
      blog: post.permalink,
    },
    props: { post },
  }));
};

/** */
export const getStaticPathsBlogCategory = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogCategoryRouteEnabled) return [];

  const posts = await fetchPosts();
  const enPosts = posts.filter((p) => !p.id.startsWith('es/'));
  const esPosts = posts.filter((p) => p.id.startsWith('es/'));

  const enCategories = {};
  enPosts.map((post) => {
    if (post.category?.slug) {
      enCategories[post.category?.slug] = post.category;
    }
  });

  const esCategories = {};
  esPosts.map((post) => {
    if (post.category?.slug) {
      esCategories[post.category?.slug] = post.category;
    }
  });

  const enPaths = Array.from(Object.keys(enCategories)).flatMap((categorySlug) =>
    paginate(
      enPosts.filter((post) => post.category?.slug && categorySlug === post.category?.slug),
      {
        params: { category: categorySlug, blog: CATEGORY_BASE || undefined },
        pageSize: blogPostsPerPage,
        props: { category: enCategories[categorySlug] },
      }
    )
  );

  const esPaths = Array.from(Object.keys(esCategories)).flatMap((categorySlug) =>
    paginate(
      esPosts.filter((post) => post.category?.slug && categorySlug === post.category?.slug),
      {
        params: { category: categorySlug, blog: `es/${CATEGORY_BASE}` },
        pageSize: blogPostsPerPage,
        props: { category: esCategories[categorySlug] },
      }
    )
  );

  return [...enPaths, ...esPaths];
};

/** */
export const getStaticPathsBlogTag = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogTagRouteEnabled) return [];

  const posts = await fetchPosts();
  const enPosts = posts.filter((p) => !p.id.startsWith('es/'));
  const esPosts = posts.filter((p) => p.id.startsWith('es/'));

  const enTags = {};
  enPosts.map((post) => {
    if (Array.isArray(post.tags)) {
      post.tags.map((tag) => {
        enTags[tag?.slug] = tag;
      });
    }
  });

  const esTags = {};
  esPosts.map((post) => {
    if (Array.isArray(post.tags)) {
      post.tags.map((tag) => {
        esTags[tag?.slug] = tag;
      });
    }
  });

  const enPaths = Array.from(Object.keys(enTags)).flatMap((tagSlug) =>
    paginate(
      enPosts.filter((post) => Array.isArray(post.tags) && post.tags.find((elem) => elem.slug === tagSlug)),
      {
        params: { tag: tagSlug, blog: TAG_BASE || undefined },
        pageSize: blogPostsPerPage,
        props: { tag: enTags[tagSlug] },
      }
    )
  );

  const esPaths = Array.from(Object.keys(esTags)).flatMap((tagSlug) =>
    paginate(
      esPosts.filter((post) => Array.isArray(post.tags) && post.tags.find((elem) => elem.slug === tagSlug)),
      {
        params: { tag: tagSlug, blog: `es/${TAG_BASE}` },
        pageSize: blogPostsPerPage,
        props: { tag: esTags[tagSlug] },
      }
    )
  );

  return [...enPaths, ...esPaths];
};

/** */
export async function getRelatedPosts(originalPost: Post, maxResults: number = 4): Promise<Post[]> {
  const allPosts = await fetchPosts();
  const isSpanish = originalPost.id.startsWith('es/');
  const relevantPosts = allPosts.filter((p) => (isSpanish ? p.id.startsWith('es/') : !p.id.startsWith('es/')));

  const originalTagsSet = new Set(originalPost.tags ? originalPost.tags.map((tag) => tag.slug) : []);

  const postsWithScores = relevantPosts.reduce((acc: { post: Post; score: number }[], iteratedPost: Post) => {
    if (iteratedPost.slug === originalPost.slug) return acc;

    let score = 0;
    if (iteratedPost.category && originalPost.category && iteratedPost.category.slug === originalPost.category.slug) {
      score += 5;
    }

    if (iteratedPost.tags) {
      iteratedPost.tags.forEach((tag) => {
        if (originalTagsSet.has(tag.slug)) {
          score += 1;
        }
      });
    }

    acc.push({ post: iteratedPost, score });
    return acc;
  }, []);

  postsWithScores.sort((a, b) => b.score - a.score);

  const selectedPosts: Post[] = [];
  let i = 0;
  while (selectedPosts.length < maxResults && i < postsWithScores.length) {
    selectedPosts.push(postsWithScores[i].post);
    i++;
  }

  return selectedPosts;
}
