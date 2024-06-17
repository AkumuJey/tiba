import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Link from "next/link";

interface PropTypes {
  path: string;
  query?: any;
}
const LinkToEdit = ({ path, query }: PropTypes) => {
  return (
    <Link
      href={{
        pathname: path,
        query,
      }}
    >
      <IconButton sx={{ ml: 2 }}>
        <Edit />
      </IconButton>
    </Link>
  );
};

export default LinkToEdit;
