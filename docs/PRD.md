# Shot2Day

## Summary

Shot2Day is an app for Ricoh 3-series photographers who want to **professionally manage, display and search** their images and metadata.
~~Shot2Day is an app that allows you to upload images from cameras, esp. RICOH 3 and its variants, manage them and their metadata, and search them using natural language queries.~~ (_12/19/2024_)

## Target

### Background

- Many photographers want to manage and share their images and metadata online with ease! They would love to enjoy their photos with other GR3 users and dicuss what filters are good or what exposure they used, etc. Shot2Day provide automatic metadata extraction and one-click image upload & deployment.
- Free photo organizing/displaying apps like macOS Photos do not provide advanced search and management w/ metadata. On Photos, you can search for images only when you have added titles to images in English. And you cannot search w/ metadata filters.
  ~~- Ricoh 3 and its variant users find it hard to organize their images with metadata on free platforms/apps like macOS Photos.~~ (_12/19/2024_)

### Target Users

- Photographers who want to share their images on the web
- Ricoh 3 and its variant users who want to automatically manage the metadata of their images
- Programmers who want to add or augment the functionality of Shot2Day

## Featrues

- [x] Automatically extract & add metadata to uploaded images (_12/12/2024_)
- [x] Automatically upload local images to Supabase (_12/16/2024_)
- [x] Retrieve images from a Supabase storage (_12/17/2024_)
- [ ] Advanced search w/ metadata filters
  - [ ] Search & display the basic GR filter settings
- [ ] Toggle between applying a watermark to the image or not
- [x] Given user input text and extracted metadata, upload/upsert them to a Supabase table (_12/19/2024_)
- [ ] ~~PGVector for similarity search~~ (_12/19/2024_)

## Change Log

### 2024-12-19

- purpose: Let's focus on the basics! Instead of adding brand-new features like natural language querying and similarity search, implement advanced search and management. This will help define the target users, Ricoh GR3-series photographers, and add features that they desperately need.
- change: ## summary and ## target

### 2024-12-22

- purpose: Use of Express.js for backend server to use exiftool-vendored for Ricoh-specific metadata
