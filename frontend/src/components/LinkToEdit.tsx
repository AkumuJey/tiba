import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Link from "next/link";

interface PropTypes {
  path: string;
}
const LinkToEdit = ({ path }: PropTypes) => {
  return (
    <Link href={path}>
      <IconButton sx={{ ml: 2 }}>
        <Edit />
      </IconButton>
    </Link>
  );
};

export default LinkToEdit;
