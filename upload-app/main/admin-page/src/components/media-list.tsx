import ImageList from "@mui/material/ImageList";
import useSWR from "swr";
import { deleteOneImage, getAllImages } from "./api";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Typography,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { displaySize } from "./utils";
import { useCallback, useContext } from "react";
import { useImmer } from "use-immer";
import CheckIcon from "@mui/icons-material/CheckCircle";
import { AspectRatio } from "@hungphongbk/vth-sdk";
import { GoUploadContext } from "./go-upload-context";

type MediaListProps = {};
export default function MediaList(props: MediaListProps): JSX.Element {
  const { data, error, mutate } = useSWR("/all", getAllImages),
    [selected, setSelected] = useImmer<number[]>([]),
    { isInIframe, cols } = useContext(GoUploadContext),
    theme = useTheme();

  const doDelete = async (id: string) => {
    await deleteOneImage(id);
    await mutate();
  };

  const toggleSelect = useCallback(
    (id: number) => {
      setSelected((draft) => {
        const index = draft.findIndex((s) => s === id);
        if (index >= 0) {
          draft.splice(index, 1);
        } else draft.push(id);
      });
    },
    [setSelected]
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      {!isInIframe && (
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
              Total size:{" "}
              <strong>{displaySize(data.totalSize as number)}</strong>
            </Typography>
          </CardContent>
        </Card>
      )}
      <ImageList cols={cols} gap={4}>
        {(data.images as any[]).map((image) => (
          <ImageListItem
            key={image.Id}
            sx={{ cursor: "pointer" }}
            onClick={() => toggleSelect(image.Id)}
          >
            <AspectRatio ratio={"4/3"}>
              <Box
                sx={[
                  {
                    width: "100%",
                    height: "100%",
                    ">img": {
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    },
                  },
                  selected.includes(image.Id) && {
                    border: `6px solid ${theme.palette.primary.light}`,
                  },
                ]}
              >
                <img src={image.Path} alt="" />
              </Box>
            </AspectRatio>
            {!isInIframe && (
              <ImageListItemBar
                position={"below"}
                sx={{
                  p: 1,
                  "& .MuiImageListItemBar-actionIcon": {
                    display: "flex",
                    alignItems: "center",
                  },
                }}
                actionIcon={
                  <>
                    <IconButton
                      onClick={() => doDelete(image.Id)}
                      size={"small"}
                      sx={{ bgcolor: "error.main", color: "white" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <CheckIcon
                      fontSize={"large"}
                      color={
                        selected.some((s) => s === image.Id)
                          ? "success"
                          : "disabled"
                      }
                    />
                  </>
                }
              />
            )}
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}
