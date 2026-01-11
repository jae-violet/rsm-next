import fs from "fs";
import client from "https";

export function getFilenameFromUrl(url: string) {
  const pathname = new URL(url).pathname;
  const index = pathname.lastIndexOf("/");
  return pathname.substring(index + 1); // if index === -1 then index+1 will be 0
}

export function downloadImage(url: string): Promise<string> {
  const filepath = "./images/" + getFilenameFromUrl(url);

  return new Promise((resolve, reject) => {
    client.get(url, (res) => {
      if (res.statusCode === 200) {
        res
          .pipe(fs.createWriteStream(filepath))
          .on("error", reject)
          .once("close", () => resolve(filepath));
      } else {
        // Consume response data to free up memory
        res.resume();
        reject(
          new Error(`Request Failed With a Status Code: ${res.statusCode}`)
        );
      }
    });
  });
}
