import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "getMediaLogo",
  pure: true
})
export class GetMediaLogoPipe implements PipeTransform {
  transform(logo: string): string {
    let url: string;
    switch (logo.toLowerCase()) {
      case "twitter":
        url = "../../assets/images/Twitter_Logo_Blue.png";
        break;
      case "instagram":
        url = "../../assets/images/insta-colour.png";
        break;
      case "facebook":
        url = "../../assets/images/f_logo_RGB-Blue_58.png";
        break;
      default:
        url = "";
        break;
    }
    return url;
  }
}
