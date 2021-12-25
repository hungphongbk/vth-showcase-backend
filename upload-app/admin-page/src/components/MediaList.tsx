import ImageList from "@mui/material/ImageList";
import useSWR from "swr";
import { deleteOneImage, getAllImages } from "./api";
import {
  Card,
  CardContent,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { displaySize } from "./utils";

type MediaListProps = {};
export default function MediaList(props: MediaListProps): JSX.Element {
  const { data, error, mutate } = useSWR("/all", getAllImages);

  const doDelete = async (id: string) => {
    await deleteOneImage(id);
    await mutate();
  };

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      <Card
        sx={{
          position: "fixed",
          top: 10,
          right: 10,
          width: 300,
          zIndex: 99999,
        }}
      >
        <CardContent sx={{ pb: "16px !important" }}>
          <Typography>
            Total files: <strong>{data.totalFiles}</strong>
          </Typography>
          <Typography>
            Total size: <strong>{displaySize(data.totalSize as number)}</strong>
          </Typography>
        </CardContent>
      </Card>
      <ImageList cols={5} rowHeight={200} gap={8}>
        {(data.images as any[]).map((image) => (
          <ImageListItem
            key={image.Id}
            sx={{ overflow: "hidden", borderRadius: 3 }}
          >
            <img src={image.Path} alt="" />
            <ImageListItemBar
              actionIcon={
                <IconButton onClick={() => doDelete(image.Id)} color={"error"}>
                  <DeleteIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}
