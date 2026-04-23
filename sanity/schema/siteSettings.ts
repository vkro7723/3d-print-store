import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'bannerTitle',
      title: 'Homepage Banner Title',
      type: 'string',
    }),
    defineField({
      name: 'bannerSubtitle',
      title: 'Homepage Banner Subtitle',
      type: 'text',
    }),
    defineField({
      name: 'aboutText',
      title: 'About Brand Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'twitter', title: 'Twitter/X', type: 'url' },
        { name: 'tiktok', title: 'TikTok', type: 'url' },
        { name: 'youtube', title: 'YouTube', type: 'url' },
      ],
    }),
  ],
})
