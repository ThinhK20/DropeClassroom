import { Avatar } from "@mui/material";


interface AvatarCustomProps {
  name: string;
  classroomAvatar: boolean;
  url?: string;
  height?: number;
  width?: number;
  fontSize?: number
}

function AvatarCustom({name, classroomAvatar, url = "", height = 42, width = 42, fontSize = 20 }: AvatarCustomProps) {
    
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string, classroomAvatar: boolean) {
    
    let characters: string =  name;
    if(classroomAvatar) characters = name[0];
    else characters = name[0] + name[1];
    // else characters = `${characters.split(" ")[0][0]}${characters.split(" ")[1][0]}`;
  
    return {
      sx: {
        bgcolor: stringToColor(name),
        height: height, 
        width: width,
        fontSize: fontSize
      },
      children: characters,
    };
  }

  return(
    url === "" ? (
      <Avatar
        {...stringAvatar(name, classroomAvatar)}
        alt={`${name} Profile`}
      />
    ) : (
      <Avatar alt={`${name} Profile`} 
              src={url}
              sx={{height: height, width: width}} 
      />
    )
  );
}

export default AvatarCustom;
