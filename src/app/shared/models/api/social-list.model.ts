import { MediaPost } from "./media-post.model";
import { SocialListBase } from "./social-list-base.model";

export interface SocialList extends SocialListBase {
  mediaPosts: MediaPost[];
}
