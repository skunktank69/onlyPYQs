export function fileToSlug(file: string) {
  return file.replace(/\.html$/i, "");
}

export function slugToFile(fileSlug: string) {
  return `${fileSlug}.html`;
}
