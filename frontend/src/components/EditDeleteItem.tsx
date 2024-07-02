"use client";

import { Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteEditItemProps {
  deleteFunction: () => Promise<number | null>;
}

const EditDeleteItem = ({ deleteFunction }: DeleteEditItemProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const handleDelete = async () => {
    setError(false);
    setLoading(true);
    const results = await deleteFunction();
    setLoading(false);
    if (results) {
      return router.replace(`${pathname.slice(0, pathname.lastIndexOf("/"))}`);
    }
    setError(true);
  };

  const handleEdit = () => {
    router.push(`${pathname}/edit`);
  };

  return (
    <div>
      <div className="flex justify-between">
        <Button
          onClick={handleEdit}
          startIcon={<Delete />}
          variant="contained"
          color="primary"
        >
          Edit
        </Button>

        <LoadingButton
          onClick={handleDelete}
          loading={loading}
          variant="contained"
          color="secondary"
          startIcon={<Delete />}
        >
          Delete
        </LoadingButton>
      </div>
      <div className="flex justify-end">
        {error && <span className="text-xs text-red-600">Deletion failed</span>}
      </div>
    </div>
  );
};

export default EditDeleteItem;
