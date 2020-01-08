import { Pipe, PipeTransform } from "@angular/core";
import { MediaPost } from "../shared/models/api/media-post.model";

@Pipe({
  name: "getMediaAttachments",
  pure: true
})
export class GetMediaAttachmentsPipe implements PipeTransform {
  transform(mediaPost: MediaPost): any {
    if (
      mediaPost.mediaPlatform.toLowerCase() === "instagram" &&
      mediaPost.attachments.length
    ) {
      return mediaPost.attachments.find(a => a.type === "main-text").text;
    }
    return null;
  }
}
