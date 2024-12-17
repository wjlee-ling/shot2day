# Shot2Day

## Summary

Shot2Day is an app that allows you to upload images from cameras, esp. RICOH 3 and its variants, manage them and their metadata, and search them using natural language queries.

## Target

### Background

- Ricoh 3 and its variant users find it hard to organize their images with metadata on free platforms/apps like macOS Photos.

### Target Users

- Photographers who want to share their images on the web
- Ricoh 3 and its variant users who want to automatically manage the metadata of their images
- Programmers who want to add or augment the functionality of Shot2Day

## Featrues

- [x] Automatically extract & add metadata to uploaded images (_12/12/2024_)
- [x] Automatically upload local images to Supabase (_12/16/2024_)
- [x] Retrieve images from a Supabase storage (_12/17/2024_)
  - [ ] Advanced search w/ metadata filters
  - [ ] Toggle between applying a watermark to the image or not
- [x] Given user input text and extracted metadata, upload/upsert them to a Supabase table
  - [ ] PGVector for similarity search
