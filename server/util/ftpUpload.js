export function upload({ ftpClient, file, remoteFileName }) {
  return ftpClient.put(file, remoteFileName);
}
